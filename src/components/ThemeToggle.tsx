import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEngine } from '../utils/soundEngine';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleToggle = () => {
    soundEngine.playClick();
    toggleTheme();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={handleToggle}
      className={`fixed top-4 right-4 sm:right-6 md:right-8 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl cursor-pointer select-none group ${
        isDark
          ? 'bg-neutral-950/80 border-[#E7C878]/30 hover:border-[#FEF08A] text-[#F5F1E8] shadow-black/60'
          : 'bg-white/90 border-[#D4AF37]/50 hover:border-[#B38838] text-[#1C1618] shadow-amber-900/10'
      }`}
      title={isDark ? 'Switch to Daylight Theme' : 'Switch to Velvet Night Theme'}
      aria-label="Toggle visual theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="text-[#FEF08A]"
            >
              <Moon className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="text-[#B38838]"
            >
              <Sun className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="text-[11px] font-sans-luxury tracking-wider uppercase font-semibold">
        {isDark ? (
          <span className="text-neutral-300 group-hover:text-[#FEF08A] transition-colors">Night</span>
        ) : (
          <span className="text-[#4A2E35] group-hover:text-[#B38838] transition-colors">Daylight</span>
        )}
      </span>

      <Sparkles
        className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-12 ${
          isDark ? 'text-[#E7C878]' : 'text-[#B38838]'
        }`}
      />
    </motion.button>
  );
};
