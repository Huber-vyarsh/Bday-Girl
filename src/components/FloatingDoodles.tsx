import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Award, Star } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const FloatingDoodles: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleEasterEggClick = (msg: string) => {
    soundEngine.playBloomChime();
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Subtle, non-obtrusive celestial charms tucked in safe screen margins */}
      
      {/* Top Right Charm */}
      <motion.button
        animate={{
          y: [0, -6, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-4 right-24 pointer-events-auto p-2 rounded-full dark:bg-neutral-950/60 bg-white/80 border dark:border-[#E7C878]/30 border-[#D4AF37]/40 hover:border-[#FEF08A] dark:text-[#FEF08A] text-[#9E7B34] shadow-md transition-all hover:scale-110 cursor-pointer hidden md:flex items-center gap-1.5 text-[10px] font-sans-luxury tracking-widest uppercase"
        onClick={() => handleEasterEggClick("Diva badge confirmed ✨ Jessica reigns supreme as the Runway CEO!")}
        title="Diva Starlight Charm"
      >
        <Sparkles className="w-3 h-3 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34]" />
        <span className="opacity-80 hover:opacity-100 font-semibold">Polar Bear HQ</span>
      </motion.button>

      {/* Floating Interactive Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-md w-11/12"
          >
            <div className="px-5 py-3.5 rounded-2xl dark:bg-neutral-950/95 bg-white/95 backdrop-blur-2xl border dark:border-[#E7C878]/60 border-[#D4AF37]/60 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex items-center gap-3">
              <Award className="w-5 h-5 dark:text-[#FEF08A] text-[#9B1D35] shrink-0" />
              <p className="text-xs sm:text-sm dark:text-[#F5F1E8] text-[#1C1618] font-editorial tracking-wide font-medium">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

