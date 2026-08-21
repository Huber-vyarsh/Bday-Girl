import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RotateCcw, Award, Flame, Wand2, Star, Check } from 'lucide-react';
import { PROJECT_CONFIG } from '../config';
import { soundEngine } from '../utils/soundEngine';
import { triggerGrandFinaleConfetti, triggerGoldDustConfetti } from '../utils/confetti';

interface FinalEndingSceneProps {
  onRestart: () => void;
}

export const FinalEndingScene: React.FC<FinalEndingSceneProps> = ({ onRestart }) => {
  const [wishBlown, setWishBlown] = useState<boolean>(false);
  const [copiedVow, setCopiedVow] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.playGrandUnlock();
    triggerGrandFinaleConfetti();
  }, []);

  const handleMakeWish = () => {
    soundEngine.playBloomChime();
    setWishBlown(true);
    triggerGoldDustConfetti({ particleCount: 150, spread: 120 });
  };

  const handleCopyVow = () => {
    soundEngine.playClick();
    navigator.clipboard?.writeText(
      "You are the rhythm of my heart, the laughter in my quiet days, and the greatest love story I will ever know. Happy Birthday Jessica! — Your Husband"
    );
    setCopiedVow(true);
    setTimeout(() => setCopiedVow(false), 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 sm:py-16 px-4 md:px-8 pb-28 sm:pb-32 text-center select-none overflow-hidden">
      {/* Background Radiant Velvet Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#3A0B17]/50 via-[#E7C878]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.4em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Eternal Chapter ✦ The Grand Finale
        </span>
      </motion.div>

      {/* Main Emotional Message Container */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center gap-6 my-auto">
        {/* Heart Aura */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="p-4 rounded-full dark:bg-[#3A0B17]/80 bg-rose-100 border dark:border-[#FEF08A]/50 border-rose-300 dark:text-[#FEF08A] text-[#C52A49] shadow-[0_0_50px_rgba(197,42,73,0.3)]"
        >
          <Heart className="w-10 h-10 fill-[#C52A49] text-[#C52A49] dark:text-[#FEF08A]" />
        </motion.div>

        {/* Hero Photo Spotlight Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group p-2 rounded-3xl bg-gradient-to-b from-[#E7C878]/50 via-neutral-900 to-[#C52A49]/40 border border-[#E7C878]/60 shadow-2xl overflow-hidden max-w-xs sm:max-w-sm"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950">
            <img
              src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
              alt="Jessica & Husband Eternal Memory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-sans-luxury text-[#FEF08A] tracking-wider uppercase font-semibold">
                Forever My Greatest Adventure
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="text-xs sm:text-sm font-cinzel dark:text-[#E7C878] text-[#9E7B34] tracking-widest uppercase font-semibold">
            After all the games, surprises, and laughter...
          </h2>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial italic text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-[#FEF08A] dark:via-[#E7C878] dark:to-[#F5F1E8] bg-gradient-to-r from-[#9B1D35] via-[#C52A49] to-[#9E7B34] tracking-wide drop-shadow-[0_0_40px_rgba(231,200,120,0.3)]">
            Happy Birthday, Jessica
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg font-editorial italic dark:text-neutral-200 text-neutral-800 leading-relaxed max-w-2xl"
        >
          "You are the rhythm of my heart, the laughter in my quiet days, and the greatest love story I will ever know. Here is to another year of growing, laughing, and building our magical universe together."
        </motion.p>

        {/* Persona Pet Names Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans-luxury dark:text-[#FEF08A] text-[#9E7B34] font-semibold tracking-widest uppercase pt-1"
        >
          <span>My Polar Bear 🐻❄️</span>
          <span>•</span>
          <span>My Runway Diva 👑</span>
          <span>•</span>
          <span>My Sweet Khil & Batasha 🍚</span>
        </motion.div>

        {/* Interactive Make a Birthday Wish Feature */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-md p-6 rounded-3xl dark:bg-neutral-950/90 bg-white/95 border dark:border-[#E7C878]/40 border-[#D4AF37]/35 shadow-xl flex flex-col items-center gap-4 relative"
        >
          {!wishBlown ? (
            <>
              {/* Animated Floating Birthday Candle Flame */}
              <div className="relative flex flex-col items-center justify-end h-16 w-8 mt-2">
                <motion.div 
                  className="w-4 h-8 bg-gradient-to-b from-amber-100 via-amber-400 to-orange-500 rounded-[50%_50%_20%_20%] shadow-[0_0_20px_#f59e0b] origin-bottom"
                  animate={{ 
                    scale: [1, 1.1, 0.95, 1.15, 1],
                    skewX: [0, 5, -5, 0],
                    opacity: [0.9, 1, 0.8, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="w-1.5 h-6 bg-gradient-to-b from-neutral-800 to-neutral-950 rounded-b-md mt-[-2px]" />
                <motion.div 
                  className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl pointer-events-none"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <button
                onClick={handleMakeWish}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-full dark:bg-gradient-to-r dark:from-[#3A0B17] dark:to-[#5C1224] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border border-[#E7C878] text-xs font-cinzel text-[#FEF08A] uppercase tracking-wider shadow-lg hover:shadow-[#FEF08A]/30 transition-all hover:scale-105 cursor-pointer mt-2 font-bold"
              >
                <span>Blow Out Candle & Make A Wish ✨</span>
              </button>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <div className="flex items-center gap-2 text-xs font-cinzel dark:text-[#FEF08A] text-[#9E7B34] font-bold tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-[#FEF08A] dark:text-[#FEF08A]" />
                <span>Wish Released to the Cosmos!</span>
                <Sparkles className="w-4 h-4 text-[#FEF08A] dark:text-[#FEF08A]" />
              </div>
              <p className="text-xs font-editorial italic dark:text-neutral-300 text-neutral-700">
                "May every prayer, dream, and desire in your heart manifest into golden reality this year."
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={handleCopyVow}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full dark:bg-neutral-900 bg-white border dark:border-neutral-700 border-neutral-300 hover:border-[#E7C878] text-xs font-sans-luxury tracking-wider dark:text-neutral-300 text-neutral-700 hover:text-black dark:hover:text-[#FEF08A] transition-all cursor-pointer shadow-sm"
          >
            {copiedVow ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Star className="w-3.5 h-3.5 dark:text-[#E7C878] text-[#9E7B34]" />}
            <span>{copiedVow ? 'Vow Saved to Clipboard!' : 'Save Husband Vow'}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playCelebrationChime();
              onRestart();
            }}
            className="group flex items-center gap-2 px-7 py-2.5 rounded-full dark:bg-neutral-900/90 bg-white border dark:border-[#E7C878] border-[#D4AF37] hover:bg-[#E7C878]/20 text-xs font-cinzel tracking-widest dark:text-[#FEF08A] text-[#9E7B34] uppercase transition-all shadow-xl hover:scale-105 cursor-pointer font-bold"
          >
            <RotateCcw className="w-4 h-4 dark:text-[#FEF08A] text-[#9E7B34] group-hover:-rotate-90 transition-transform duration-300" />
            <span>Replay The Journey</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="z-10 text-[11px] font-editorial dark:text-neutral-500 text-neutral-500 tracking-widest"
      >
        Handcrafted with eternal love by your Husband ✦ 07 · 09 · 2026
      </motion.div>
    </div>
  );
};

