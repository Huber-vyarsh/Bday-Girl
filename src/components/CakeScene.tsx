import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface CakeSceneProps {
  onNextScene: () => void;
}

export const CakeScene: React.FC<CakeSceneProps> = ({ onNextScene }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [isWished, setIsWished] = useState<boolean>(false);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);

  const allExtinguished = candlesLit.every((lit) => !lit);

  const extinguishCandle = (index: number) => {
    if (!candlesLit[index]) return;
    soundEngine.playCandleBlow();
    const nextLit = [...candlesLit];
    nextLit[index] = false;
    setCandlesLit(nextLit);

    if (nextLit.every((lit) => !lit)) {
      triggerCelebration();
    }
  };

  const extinguishAllCandles = () => {
    if (allExtinguished) return;
    setIsBlowing(true);
    soundEngine.playCandleBlow();

    setTimeout(() => {
      setCandlesLit([false, false, false]);
      setIsBlowing(false);
      triggerCelebration();
    }, 400);
  };

  const triggerCelebration = () => {
    setIsWished(true);
    soundEngine.playCelebrationChime();

    try {
      // Grand celebratory multi-angle confetti explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E7C878', '#FEF08A', '#C52A49', '#FDA4AF', '#F5F1E8'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E7C878', '#FEF08A', '#C52A49'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E7C878', '#FEF08A', '#C52A49'],
        });
      }, 300);
    } catch {}
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 pb-28 sm:pb-32 text-center select-none">
      {/* Chapter Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-2"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Chapter 01 ✦ The Wish
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider mb-2 font-bold"
      >
        {allExtinguished ? 'YOUR WISH HAS BEEN SENT ✦' : 'MAKE A WISH, JESSICA'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs sm:text-sm font-editorial italic dark:text-neutral-400 text-neutral-600 max-w-md mb-8"
      >
        {allExtinguished
          ? '"May every dream in your heart unfold with grace and starlight."'
          : 'Close your eyes, whisper your deepest wish, and blow out the candles.'}
      </motion.p>

      {/* Illustrated Interactive Cake */}
      <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex flex-col items-center justify-end mb-8">
        {/* Glow backdrop behind cake */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            allExtinguished
              ? 'opacity-20 bg-[#E7C878]/10'
              : 'opacity-70 bg-gradient-to-t from-[#C52A49]/30 to-[#FEF08A]/25'
          }`}
        />

        {/* Floating Candles Row */}
        <div className="flex items-end justify-center gap-8 mb-[-6px] z-20">
          {[0, 1, 2].map((idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                onClick={() => extinguishCandle(idx)}
                className="group flex flex-col items-center cursor-pointer relative"
                title={isLit ? 'Click to blow candle' : 'Candle blown'}
              >
                {/* Flame or Smoke */}
                <div className="h-10 flex items-end justify-center mb-1">
                  {isLit ? (
                    <div className="relative flex flex-col items-center animate-candle-flicker">
                      {/* Outer Flame Glow */}
                      <div className="w-5 h-8 rounded-full bg-gradient-to-t from-[#C52A49] via-[#FEF08A] to-white blur-[1px] shadow-[0_0_15px_#FEF08A]" />
                      {/* Inner Blue Core */}
                      <div className="absolute bottom-0 w-2 h-3 rounded-full bg-cyan-300/80 blur-[0.5px]" />
                    </div>
                  ) : (
                    /* Smoke wisps */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -25, scale: 1.4 }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="w-2.5 h-6 rounded-full bg-neutral-400/40 blur-[2px]"
                    />
                  )}
                </div>

                {/* Candle Body */}
                <div className="w-4 h-14 rounded-t-sm bg-gradient-to-b from-[#FEF08A] via-[#E7C878] to-[#D4AF37] border-x border-t border-amber-200/50 shadow-md flex flex-col items-center justify-between py-1">
                  <div className="w-full h-0.5 bg-white/40" />
                  <div className="w-full h-0.5 bg-[#C52A49]/40" />
                  <div className="w-full h-0.5 bg-white/40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cake Tier 1 (Top Tier) */}
        <div className="relative z-10 w-44 h-16 rounded-t-2xl bg-gradient-to-b from-[#3A0B17] to-[#25070e] border border-[#E7C878]/40 shadow-xl flex items-center justify-center overflow-hidden">
          {/* Frosting Drips */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#FEF08A]/90 to-[#E7C878]/60 rounded-b-xl" />
          <div className="absolute bottom-2 flex gap-3 text-amber-200/60">
            <Heart className="w-3 h-3 fill-amber-300/40 text-amber-300" />
            <Sparkles className="w-3 h-3 text-amber-300" />
            <Heart className="w-3 h-3 fill-amber-300/40 text-amber-300" />
          </div>
        </div>

        {/* Cake Tier 2 (Middle Tier) */}
        <div className="relative z-10 w-56 h-20 rounded-t-2xl bg-gradient-to-b from-[#4a0e1e] to-[#2e0913] border border-[#E7C878]/50 shadow-2xl flex items-center justify-center overflow-hidden -mt-1">
          {/* Butter Yellow Frosting Swirls */}
          <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-[#FEF08A] via-[#FDE68A] to-[#E7C878] rounded-b-2xl shadow-sm" />
          <span className="text-xs font-cinzel tracking-[0.3em] text-[#FEF08A] mt-2">
            JESSICA ✦ 07.09
          </span>
        </div>

        {/* Cake Tier 3 (Base Tier) */}
        <div className="relative z-10 w-68 sm:w-72 h-20 rounded-t-3xl bg-gradient-to-b from-[#300913] to-[#1a040a] border border-[#E7C878]/60 shadow-2xl flex items-center justify-center overflow-hidden -mt-1">
          <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-[#FEF08A] to-[#E7C878] rounded-b-2xl" />
          <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[10px] font-editorial text-amber-200/70 tracking-widest uppercase">
            <span>Sweetheart</span>
            <span>•</span>
            <span>Polar Bear</span>
            <span>•</span>
            <span>Khil</span>
          </div>
        </div>

        {/* Gold Luxury Cake Stand / Platter */}
        <div className="relative z-0 w-80 sm:w-88 h-4 rounded-full bg-gradient-to-r from-[#B38728] via-[#FBF5B7] to-[#DAA520] shadow-[0_10px_30px_rgba(0,0,0,0.9)] -mt-1 border-t border-white/60" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 z-20">
        {!allExtinguished ? (
          <button
            onClick={extinguishAllCandles}
            disabled={isBlowing}
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full dark:bg-neutral-900/90 bg-white/95 border dark:border-[#E7C878] border-[#D4AF37] hover:bg-[#E7C878]/20 dark:text-[#FEF08A] text-[#9E7B34] font-bold tracking-[0.25em] uppercase shadow-lg shadow-amber-900/10 dark:shadow-[#E7C878]/15 transition-all cursor-pointer hover:scale-105 text-xs font-sans-luxury"
          >
            <Wind className="w-4 h-4 text-[#9E7B34] dark:text-[#FEF08A] group-hover:rotate-45 transition-transform" />
            <span>Blow Out All Candles</span>
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-2xl dark:bg-neutral-950/80 bg-white/90 border dark:border-[#E7C878]/40 border-[#D4AF37]/35 backdrop-blur-md max-w-md shadow-xl">
                <p className="text-sm font-editorial dark:text-[#FEF08A] text-[#C52A49] italic mb-1 font-semibold">
                  "Okay... now the real trouble begins."
                </p>
                <p className="text-xs dark:text-neutral-400 text-neutral-600 font-sans-luxury">
                  A bespoke bouquet of your favorite water lilies is blossoming next.
                </p>
              </div>

              <button
                onClick={() => {
                  soundEngine.playBloomChime();
                  onNextScene();
                }}
                className="group flex items-center gap-3 px-8 py-3.5 rounded-full dark:bg-gradient-to-r dark:from-[#3A0B17] dark:to-[#5C1224] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border border-[#E7C878] text-xs font-cinzel tracking-[0.25em] text-[#FEF08A] uppercase shadow-xl hover:shadow-[#E7C878]/30 transition-all duration-300 hover:scale-105 cursor-pointer font-bold"
              >
                <span>Receive Your Water Lily Bouquet</span>
                <ArrowRight className="w-4 h-4 text-[#FEF08A] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
