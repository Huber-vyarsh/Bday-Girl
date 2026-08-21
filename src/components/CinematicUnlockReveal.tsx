import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROJECT_CONFIG } from '../config';
import { soundEngine } from '../utils/soundEngine';

interface CinematicUnlockRevealProps {
  onStartExperience: () => void;
}

export const CinematicUnlockReveal: React.FC<CinematicUnlockRevealProps> = ({
  onStartExperience,
}) => {
  useEffect(() => {
    // Play celebratory sound & trigger soft confetti on reveal
    soundEngine.playGrandUnlock();

    // Trigger subtle luxury confetti (gold & burgundy)
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E7C878', '#FEF08A', '#C52A49', '#F5F1E8'],
        disableForReducedMotion: true,
      });
    } catch {}
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 text-center select-none overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#3A0B17]/30 via-[#E7C878]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Title Sequence Box */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6">
        {/* Top Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34]" />
          <span className="text-xs md:text-sm font-sans-luxury uppercase tracking-[0.4em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
            The Wait Is Over
          </span>
          <Sparkles className="w-4 h-4 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34]" />
        </motion.div>

        {/* Happy Birthday Main Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel tracking-[0.2em] dark:text-[#F5F1E8] text-[#1C1618] uppercase font-bold">
            Happy Birthday
          </h2>

          <h1 className="text-6xl sm:text-7xl md:text-9xl font-editorial italic font-normal text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-[#FEF08A] dark:via-[#E7C878] dark:to-[#F5F1E8] bg-gradient-to-r from-[#9B1D35] via-[#C52A49] to-[#9E7B34] tracking-wide drop-shadow-[0_0_40px_rgba(231,200,120,0.35)] py-2">
            {PROJECT_CONFIG.recipient.name}
          </h1>
        </motion.div>

        {/* Emotional Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col items-center gap-3 max-w-xl"
        >
          <p className="text-base sm:text-lg md:text-xl font-editorial italic dark:text-neutral-300 text-neutral-700 tracking-wider">
            "Today isn't just another day on the calendar. It is the day the most extraordinary soul in the world was born."
          </p>

          <div className="flex items-center gap-2 text-xs font-sans-luxury dark:text-[#E7C878]/80 text-[#9E7B34] font-medium tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 text-[#C52A49]" fill="#C52A49" />
            <span>Dedicated with eternal devotion</span>
          </div>
        </motion.div>

        {/* Let's Begin CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="pt-6"
        >
          <button
            onClick={() => {
              soundEngine.playCelebrationChime();
              soundEngine.playBackgroundMusic();
              onStartExperience();
            }}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full dark:bg-gradient-to-r dark:from-[#2a0810] dark:via-[#480d1a] dark:to-[#2a0810] bg-gradient-to-r from-[#C52A49] via-[#9B1D35] to-[#C52A49] border border-[#E7C878]/60 hover:border-[#FEF08A] text-sm sm:text-base font-cinzel tracking-[0.25em] text-[#FEF08A] uppercase shadow-[0_0_30px_rgba(197,42,73,0.3)] hover:shadow-[0_0_45px_rgba(231,200,120,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer font-bold"
          >
            <span>Let's Begin</span>
            <ArrowRight className="w-4 h-4 text-[#FEF08A] group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
