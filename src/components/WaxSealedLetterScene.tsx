import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Mail, Play, Pause, Stamp, Flame, Feather } from 'lucide-react';
import { PROJECT_CONFIG } from '../config';
import { soundEngine } from '../utils/soundEngine';
import { triggerGoldDustConfetti } from '../utils/confetti';

interface WaxSealedLetterSceneProps {
  onNextScene: () => void;
}

export const WaxSealedLetterScene: React.FC<WaxSealedLetterSceneProps> = ({
  onNextScene,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handleBreakSeal = () => {
    if (isOpened) return;
    soundEngine.playGrandUnlock();
    soundEngine.playBackgroundMusic();
    triggerGoldDustConfetti({ particleCount: 100 });
    setIsOpened(true);
  };

  const handleToggleVoiceNote = () => {
    soundEngine.playClick();
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      soundEngine.playBloomChime();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8 pb-28 sm:pb-32 select-none">
      {/* Chapter Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 text-center max-w-xl z-10"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Chapter 08 ✦ The Handwritten Letter
        </span>
        <h2 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
          A CONFESSION OF DEVOTION
        </h2>
        <p className="text-xs sm:text-sm font-editorial italic dark:text-neutral-300 text-neutral-600">
          "Words woven by hand from the heart, sealed with an eternal promise."
        </p>
      </motion.div>

      {/* Main Envelope or Unfolded Stationery Canvas */}
      <div className="w-full max-w-2xl my-auto z-10 flex flex-col items-center">
        {!isOpened ? (
          /* Sealed Envelope with Wax Stamp */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative w-full max-w-md aspect-[16/11] rounded-3xl dark:bg-gradient-to-b dark:from-[#1c080e] dark:via-[#2d0b16] dark:to-[#140409] bg-gradient-to-b from-[#FFF5F7] via-[#FDE8ED] to-[#FCE0E8] border-2 border-[#E7C878]/60 shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FEF08A] transition-all hover:scale-102"
            onClick={handleBreakSeal}
            title="Click to break the wax seal"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-40">
              <div className="w-full h-1/2 border-b dark:border-[#E7C878]/30 border-[#C52A49]/30 transform rotate-[10deg] origin-top-left" />
              <div className="w-full h-1/2 border-b dark:border-[#E7C878]/30 border-[#C52A49]/30 transform -rotate-[10deg] origin-top-right" />
            </div>

            <div className="flex items-center gap-2 text-xs font-cinzel tracking-[0.3em] dark:text-[#FEF08A] text-[#9B1D35] font-bold uppercase mb-4">
              <Feather className="w-3.5 h-3.5 dark:text-[#E7C878] text-[#C52A49]" />
              <span>CONFIDENTIAL · FOR JESSICA</span>
              <Feather className="w-3.5 h-3.5 dark:text-[#E7C878] text-[#C52A49]" />
            </div>

            {/* Glowing Burgundy & Gold Wax Seal with flickering ambient light */}
            <div className="relative w-22 h-22 rounded-full bg-gradient-to-tr from-[#5C1224] via-[#881337] to-[#C52A49] border-2 border-[#FEF08A] shadow-[0_0_35px_rgba(197,42,73,0.8)] flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
              <motion.div 
                className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl pointer-events-none"
                animate={{ opacity: [0.5, 0.9, 0.4, 1, 0.6] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-3xl font-cinzel font-bold text-[#FEF08A] drop-shadow-md z-10">
                J
              </span>
              <span className="text-[8px] font-sans-luxury text-amber-200 tracking-widest uppercase z-10">
                07·09
              </span>
            </div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-6 px-5 py-2 rounded-full dark:bg-black/70 bg-white/90 border dark:border-[#E7C878] border-[#D4AF37] text-[11px] font-sans-luxury dark:text-[#FEF08A] text-[#9E7B34] font-bold tracking-widest uppercase shadow-lg"
            >
              ✦ Tap to break seal & open letter ✦
            </motion.div>
          </motion.div>
        ) : (
          /* Unfolded Parchment / Luxury Letter */
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full p-8 sm:p-12 rounded-3xl dark:bg-[#0c090a]/95 bg-white/95 border-2 dark:border-[#E7C878]/50 border-[#D4AF37]/45 shadow-[0_0_80px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col gap-6 text-left relative overflow-hidden"
          >
            {/* Ambient Candlelight Warmth in top corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Date */}
            <div className="flex items-center justify-between border-b dark:border-[#E7C878]/30 border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-sans-luxury tracking-[0.35em] dark:text-[#E7C878] text-[#9E7B34] font-semibold uppercase block mb-1">
                  Private Correspondence ✦ Royal Decree
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] font-bold">
                  My Dearest Jessica,
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-editorial dark:text-[#FEF08A] text-[#9E7B34] font-medium block">
                  7 September 2026
                </span>
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider">
                  LAT 28.61° N · LON 77.20° E
                </span>
              </div>
            </div>

            {/* Letter Body in Handwriting / Editorial Pairing */}
            <div className="flex flex-col gap-4 text-sm sm:text-base font-editorial dark:text-neutral-200 text-neutral-800 leading-relaxed">
              <p>
                From the moment you walked into my universe, every single corner lit up. You turned ordinary routines into extraordinary adventures, ordinary rooms into runways, and simple quiet evenings into memories I cherish above all else.
              </p>

              <p>
                Whether it is our late-night cravings for hot sizzling malai chaap, the radiant passion in your eyes when you talk about high fashion, or the peaceful quiet mornings watching my sweet Polar Bear peacefully asleep — every single breath with you is a gift I promise to protect for eternity.
              </p>

              <p>
                You are my wife, my best friend, my greatest confidante, and my whole home. We are the eternal <strong>Khil + Batasha</strong> — two halves crafted by the universe to make life infinitely sweeter together.
              </p>

              <div className="my-2 p-5 rounded-2xl dark:bg-gradient-to-r dark:from-[#2A0810]/80 dark:via-[#3A0B17]/60 dark:to-[#2A0810]/80 bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border dark:border-[#E7C878]/40 border-amber-300 shadow-inner">
                <p className="font-handwriting text-2xl sm:text-3xl dark:text-[#FEF08A] text-[#9B1D35] leading-snug text-center">
                  "I loved you yesterday, I adore you today, and I will choose you in every lifetime that follows. Happy Birthday, my queen."
                </p>
              </div>
            </div>

            {/* Attached Audio Voice Note Player */}
            <div className="p-4 rounded-2xl dark:bg-neutral-900/90 bg-neutral-50 border dark:border-[#E7C878]/40 border-neutral-200 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleVoiceNote}
                  className="p-3 rounded-full bg-[#E7C878] text-neutral-950 hover:bg-[#FEF08A] transition-colors cursor-pointer shadow-md"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div>
                  <h5 className="text-xs font-cinzel dark:text-[#F5F1E8] text-[#1C1618] font-bold">Voice Note: My Birthday Vow To You</h5>
                  <p className="text-[11px] font-editorial dark:text-[#E7C878] text-[#9E7B34] font-medium">Duration: 01:24 • Recorded with Love</p>
                </div>
              </div>

              <div className="hidden sm:flex items-end gap-1 h-4">
                {[10, 16, 8, 20, 12, 18, 14].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full ${isPlayingAudio ? 'bg-[#FEF08A] dark:bg-[#FEF08A] bg-[#C52A49] animate-pulse' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="flex items-center justify-between pt-4 border-t dark:border-[#E7C878]/30 border-neutral-200">
              <span className="text-xs font-sans-luxury dark:text-neutral-400 text-neutral-600 uppercase tracking-widest">
                Forever Yours,
              </span>
              <span className="font-handwriting text-3xl dark:text-[#FEF08A] text-[#9B1D35]">
                Your Loving Husband ❤️
              </span>
            </div>

            {/* Next Chapter CTA */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  triggerGoldDustConfetti({ particleCount: 100 });
                  onNextScene();
                }}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full dark:bg-gradient-to-r dark:from-[#3A0B17] dark:to-[#5C1224] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border border-[#E7C878] text-xs font-cinzel tracking-widest text-[#FEF08A] uppercase transition-all shadow-xl hover:shadow-[#E7C878]/30 cursor-pointer hover:scale-105 font-bold"
              >
                <span>The Grand Finale & Best Memories</span>
                <ArrowRight className="w-4 h-4 text-[#FEF08A] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="text-[11px] font-editorial dark:text-neutral-500 text-neutral-500 tracking-widest z-10">
        Archived Forever in Our Digital Universe
      </div>
    </div>
  );
};

