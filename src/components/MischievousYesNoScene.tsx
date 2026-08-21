import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ArrowRight, Smile, Laugh, ShieldAlert, Lightbulb, AlertTriangle } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerGoldDustConfetti } from '../utils/confetti';

interface MischievousYesNoSceneProps {
  onNextScene: () => void;
}

export const MischievousYesNoScene: React.FC<MischievousYesNoSceneProps> = ({
  onNextScene,
}) => {
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [noButtonText, setNoButtonText] = useState<string>('No 🤔');
  const [showHintBanner, setShowHintBanner] = useState<boolean>(false);

  const teasingPhrases = [
    "Level 01: Do you love me unconditionally forever?",
    "Level 02: Nice try! The NO button is suddenly very shy.",
    "Level 03: Error 404: The 'NO' button has been relocated by court order.",
    "Level 04: Did you genuinely believe I wrote code allowing a 'NO'? 😏",
    "Level 05: Ma'am, rejecting this prompt violates Section 07 of our marriage contract.",
    "Level 06: Look how massive the YES button is becoming... it's destiny!",
    "Level 07: The NO button is running out of screen real estate!",
    "Level 08: Even the polar bears at the North Pole know the answer is YES.",
    "Level 09: Malai chaap order paused until YES is confirmed.",
    "Level 10: You are fighting gravitational forces of pure love!",
    "Level 11: Resistance is completely futile. You are stuck with me forever.",
    "Level 12: You really thought you could click NO? Look at the size of YES now! 😂",
  ];

  const noTextVariants = [
    'No 🤔',
    'Wait no!',
    'Oops missed!',
    'Still trying? 😜',
    'Too slow!',
    'Nope!',
    'Almost? No.',
    'Are you sure? 😏',
    'Click YES already!',
    'Forbidden 🚫',
    'Just click YES ❤️',
    'Fine, YES! 😂',
  ];

  const currentPhrase = teasingPhrases[Math.min(dodgeCount, teasingPhrases.length - 1)];

  const dodgeNoButton = () => {
    soundEngine.playKeyTone(Math.min(dodgeCount + 2, 8));
    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);

    // Dynamic chaotic positions that scale with level
    const maxBound = Math.min(100 + nextCount * 18, 260);
    const randomX = (Math.random() - 0.5) * maxBound * 1.5;
    const randomY = (Math.random() - 0.5) * maxBound;
    setNoPosition({ x: randomX, y: randomY });

    // Update text progressively
    setNoButtonText(noTextVariants[Math.min(nextCount, noTextVariants.length - 1)]);
  };

  const handleYesClick = () => {
    soundEngine.playGrandUnlock();
    setHasWon(true);
    triggerGoldDustConfetti({ particleCount: 120 });
  };

  const handleTriggerHint = () => {
    soundEngine.playGiggleTroll();
    setShowHintBanner(true);
    setTimeout(() => {
      setShowHintBanner(false);
    }, 4500);
  };

  // Calculations for dynamic chaos
  const yesScale = 1 + Math.min(dodgeCount * 0.1, 0.75);
  const noScale = Math.max(0.65, 1 - dodgeCount * 0.04);
  const noOpacity = dodgeCount >= 8 ? (dodgeCount % 2 === 0 ? 0.35 : 0.8) : 1;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8 pb-28 sm:pb-32 select-none text-center">
      {/* Reverse-Psychology Dramatic Big Hint Overlay */}
      <AnimatePresence>
        {showHintBanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -40, rotate: -2 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotate: [-2, 2, -1, 1, 0] 
            }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setShowHintBanner(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <div className="relative max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#2A0810] via-neutral-950 to-[#1A040A] border-2 border-[#FEF08A] shadow-[0_0_80px_rgba(254,240,138,0.4)] text-center flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-[#FEF08A] text-black shadow-lg">
                <AlertTriangle className="w-10 h-10 animate-bounce" />
              </div>
              <span className="text-xs font-sans-luxury tracking-[0.3em] uppercase text-[#FEF08A]">
                ✦ OFFICIAL SPOUSE NOTICE ✦
              </span>
              <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-[#FEF08A] leading-tight drop-shadow-md">
                WHATEVER YOU DO...<br />DON'T EVEN TRY TO CLICK "NO"!
              </h2>
              <p className="text-sm sm:text-base font-editorial italic text-neutral-200 leading-relaxed">
                "Seriously, Jessica. Do not even attempt it. It is physically, legally, and mathematically impossible." 😏
              </p>
              <div className="text-[11px] font-sans-luxury text-neutral-400 uppercase tracking-widest pt-2">
                (Tap anywhere to dismiss... or go test it if you dare)
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 max-w-xl z-10"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Chapter 06 ✦ Playful Interrogation
        </span>
        <h2 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
          THE ULTIMATE MARRIAGE TEST
        </h2>
      </motion.div>

      {/* Main Playful Interaction Box */}
      <div className="w-full max-w-2xl my-auto p-8 sm:p-12 rounded-3xl dark:bg-neutral-950/90 bg-white/95 border dark:border-[#E7C878]/30 border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl dark:shadow-black/60 shadow-amber-900/10 flex flex-col items-center gap-8 z-10 relative overflow-hidden">
        {!hasWon ? (
          <>
            {/* Heart Icon with scaling intensity */}
            <motion.div
              animate={{ scale: [1, 1.15 + Math.min(dodgeCount * 0.02, 0.2), 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="p-4 rounded-full dark:bg-[#3A0B17]/70 bg-rose-100 border border-[#C52A49]/50 shadow-[0_0_35px_rgba(197,42,73,0.3)]"
            >
              <Heart className="w-10 h-10 text-[#FEF08A] dark:text-[#FEF08A] fill-[#C52A49]" />
            </motion.div>

            {/* Dynamic Question / Tease Title */}
            <div className="w-full max-w-lg">
              <h3 className="text-xl sm:text-2xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] mb-2 leading-relaxed font-bold">
                "Do you love me unconditionally forever?"
              </h3>
              <motion.p
                key={currentPhrase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs sm:text-sm font-editorial italic dark:text-[#FEF08A] text-[#9E7B34] font-medium min-h-[40px] flex items-center justify-center"
              >
                {currentPhrase}
              </motion.p>
            </div>

            {/* YES / NO Interactive Buttons Container with chaos bounds */}
            <div className="relative min-h-[160px] w-full flex items-center justify-center gap-6">
              {/* Expanding YES Button */}
              <motion.button
                onClick={handleYesClick}
                animate={{
                  scale: yesScale,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                className="px-8 sm:px-10 py-4 rounded-full dark:bg-gradient-to-r dark:from-[#2a0810] dark:via-[#5c1224] dark:to-[#2a0810] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border-2 border-[#E7C878] text-sm sm:text-base font-cinzel font-bold text-[#FEF08A] uppercase tracking-widest shadow-2xl shadow-[#C52A49]/40 hover:shadow-[#FEF08A]/50 transition-all cursor-pointer z-20 hover:scale-105"
              >
                YES, OF COURSE ❤️
              </motion.button>

              {/* Mischievous Dodging NO Button with 12 level behaviors */}
              <motion.button
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onClick={dodgeNoButton}
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  scale: noScale,
                  opacity: noOpacity,
                  rotate: dodgeCount > 5 ? (dodgeCount % 2 === 0 ? 12 : -12) : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className="px-6 py-2.5 rounded-full dark:bg-neutral-900/90 bg-neutral-100 border dark:border-neutral-700 border-neutral-300 text-xs font-sans-luxury dark:text-neutral-400 text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 uppercase tracking-widest transition-colors cursor-pointer shadow-md whitespace-nowrap"
              >
                {noButtonText}
              </motion.button>
            </div>

            {/* Mischief Progress & Hint Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans-luxury">
              <button
                onClick={handleTriggerHint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full dark:bg-[#E7C878]/15 bg-amber-100 border dark:border-[#E7C878]/40 border-amber-300 hover:bg-amber-200 dark:hover:bg-[#E7C878]/25 dark:text-[#FEF08A] text-[#9E7B34] font-semibold transition-all cursor-pointer hover:scale-105 shadow-sm"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#9E7B34] dark:text-[#FEF08A]" />
                <span>💡 Need A Hint?</span>
              </button>

              <span className="text-neutral-400 dark:text-neutral-500">•</span>

              <span className="dark:text-neutral-400 text-neutral-600">Evasion Attempts: {dodgeCount}/12</span>
            </div>
          </>
        ) : (
          /* Victory & Sweetheart Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 text-center py-4"
          >
            <div className="p-4 rounded-full dark:bg-emerald-950/70 bg-emerald-100 border border-emerald-500/50 dark:text-[#FEF08A] text-emerald-800 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] font-bold">
              OFFICIALLY & UNCONDITIONALLY SEALED! ❤️
            </h3>

            <p className="text-sm sm:text-base font-editorial dark:text-neutral-200 text-neutral-800 leading-relaxed max-w-lg">
              "No amount of dodging could change what was written in the stars. You are my forever love, my queen, and my sweet chaotic polar bear, Jessica."
            </p>

            <div className="p-4 rounded-2xl dark:bg-neutral-900/90 bg-amber-50 border dark:border-[#E7C878]/40 border-amber-300 text-xs font-editorial italic dark:text-[#FEF08A] text-[#9E7B34] font-semibold">
              ✦ Khil + Batasha = Eternal Lifetime Partnership ✦
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNextScene();
              }}
              className="mt-4 group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E7C878] hover:bg-[#FEF08A] text-neutral-950 text-xs font-cinzel font-bold tracking-widest uppercase transition-all shadow-xl cursor-pointer hover:scale-105"
            >
              <span>Open The Secret Mystery Box</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="text-[11px] font-editorial dark:text-neutral-500 text-neutral-500 tracking-widest z-10">
        Certified Lawful Married-Couple Troll Architecture
      </div>
    </div>
  );
};
