import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Flower2, Check, Waves, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WATER_LILIES_DATA } from '../data/bouquetData';
import { WaterLilyFlower } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface WaterLilyBouquetSceneProps {
  onNextScene: () => void;
}

export const WaterLilyBouquetScene: React.FC<WaterLilyBouquetSceneProps> = ({
  onNextScene,
}) => {
  const [lilies, setLilies] = useState<WaterLilyFlower[]>(WATER_LILIES_DATA);
  const [activeLilyIndex, setActiveLilyIndex] = useState<number>(0);
  const [bloomedCount, setBloomedCount] = useState<number>(0);
  const [isBouquetComplete, setIsBouquetComplete] = useState<boolean>(false);
  const [isBloomingAnimation, setIsBloomingAnimation] = useState<boolean>(false);

  const currentLily = lilies[activeLilyIndex];

  const bloomLily = (index: number) => {
    soundEngine.playBloomChime();
    setIsBloomingAnimation(true);
    setTimeout(() => setIsBloomingAnimation(false), 900);

    const updated = [...lilies];
    if (updated[index].stage < 2) {
      updated[index].stage = 2; // fully bloomed
      setLilies(updated);
      const newBloomedCount = updated.filter((l) => l.stage === 2).length;
      setBloomedCount(newBloomedCount);

      if (newBloomedCount === lilies.length) {
        setIsBouquetComplete(true);
        soundEngine.playCelebrationChime();
        try {
          confetti({
            particleCount: 90,
            spread: 85,
            origin: { y: 0.5 },
            colors: ['#FEF08A', '#FDA4AF', '#E7C878', '#F5F1E8', '#9333EA', '#38BDF8'],
          });
        } catch {}
      }
    }
  };

  const handleNextLily = () => {
    bloomLily(activeLilyIndex);
    if (activeLilyIndex < lilies.length - 1) {
      setActiveLilyIndex(activeLilyIndex + 1);
    }
  };

  // Environmental progression level (0 to 1)
  const pondMagicLevel = bloomedCount / lilies.length;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:py-12 pb-32 sm:pb-36 text-center select-none overflow-x-hidden">
      {/* Dynamic Nocturnal Pond Lighting Aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(231,200,120,${0.03 + pondMagicLevel * 0.08}), rgba(197,42,73,${0.02 + pondMagicLevel * 0.05}) 40%, rgba(5,5,5,0.95) 80%)`,
        }}
      />

      {/* Floating Fireflies in Nocturnal Air */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 + Math.floor(pondMagicLevel * 10) }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FEF08A] shadow-[0_0_10px_#FEF08A]"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              left: `${(i * 13) % 95}%`,
              top: `${(i * 17) % 85}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, -10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 max-w-xl z-20 mb-4"
      >
        <div className="flex items-center gap-2 text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          <Flower2 className="w-4 h-4 text-[#E7C878] dark:text-[#FEF08A] text-[#C52A49]" />
          <span>Chapter 02 ✦ The Water Lily Pond</span>
          <Flower2 className="w-4 h-4 text-[#E7C878] dark:text-[#FEF08A] text-[#C52A49]" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
          BLOOMING JUST FOR YOU
        </h2>
        <p className="text-xs sm:text-sm font-editorial italic dark:text-neutral-300 text-neutral-600">
          "A serene pond of water lilies, blossoming one by one with personal vows woven into each petal."
        </p>
      </motion.div>

      {/* Main Interactive Stage: The Serene Nocturnal Bloom Pond / Bouquet */}
      <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 my-2 z-20">
        {/* Left/Center: Visual Water Lily Pond Canvas */}
        <div className="relative w-72 sm:w-84 md:w-96 h-72 sm:h-84 md:h-96 flex items-center justify-center shrink-0">
          {/* Water ripple circles */}
          <div className="absolute inset-0 rounded-full dark:bg-gradient-to-b dark:from-[#071318]/70 dark:via-[#040c10]/90 dark:to-[#020507] bg-gradient-to-b from-[#e0f2fe]/80 via-[#bae6fd]/60 to-[#7dd3fc]/40 border dark:border-teal-500/20 border-teal-600/30 shadow-[0_0_50px_rgba(20,80,60,0.15)] dark:shadow-[0_0_50px_rgba(20,80,60,0.25)] flex items-center justify-center overflow-hidden">
            {/* Pulsing Water Ripples */}
            <div
              className={`w-64 sm:w-72 h-64 sm:h-72 rounded-full dark:border-teal-300/20 border-teal-500/30 opacity-30 ${
                isBloomingAnimation ? 'animate-ping' : 'animate-pulse'
              }`}
              style={{ animationDuration: '3.5s' }}
            />
            <div className="w-44 sm:w-52 h-44 sm:h-52 rounded-full dark:border-[#E7C878]/25 border-amber-600/25 animate-pulse" />
            <div className="w-32 sm:w-36 h-32 sm:h-36 rounded-full dark:border-teal-400/15 border-teal-600/20" />
          </div>

          {/* Lily Pad Base Illustration with ambient organic rotation */}
          <svg className="absolute w-60 sm:w-72 h-60 sm:h-72 opacity-80 pointer-events-none filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]" viewBox="0 0 200 200">
            <path
              d="M100 15 C145 15, 185 45, 185 100 C185 155, 145 185, 100 185 C55 185, 15 155, 15 100 C15 55, 45 20, 90 15 L100 100 Z"
              fill="#08261c"
              stroke="#134e38"
              strokeWidth="2.5"
            />
            {/* Secondary companion lily pad */}
            <path
              d="M30 40 C55 30, 80 50, 75 80 C70 100, 45 110, 25 95 C10 80, 15 50, 30 40 Z"
              fill="#061f17"
              stroke="#0f3d2c"
              strokeWidth="1.5"
              opacity="0.7"
            />
          </svg>

          {/* The Multi-Petal Water Lily Interactive SVG Display */}
          <motion.div
            key={activeLilyIndex}
            initial={{ scale: 0.75, opacity: 0, y: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -8, 0]
            }}
            transition={{ 
              scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.6 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="relative z-10 flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => bloomLily(activeLilyIndex)}
            title="Click to bloom flower"
          >
            <svg className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 filter drop-shadow-[0_0_30px_rgba(231,200,120,0.45)]" viewBox="0 0 300 300">
              <defs>
                <radialGradient id="customPetalGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor={currentLily.color} />
                  <stop offset="100%" stopColor="#4A0C18" />
                </radialGradient>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="60%" stopColor="#E7C878" />
                  <stop offset="100%" stopColor="#92400E" />
                </radialGradient>
              </defs>

              {/* Stems & Submerged Organic Vines */}
              <path d="M150 210 Q145 265 150 290" stroke="#0f3d2c" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M150 230 Q110 220 85 245" stroke="#0b3023" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M150 235 Q190 225 215 250" stroke="#0b3023" strokeWidth="3.5" strokeLinecap="round" fill="none" />

              {/* Layer 1: Outermost Broad Petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={`outer-${i}`} transform={`rotate(${angle} 150 150)`}>
                  <motion.path
                    d="M150 150 C120 95, 128 45, 150 25 C172 45, 180 95, 150 150 Z"
                    fill="url(#customPetalGrad)"
                    opacity={currentLily.stage >= 2 ? 0.95 : 0.35}
                    stroke="#F5F1E8"
                    strokeWidth="0.8"
                    initial={{ scale: 0.5 }}
                    animate={{
                      scale: currentLily.stage >= 2 ? 1 : 0.6,
                      rotate: currentLily.stage >= 2 ? 0 : [0, 2, 0],
                    }}
                    transition={{ duration: 1, delay: i * 0.04 }}
                  />
                </g>
              ))}

              {/* Layer 2: Mid-Layer Delicate Petals */}
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                <g key={`inner-${i}`} transform={`rotate(${angle} 150 150)`}>
                  <motion.path
                    d="M150 150 C132 110, 138 68, 150 50 C162 68, 168 110, 150 150 Z"
                    fill={currentLily.color}
                    opacity={currentLily.stage >= 2 ? 1 : 0.45}
                    stroke="#FFFFFF"
                    strokeWidth="0.6"
                    initial={{ scale: 0.4 }}
                    animate={{
                      scale: currentLily.stage >= 2 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.85, delay: 0.15 + i * 0.03 }}
                  />
                </g>
              ))}

              {/* Layer 3: Central Pointed Crown Petals */}
              {[11.25, 56.25, 101.25, 146.25, 191.25, 236.25, 281.25, 326.25].map((angle, i) => (
                <g key={`crown-${i}`} transform={`rotate(${angle} 150 150)`}>
                  <motion.path
                    d="M150 150 C140 120, 142 85, 150 72 C158 85, 160 120, 150 150 Z"
                    fill="#FFFBEB"
                    opacity={currentLily.stage >= 2 ? 0.95 : 0.3}
                    stroke={currentLily.color}
                    strokeWidth="0.5"
                    animate={{
                      scale: currentLily.stage >= 2 ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.02 }}
                  />
                </g>
              ))}

              {/* Glowing Golden Water Lily Stamen / Core */}
              <circle cx="150" cy="150" r={currentLily.stage >= 2 ? 24 : 14} fill="url(#coreGlow)" className="animate-pulse" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <circle
                  key={deg}
                  cx={150 + Math.cos((deg * Math.PI) / 180) * 15}
                  cy={150 + Math.sin((deg * Math.PI) / 180) * 15}
                  r="2.5"
                  fill="#FEF08A"
                />
              ))}
            </svg>

            {/* Click to Bloom Prompt Badge */}
            {currentLily.stage < 2 && (
              <span className="absolute bottom-2 px-3.5 py-1.5 rounded-full dark:bg-black/75 bg-white/90 border dark:border-[#FEF08A]/70 border-[#D4AF37] text-[11px] font-sans-luxury dark:text-[#FEF08A] text-[#9E7B34] font-bold tracking-wider uppercase animate-bounce shadow-lg">
                ✦ Tap to bloom ✦
              </span>
            )}
          </motion.div>
        </div>

        {/* Right: Love Note & Dedication Card */}
        <div className="w-full max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* 8 Lily Selector Tabs */}
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 max-w-full">
            {lilies.map((lily, idx) => {
              const isSelected = idx === activeLilyIndex;
              const isBloomed = lily.stage === 2;
              return (
                <button
                  key={lily.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveLilyIndex(idx);
                  }}
                  className={`relative px-2.5 py-1.5 rounded-full text-[11px] font-sans-luxury tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'dark:bg-[#E7C878] bg-[#B38838] dark:text-neutral-950 text-white font-bold shadow-md'
                      : isBloomed
                      ? 'dark:bg-neutral-900 bg-amber-50 border dark:border-[#E7C878]/40 border-[#D4AF37]/40 dark:text-[#FEF08A] text-[#9E7B34] font-medium'
                      : 'dark:bg-neutral-900/60 bg-neutral-100 border dark:border-neutral-800 border-neutral-300 dark:text-neutral-400 text-neutral-600'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  {isBloomed && <Check className="w-3 h-3 text-emerald-500" />}
                </button>
              );
            })}
          </div>

          {/* Active Card Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLily.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-7 rounded-3xl dark:bg-neutral-950/90 bg-white/95 border dark:border-[#E7C878]/35 border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl dark:shadow-black shadow-amber-900/10 w-full"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-sans-luxury tracking-[0.25em] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
                  {currentLily.meaning}
                </span>
                <span className="text-xs font-cinzel dark:text-neutral-400 text-neutral-500">
                  {activeLilyIndex + 1} of {lilies.length}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] mb-1 font-bold">
                {currentLily.dedication}
              </h3>
              <p className="text-xs font-sans-luxury dark:text-[#FEF08A] text-[#C52A49] mb-4 font-semibold">
                {currentLily.name}
              </p>

              <p className="text-sm font-editorial dark:text-neutral-200 text-neutral-800 leading-relaxed mb-4">
                "{currentLily.note}"
              </p>

              <div className="pt-3 border-t dark:border-neutral-800 border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-editorial italic dark:text-neutral-400 text-neutral-600">
                  {currentLily.accentQuote}
                </span>

                {currentLily.stage < 2 ? (
                  <button
                    onClick={() => bloomLily(activeLilyIndex)}
                    className="px-4 py-1.5 rounded-full dark:bg-[#E7C878]/20 bg-amber-100 border dark:border-[#E7C878] border-[#B38838] text-xs font-sans-luxury dark:text-[#FEF08A] text-[#9E7B34] font-bold hover:brightness-110 transition-colors cursor-pointer shadow-md"
                  >
                    Bloom ✦
                  </button>
                ) : (
                  <span className="text-xs font-sans-luxury text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Bloomed
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Lily / Complete Bouquet CTA */}
          <div className="mt-6 flex items-center gap-3">
            {!isBouquetComplete ? (
              <button
                onClick={handleNextLily}
                className="px-6 py-2.5 rounded-full dark:bg-neutral-900 bg-white border dark:border-[#E7C878]/60 border-[#D4AF37] hover:border-[#FEF08A] text-xs font-sans-luxury tracking-widest dark:text-[#FEF08A] text-[#9E7B34] font-bold uppercase transition-all cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-lg shadow-amber-900/10"
              >
                Bloom & Next Lily ({bloomedCount}/{lilies.length}) →
              </button>
            ) : (
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="px-4 py-1.5 rounded-full dark:bg-emerald-950/70 bg-emerald-50 border border-emerald-500/50 text-emerald-700 dark:text-emerald-300 text-xs font-sans-luxury tracking-wider flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bouquet Arrangement Complete!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grand Handwritten Silk Ribbon Dedication (Appears when all 8 bloom) */}
      <AnimatePresence>
        {isBouquetComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-30 max-w-2xl w-full mx-auto my-4 p-6 rounded-3xl bg-gradient-to-r from-[#20050c] via-[#3a0b17] to-[#20050c] border-2 border-[#E7C878] shadow-[0_0_50px_rgba(197,42,73,0.5)] flex flex-col items-center gap-3 text-center"
          >
            <div className="flex items-center gap-2 text-xs font-sans-luxury text-[#E7C878] tracking-[0.3em] uppercase">
              <Heart className="w-4 h-4 fill-[#C52A49] text-[#C52A49]" />
              <span>Bouquet Dedication Ribbon</span>
              <Heart className="w-4 h-4 fill-[#C52A49] text-[#C52A49]" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-handwriting text-[#FEF08A] tracking-wider leading-relaxed">
              "Happy Birthday, Jessica ✦ You are the most beautiful flower in the garden of my life."
            </h4>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNextScene();
              }}
              className="mt-3 group inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-[#E7C878] hover:bg-[#FEF08A] text-neutral-950 text-xs font-cinzel font-bold tracking-[0.25em] uppercase transition-all shadow-lg hover:shadow-[#FEF08A]/30 cursor-pointer hover:scale-105"
            >
              <span>Explore The Memory Universe</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
