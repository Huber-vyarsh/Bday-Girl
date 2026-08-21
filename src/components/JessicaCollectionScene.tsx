import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Crown, Layers, Bookmark, Star, QrCode, Sliders } from 'lucide-react';
import { FASHION_LOOKBOOK } from '../data/fashionData';
import { soundEngine } from '../utils/soundEngine';
import { triggerGoldDustConfetti } from '../utils/confetti';

interface JessicaCollectionSceneProps {
  onNextScene: () => void;
}

export const JessicaCollectionScene: React.FC<JessicaCollectionSceneProps> = ({
  onNextScene,
}) => {
  const [activeLookIndex, setActiveLookIndex] = useState<number>(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentLook = FASHION_LOOKBOOK[activeLookIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; // max rotation 12deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8 pb-28 sm:pb-32 select-none perspective-1000">
      {/* Editorial Vogue Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 text-center max-w-2xl z-10"
      >
        <div className="flex items-center gap-3 text-[11px] font-sans-luxury uppercase tracking-[0.45em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          <span>PARIS</span>
          <span>·</span>
          <span>MILAN</span>
          <span>·</span>
          <span>NEW YORK</span>
          <span>·</span>
          <span className="text-[#C52A49] dark:text-[#FEF08A] font-bold">JESSICA EDITION</span>
        </div>

        {/* Iconic Big Editorial Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-cinzel text-transparent bg-clip-text bg-gradient-to-b dark:from-[#FFF] dark:via-[#F5F1E8] dark:to-[#E7C878] from-[#1C1618] via-[#4A0C18] to-[#9B1D35] tracking-[0.2em] uppercase drop-shadow-[0_0_25px_rgba(231,200,120,0.2)] font-black">
          VOGUE
        </h2>

        <p className="text-xs sm:text-sm font-editorial italic dark:text-neutral-300 text-neutral-600 max-w-lg">
          "Celebrating the rare grace, effortless elegance, and iconic style of the one and only Jessica."
        </p>
      </motion.div>

      {/* Main Fashion Editorial Lookbook Display */}
      <div className="w-full max-w-5xl my-6 flex flex-col lg:flex-row items-center gap-8 z-10">
        {/* Left: Authentic Vogue Magazine Cover */}
        <div className="w-full lg:w-1/2 flex justify-center perspective-[1500px]">
          <motion.div
            key={currentLook.id}
            initial={{ opacity: 0, scale: 0.94, rotateY: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: tilt.x, 
              rotateY: tilt.y 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-76 sm:w-88 aspect-[3/4.2] rounded-2xl overflow-hidden border-2 border-[#E7C878]/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.95)] group bg-neutral-950 transform-gpu cursor-pointer"
          >
            {/* Magazine Cover Image */}
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
            />
            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/40" />

            {/* Top Glossy Sheen Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Top Vogue Masthead on Cover */}
            <div className="absolute top-3 inset-x-4 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-cinzel font-black tracking-[0.25em] text-[#FEF08A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                VOGUE
              </span>
              <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-sans-luxury tracking-[0.3em] text-[#E7C878] uppercase border-t border-b border-[#E7C878]/40 py-0.5 mt-0.5">
                <span>PRIVATE ISSUE NO. 07</span>
                <span>SEPTEMBER 2026</span>
                <span>$14.00 · £10.50</span>
              </div>
            </div>

            {/* Editorial Cover Story Blurbs */}
            <div className="absolute left-4 top-24 max-w-[170px] text-left flex flex-col gap-2.5">
              <div className="border-l-2 border-[#FEF08A] pl-2">
                <p className="text-[9px] font-sans-luxury text-[#E7C878] uppercase tracking-wider">EXCLUSIVE</p>
                <p className="text-[11px] font-cinzel font-bold text-white leading-tight">THE ART OF EFFORTLESS GRACE</p>
              </div>
              <div className="border-l-2 border-[#E7C878]/50 pl-2">
                <p className="text-[9px] font-sans-luxury text-neutral-300 uppercase tracking-wider">HAUTE COUTURE</p>
                <p className="text-[10px] font-editorial italic text-neutral-200 leading-tight">"Why 4 closets are strictly essential."</p>
              </div>
            </div>

            {/* Bottom Cover Title & Barcode */}
            <div className="absolute bottom-3 inset-x-4 flex items-end justify-between">
              <div className="text-left max-w-[70%]">
                <span className="px-2 py-0.5 rounded bg-[#3A0B17]/90 border border-[#E7C878]/50 text-[9px] font-sans-luxury tracking-[0.25em] text-[#FEF08A] uppercase">
                  {currentLook.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#F5F1E8] drop-shadow-md mt-1">
                  {currentLook.title}
                </h3>
              </div>

              {/* Realistic Faux Barcode Badge */}
              <div className="flex flex-col items-center bg-white/90 text-black px-2 py-1 rounded shadow-sm">
                <div className="flex gap-0.5 h-6 items-center">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 3, 1].map((w, i) => (
                    <span key={i} className="bg-black h-full" style={{ width: `${w}px` }} />
                  ))}
                </div>
                <span className="text-[7px] font-mono tracking-widest mt-0.5">0709-2026-VOGUE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Lookbook Details & Persona Traits */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Lookbook Navigator Selector */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 mb-4">
            {FASHION_LOOKBOOK.map((look, idx) => {
              const isSelected = idx === activeLookIndex;
              return (
                <button
                  key={look.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveLookIndex(idx);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans-luxury tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'dark:bg-[#FEF08A] bg-[#B38838] dark:text-neutral-950 text-white font-bold shadow-lg shadow-amber-900/15 scale-105'
                      : 'dark:bg-neutral-900/80 bg-white/90 border dark:border-neutral-800 border-neutral-300 dark:text-neutral-400 text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  Look 0{idx + 1}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentLook.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col gap-4 p-6 sm:p-8 rounded-3xl dark:bg-neutral-950/90 bg-white/95 border dark:border-[#E7C878]/30 border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl dark:shadow-black/60 shadow-amber-900/10 relative overflow-hidden"
            >
              {/* Corner Watermark */}
              <div className="absolute top-4 right-4 text-[10px] font-sans-luxury dark:text-[#E7C878]/40 text-[#9E7B34]/60 tracking-widest uppercase font-semibold">
                EDITORIAL SPREAD
              </div>

              <div>
                <span className="text-[10px] font-sans-luxury tracking-[0.3em] dark:text-[#E7C878] text-[#9E7B34] uppercase font-semibold">
                  {currentLook.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] mb-2 font-bold">
                  {currentLook.title}
                </h3>
                <p className="text-sm font-editorial dark:text-neutral-300 text-neutral-700 leading-relaxed">
                  {currentLook.description}
                </p>
              </div>

              {/* Magazine Pull-Quote */}
              <div className="p-4 rounded-2xl dark:bg-gradient-to-r dark:from-neutral-900/90 dark:via-neutral-900/50 dark:to-neutral-900/90 bg-amber-50/80 border-l-3 border-[#E7C878] text-xs sm:text-sm font-editorial italic dark:text-[#FEF08A] text-amber-900 leading-relaxed shadow-sm font-medium">
                "{currentLook.quote}"
              </div>

              {/* Style Traits & Accents */}
              <div>
                <span className="text-[10px] font-sans-luxury dark:text-neutral-400 text-neutral-500 uppercase tracking-widest mb-1.5 block">
                  Signature Elements & Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentLook.traits.map((trait, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full dark:bg-neutral-900 bg-amber-50/90 border dark:border-[#E7C878]/30 border-amber-300/40 text-[11px] font-sans-luxury dark:text-amber-200/90 text-[#9E7B34] font-medium tracking-wider shadow-sm"
                    >
                      ✦ {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Director / Husband's Editorial Note */}
              {currentLook.easterEggNote && (
                <div className="p-3 rounded-xl dark:bg-neutral-900/60 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 text-[11px] font-sans-luxury dark:text-neutral-400 text-neutral-600 italic">
                  <span className="dark:text-[#E7C878] text-[#9E7B34] font-semibold not-italic">Editor-in-Chief Note: </span>
                  {currentLook.easterEggNote}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 z-10">
        <button
          onClick={() => {
            soundEngine.playClick();
            triggerGoldDustConfetti({ particleCount: 80 });
            onNextScene();
          }}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#20050c] to-[#3a0b17] border border-[#E7C878] text-xs font-cinzel tracking-[0.25em] text-[#FEF08A] uppercase shadow-xl hover:shadow-[#E7C878]/25 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <span>Take The "How Well Do You Know Me?" Quiz</span>
          <ArrowRight className="w-4 h-4 text-[#FEF08A] group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

