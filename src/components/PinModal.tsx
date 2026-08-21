import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Delete } from 'lucide-react';
import { PROJECT_CONFIG } from '../config';
import { soundEngine } from '../utils/soundEngine';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('Enter the secret 4-digit code.');

  useEffect(() => {
    if (!isOpen) {
      setPin('');
      setIsError(false);
      setIsSuccess(false);
      setFeedbackText('Enter the secret 4-digit code.');
    }
  }, [isOpen]);

  // Handle keyboard typing
  useEffect(() => {
    if (!isOpen || isSuccess) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pin, isSuccess]);

  const handleDigit = (digit: string) => {
    if (pin.length >= 4 || isSuccess) return;
    soundEngine.playKeyTone(digit);
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      validatePin(newPin);
    }
  };

  const handleBackspace = () => {
    if (pin.length === 0 || isSuccess) return;
    soundEngine.playClick();
    setPin(pin.slice(0, -1));
    setIsError(false);
    setFeedbackText('Enter the secret 4-digit code.');
  };

  const handleClear = () => {
    soundEngine.playClick();
    setPin('');
    setIsError(false);
    setFeedbackText('Enter the secret 4-digit code.');
  };

  const validatePin = (enteredPin: string) => {
    if (enteredPin === PROJECT_CONFIG.access.secretPin) {
      // Success!
      setIsSuccess(true);
      setIsError(false);
      setFeedbackText('✦ Access Granted. Welcome, Jessica. ✦');
      soundEngine.playGrandUnlock();

      setTimeout(() => {
        onSuccess();
      }, 1200);
    } else {
      // Wrong PIN
      setIsError(true);
      soundEngine.playErrorTone();
      const quotes = PROJECT_CONFIG.access.wrongPinQuotes;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setFeedbackText(randomQuote);

      setTimeout(() => {
        setPin('');
        setIsError(false);
      }, 1400);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-sm rounded-3xl p-6 sm:p-8 dark:bg-neutral-950/95 bg-white/95 border ${
              isSuccess
                ? 'border-[#E7C878] shadow-[0_0_50px_rgba(231,200,120,0.3)]'
                : isError
                ? 'border-rose-500/60 shadow-[0_0_40px_rgba(225,29,72,0.25)]'
                : 'dark:border-neutral-800 border-[#D4AF37]/30 shadow-2xl dark:shadow-black shadow-amber-900/15'
            } flex flex-col items-center select-none text-center`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full dark:text-neutral-400 text-neutral-500 hover:text-[#1C1618] dark:hover:text-[#F5F1E8] dark:hover:bg-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Heading */}
            <div className="flex flex-col items-center gap-1.5 mb-5">
              <Sparkles className="w-5 h-5 text-[#E7C878] dark:text-[#E7C878] text-[#B38838] animate-pulse" />
              <span className="text-[10px] uppercase font-sans-luxury tracking-[0.3em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
                Private Access
              </span>
              <h2 className="text-xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
                YOU KNOW THE WAY
              </h2>
            </div>

            {/* Feedback Text */}
            <motion.p
              key={feedbackText}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs font-editorial tracking-wide mb-6 h-5 ${
                isSuccess
                  ? 'text-[#C52A49] dark:text-[#FEF08A] font-semibold'
                  : isError
                  ? 'text-rose-500 dark:text-rose-400 font-semibold'
                  : 'dark:text-neutral-400 text-neutral-600'
              }`}
            >
              {feedbackText}
            </motion.p>

            {/* PIN Dots Display */}
            <motion.div
              animate={isError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              {[0, 1, 2, 3].map((index) => {
                const isFilled = index < pin.length;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                      isSuccess
                        ? 'bg-[#FEF08A] border-[#FEF08A] shadow-[0_0_12px_#FEF08A]'
                        : isError
                        ? 'bg-rose-500 border-rose-500 shadow-[0_0_12px_#f43f5e]'
                        : isFilled
                        ? 'dark:bg-[#E7C878] bg-[#B38838] border-[#B38838] dark:border-[#E7C878] scale-110 shadow-[0_0_10px_rgba(231,200,120,0.6)]'
                        : 'dark:border-neutral-700 border-neutral-300 dark:bg-neutral-900/60 bg-neutral-100'
                    }`}
                  />
                );
              })}
            </motion.div>

            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigit(digit)}
                  disabled={isSuccess}
                  className="h-14 rounded-2xl dark:bg-neutral-900/60 bg-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 active:bg-[#E7C878]/20 border dark:border-neutral-800 border-neutral-200 hover:border-[#E7C878] text-lg font-cinzel dark:text-[#F5F1E8] text-[#1C1618] hover:text-[#B38838] dark:hover:text-[#FEF08A] transition-all flex items-center justify-center shadow-md cursor-pointer disabled:opacity-50 font-bold"
                >
                  {digit}
                </button>
              ))}

            {/* Clear Button */}
            <button
              onClick={handleClear}
              disabled={isSuccess}
              className="h-14 rounded-2xl dark:bg-neutral-900/40 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800/60 border dark:border-neutral-800/60 border-neutral-300 text-xs font-sans-luxury dark:text-neutral-400 text-neutral-600 dark:hover:text-neutral-200 hover:text-neutral-900 uppercase tracking-widest transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 font-bold"
            >
              C
            </button>

            {/* Zero Button */}
            <button
              onClick={() => handleDigit('0')}
              disabled={isSuccess}
              className="h-14 rounded-2xl dark:bg-neutral-900/60 bg-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 active:bg-[#E7C878]/20 border dark:border-neutral-800 border-neutral-200 hover:border-[#E7C878] text-lg font-cinzel dark:text-[#F5F1E8] text-[#1C1618] hover:text-[#B38838] dark:hover:text-[#FEF08A] transition-all flex items-center justify-center shadow-md cursor-pointer disabled:opacity-50 font-bold"
            >
              0
            </button>

            {/* Backspace Button */}
            <button
              onClick={handleBackspace}
              disabled={isSuccess}
              className="h-14 rounded-2xl dark:bg-neutral-900/40 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800/60 border dark:border-neutral-800/60 border-neutral-300 dark:text-neutral-400 text-neutral-600 dark:hover:text-neutral-200 hover:text-neutral-900 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
};
