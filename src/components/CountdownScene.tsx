import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, KeyRound, Sparkles, Heart } from 'lucide-react';
import { PROJECT_CONFIG } from '../config';
import { CountdownTimeLeft } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface CountdownSceneProps {
  onOpenPinModal: () => void;
  onUnlock: () => void;
}

export const CountdownScene: React.FC<CountdownSceneProps> = ({
  onOpenPinModal,
  onUnlock,
}) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false,
    totalSecondsRemaining: 999999,
  });

  useEffect(() => {
    // Precise IST Target time timestamp in milliseconds
    const targetTimestamp = new Date(PROJECT_CONFIG.birthday.targetIso).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isUnlocked: true,
          totalSecondsRemaining: 0,
        });
        // Emit global event and unlock
        window.dispatchEvent(new CustomEvent('birthdayUnlocked'));
        onUnlock();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isUnlocked: false,
        totalSecondsRemaining: Math.floor(difference / 1000),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [onUnlock]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8 text-center select-none">
      {/* Top Editorial Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-2 pt-6"
      >
        <span className="text-[11px] md:text-xs uppercase font-sans-luxury tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878]/80 light:text-[#A87C28] font-semibold">
          A Private Digital Universe
        </span>
        <h1 className="text-xl md:text-2xl font-cinzel tracking-[0.25em] dark:text-[#F5F1E8] text-[#1C1618] uppercase">
          FOR JESSICA
        </h1>
        <div className="flex items-center gap-3 text-xs font-editorial dark:text-neutral-400 text-neutral-600 tracking-widest mt-1">
          <span>07</span>
          <span className="text-[#E7C878] dark:text-[#E7C878] text-[#B38838]">•</span>
          <span>09</span>
          <span className="text-[#E7C878] dark:text-[#E7C878] text-[#B38838]">•</span>
          <span>2026</span>
        </div>
      </motion.div>

      {/* Main Countdown Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl flex flex-col items-center my-auto py-8"
      >
        <div className="flex items-center gap-2 mb-6 text-xs uppercase font-sans-luxury tracking-[0.3em] dark:text-neutral-400 text-neutral-600">
          <Sparkles className="w-3.5 h-3.5 text-[#E7C878] dark:text-[#E7C878] text-[#B38838]" />
          <span>The Countdown</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E7C878] dark:text-[#E7C878] text-[#B38838]" />
        </div>

        {/* Big Glowing Digits Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-8 w-full max-w-3xl">
          {/* Days */}
          <div className="flex flex-col items-center p-3 sm:p-5 md:p-6 rounded-2xl dark:bg-neutral-950/60 bg-white/80 dark:border-neutral-800/80 border-[#D4AF37]/30 backdrop-blur-md shadow-2xl dark:shadow-black/50 shadow-amber-900/10 relative group hover:border-[#E7C878] transition-colors">
            <span className="text-3xl sm:text-5xl md:text-7xl font-cinzel font-bold dark:text-[#F5F1E8] text-[#1C1618] tracking-tight group-hover:text-[#FEF08A] dark:group-hover:text-[#FEF08A] transition-colors drop-shadow-[0_0_20px_rgba(231,200,120,0.15)]">
              {pad(timeLeft.days)}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-luxury tracking-[0.25em] dark:text-neutral-400 text-neutral-500 mt-2 uppercase font-medium">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center p-3 sm:p-5 md:p-6 rounded-2xl dark:bg-neutral-950/60 bg-white/80 dark:border-neutral-800/80 border-[#D4AF37]/30 backdrop-blur-md shadow-2xl dark:shadow-black/50 shadow-amber-900/10 relative group hover:border-[#E7C878] transition-colors">
            <span className="text-3xl sm:text-5xl md:text-7xl font-cinzel font-bold dark:text-[#F5F1E8] text-[#1C1618] tracking-tight group-hover:text-[#FEF08A] dark:group-hover:text-[#FEF08A] transition-colors drop-shadow-[0_0_20px_rgba(231,200,120,0.15)]">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-luxury tracking-[0.25em] dark:text-neutral-400 text-neutral-500 mt-2 uppercase font-medium">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center p-3 sm:p-5 md:p-6 rounded-2xl dark:bg-neutral-950/60 bg-white/80 dark:border-neutral-800/80 border-[#D4AF37]/30 backdrop-blur-md shadow-2xl dark:shadow-black/50 shadow-amber-900/10 relative group hover:border-[#E7C878] transition-colors">
            <span className="text-3xl sm:text-5xl md:text-7xl font-cinzel font-bold dark:text-[#F5F1E8] text-[#1C1618] tracking-tight group-hover:text-[#FEF08A] dark:group-hover:text-[#FEF08A] transition-colors drop-shadow-[0_0_20px_rgba(231,200,120,0.15)]">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-[10px] sm:text-xs font-sans-luxury tracking-[0.25em] dark:text-neutral-400 text-neutral-500 mt-2 uppercase font-medium">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center p-3 sm:p-5 md:p-6 rounded-2xl dark:bg-neutral-950/60 bg-white/80 dark:border-neutral-800/80 border-[#D4AF37]/30 backdrop-blur-md shadow-2xl dark:shadow-black/50 shadow-amber-900/10 relative group hover:border-[#E7C878] transition-colors">
            <motion.span
              key={timeLeft.seconds}
              initial={{ scale: 1.06, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl sm:text-5xl md:text-7xl font-cinzel font-bold dark:text-[#FEF08A] text-[#C52A49] tracking-tight drop-shadow-[0_0_25px_rgba(254,240,138,0.35)]"
            >
              {pad(timeLeft.seconds)}
            </motion.span>
            <span className="text-[10px] sm:text-xs font-sans-luxury tracking-[0.25em] dark:text-neutral-400 text-neutral-500 mt-2 uppercase font-medium">
              Seconds
            </span>
          </div>
        </div>

        {/* Lock Status & Message */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm md:text-base font-editorial italic dark:text-neutral-300 text-neutral-700 tracking-wider">
            "Something extraordinary is waiting just across time."
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-neutral-900/80 bg-rose-50/90 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-sans-luxury tracking-widest uppercase shadow-md">
            <Lock className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
            <span>Birthday Locked • 12:00 PM IST</span>
          </div>
        </div>
      </motion.div>

      {/* Secret Bypass Footnote & PIN Entry Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="flex flex-col items-center gap-4 pb-4"
      >
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenPinModal();
          }}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full dark:bg-neutral-900/60 bg-white/90 border border-[#E7C878]/50 hover:border-[#E7C878] dark:hover:bg-[#E7C878]/10 hover:bg-amber-50 text-xs font-sans-luxury dark:text-[#E7C878] text-[#9E7B34] hover:text-[#B38838] dark:hover:text-[#FEF08A] tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-[#E7C878]/20 cursor-pointer font-bold"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] group-hover:rotate-45 transition-transform duration-300" />
          <span>I Know The Secret</span>
        </button>

        <p className="text-[11px] dark:text-neutral-500 text-neutral-500 font-editorial tracking-widest">
          Crafted with entirely too much love for Jessica
        </p>
      </motion.div>
    </div>
  );
};
