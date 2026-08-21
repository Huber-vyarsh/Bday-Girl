import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, ArrowRight, Heart, Utensils, Moon, ShoppingBag, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface MysteryBoxSceneProps {
  onNextScene: () => void;
}

export const MysteryBoxScene: React.FC<MysteryBoxSceneProps> = ({
  onNextScene,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [claimedVouchers, setClaimedVouchers] = useState<number[]>([]);

  const vouchers = [
    {
      icon: <Utensils className="w-5 h-5 text-[#FEF08A]" />,
      title: 'Unlimited Malai Chaap Pass',
      desc: 'Redeemable anytime, anywhere. Extra butter & spiced roomali roti included with zero complaints.',
      code: 'VIP-CHAAP-0709',
    },
    {
      icon: <Moon className="w-5 h-5 text-indigo-300" />,
      title: 'Guilt-Free Polar Bear Sleep Marathon',
      desc: 'Sleep until 2:00 PM uninterrupted under 3 blankets. Breakfast served directly in bed.',
      code: 'VIP-BEAR-SLEEP',
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-rose-300" />,
      title: 'Fashion Wardrobe Spree Voucher',
      desc: 'Free pass to add more clothes to the 4 overflowing closets while saying "I have nothing to wear".',
      code: 'VIP-DIVA-CLOSET',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-300" />,
      title: 'Always Right In Arguments Token',
      desc: 'Instant automatic win on any friendly debate, backed by supreme husband approval.',
      code: 'VIP-WIFE-SUPREME',
    },
  ];

  const handleOpenBox = () => {
    if (isOpen) return;
    soundEngine.playGrandUnlock();
    setIsOpen(true);

    try {
      confetti({
        particleCount: 100,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#FEF08A', '#E7C878', '#C52A49', '#FDA4AF', '#F5F1E8'],
      });
    } catch {}
  };

  const toggleClaim = (index: number) => {
    soundEngine.playBloomChime();
    if (claimedVouchers.includes(index)) {
      setClaimedVouchers(claimedVouchers.filter((i) => i !== index));
    } else {
      setClaimedVouchers([...claimedVouchers, index]);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8 pb-28 sm:pb-32 select-none text-center">
      {/* Chapter Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 max-w-xl z-10"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Chapter 07 ✦ The Secret Chamber
        </span>
        <h2 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
          THE BIRTHDAY MYSTERY BOX
        </h2>
        <p className="text-xs sm:text-sm font-editorial italic dark:text-neutral-400 text-neutral-600">
          "A gilded vault containing four lifetime golden passes crafted exclusively for you."
        </p>
      </motion.div>

      {/* Box Interactive Canvas */}
      <div className="my-auto flex flex-col items-center z-10 w-full max-w-3xl">
        {!isOpen ? (
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpenBox}
            animate={
              isHovered
                ? { scale: 1.05, rotate: [-1, 1, -1, 0] }
                : { y: [0, -8, 0] }
            }
            transition={
              isHovered
                ? { duration: 0.3, repeat: Infinity }
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
            className="group relative cursor-pointer flex flex-col items-center"
            title="Click to unlock box"
          >
            {/* Ambient Box Glow */}
            <div className="absolute inset-0 w-64 h-64 bg-gradient-to-tr from-[#C52A49]/40 to-[#E7C878]/30 rounded-full blur-3xl group-hover:opacity-100 opacity-60 transition-opacity" />

            {/* Gift Box Container with Velvet Textures */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-end">
              {/* Box Lid */}
              <div className="relative z-20 w-64 sm:w-72 h-14 rounded-2xl bg-gradient-to-r from-[#3A0B17] via-[#5C1224] to-[#3A0B17] border-2 border-[#E7C878] shadow-2xl flex items-center justify-center">
                {/* Gold Bow Ribbon */}
                <div className="absolute -top-7 flex items-center justify-center">
                  <div className="w-12 h-10 rounded-full border-4 border-[#FEF08A] bg-[#E7C878] rotate-[-25deg] shadow-lg" />
                  <div className="w-12 h-10 rounded-full border-4 border-[#FEF08A] bg-[#E7C878] rotate-[25deg] shadow-lg -ml-4" />
                  <div className="absolute w-5 h-5 rounded-full bg-[#FEF08A] shadow-md z-10" />
                </div>

                {/* Vertical Ribbon on Lid */}
                <div className="w-8 h-full bg-[#FEF08A]/90 border-x border-[#E7C878]" />
              </div>

              {/* Box Body */}
              <div className="relative z-10 w-56 sm:w-64 h-44 rounded-b-3xl bg-gradient-to-b from-[#2A0810] to-[#170409] border-2 border-t-0 border-[#E7C878]/80 shadow-2xl flex justify-center overflow-hidden -mt-1">
                {/* Vertical Ribbon on Body */}
                <div className="w-8 h-full bg-[#FEF08A]/90 border-x border-[#E7C878] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#3A0B17]" />
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-6 px-5 py-2 rounded-full dark:bg-neutral-900/80 bg-white/95 border dark:border-[#E7C878] border-[#D4AF37] text-xs font-sans-luxury dark:text-[#FEF08A] text-[#9E7B34] font-bold tracking-widest uppercase shadow-lg shadow-amber-900/10 dark:shadow-[#E7C878]/15"
            >
              ✦ Tap to unlock your mystery gifts ✦
            </motion.div>
          </motion.div>
        ) : (
          /* Revealed Vouchers Grid with collectible stamps */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2 text-xs font-sans-luxury dark:text-[#FEF08A] text-[#9E7B34] font-semibold uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4 text-[#C52A49] dark:text-[#FEF08A]" />
              <span>Lifetime VIP Passes Unlocked ({claimedVouchers.length}/4 Claimed)</span>
              <Sparkles className="w-4 h-4 text-[#C52A49] dark:text-[#FEF08A]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
              {vouchers.map((v, i) => {
                const isClaimed = claimedVouchers.includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    onClick={() => toggleClaim(i)}
                    className={`p-5 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all cursor-pointer border ${
                      isClaimed
                        ? 'dark:bg-neutral-950/95 bg-emerald-50/90 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : 'dark:bg-neutral-950/90 bg-white/95 dark:border-[#E7C878]/40 border-neutral-200 hover:border-[#D4AF37] dark:hover:border-[#FEF08A] shadow-amber-900/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-2xl dark:bg-neutral-900 bg-amber-50 dark:border-neutral-800 border-amber-200">
                            {v.icon}
                          </div>
                          <h4 className="text-sm font-cinzel dark:text-[#F5F1E8] text-[#1C1618] font-bold">
                            {v.title}
                          </h4>
                        </div>
                        {isClaimed && (
                          <span className="px-2 py-0.5 rounded-full dark:bg-emerald-950/80 bg-emerald-100 border border-emerald-500/40 text-[9px] font-sans-luxury dark:text-emerald-300 text-emerald-800 font-semibold uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Claimed
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-editorial dark:text-neutral-300 text-neutral-700 leading-relaxed mt-2">
                        {v.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t dark:border-neutral-800/80 border-neutral-200 flex items-center justify-between text-[10px] font-sans-luxury dark:text-[#E7C878] text-[#9E7B34] font-semibold uppercase tracking-widest">
                      <span>Token: {v.code}</span>
                      <span>Valid: Lifetime</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNextScene();
              }}
              className="mt-4 group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full dark:bg-gradient-to-r dark:from-[#20050c] dark:via-[#3a0b17] dark:to-[#20050c] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border border-[#E7C878] text-xs font-cinzel text-[#FEF08A] tracking-widest uppercase transition-all shadow-xl hover:shadow-[#E7C878]/30 cursor-pointer hover:scale-105 font-bold"
            >
              <span>Read The Wax-Sealed Letter</span>
              <ArrowRight className="w-4 h-4 text-[#FEF08A] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="text-[11px] font-editorial dark:text-neutral-500 text-neutral-500 tracking-widest z-10">
        Non-transferable • Exclusively redeemable by Jessica
      </div>
    </div>
  );
};
