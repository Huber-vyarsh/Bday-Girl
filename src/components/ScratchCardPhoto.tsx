import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wand2, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerGoldDustConfetti } from '../utils/confetti';

interface ScratchCardPhotoProps {
  imageSrc: string;
  altText: string;
  title: string;
  isUnlockedByDefault?: boolean;
  onRevealComplete?: () => void;
  className?: string;
}

export const ScratchCardPhoto: React.FC<ScratchCardPhotoProps> = ({
  imageSrc,
  altText,
  title,
  isUnlockedByDefault = false,
  onRevealComplete,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(isUnlockedByDefault);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [scratchPercent, setScratchPercent] = useState<number>(isUnlockedByDefault ? 100 : 0);
  const lastSoundTime = useRef<number>(0);

  const initCanvas = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // 1. Draw Gold Velvet / Metallic Foil Background
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, '#3A0B17');
    goldGrad.addColorStop(0.3, '#5C1224');
    goldGrad.addColorStop(0.6, '#2A0810');
    goldGrad.addColorStop(1, '#1A040A');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Add Luxury Metallic Gold Border Trim
    ctx.strokeStyle = 'rgba(231, 200, 120, 0.7)';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // 3. Stardust Speckles
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(254, 240, 138, 0.6)' : 'rgba(231, 200, 120, 0.4)';
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 2 + 0.8,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // 4. Centered "Scratch To Reveal" Typography & Stamp
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#FEF08A';
    ctx.font = 'bold 13px Cinzel, serif';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2 - 12);

    ctx.fillStyle = '#E7C878';
    ctx.font = 'italic 11px Cormorant Garamond, serif';
    ctx.fillText('Rub with cursor to unlock memory', width / 2, height / 2 + 12);
  }, [isRevealed]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      // Sample 1 out of every 16 pixels for performance
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparentCount = 0;
      const sampleStep = 16;
      const totalSamples = pixels.length / (4 * sampleStep);

      for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
        if (pixels[i] < 128) {
          transparentCount++;
        }
      }

      const percent = Math.round((transparentCount / totalSamples) * 100);
      setScratchPercent(percent);

      if (percent >= 38 && !isRevealed) {
        handleFullReveal();
      }
    } catch {}
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26 * dpr, 0, Math.PI * 2);
    ctx.fill();

    // Sound feedback throttled
    const now = Date.now();
    if (now - lastSoundTime.current > 75) {
      soundEngine.playScratchSound();
      lastSoundTime.current = now;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (isRevealed) return;
    setIsScratching(false);
    checkScratchPercentage();
  };

  const handleFullReveal = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    soundEngine.playBloomChime();
    triggerGoldDustConfetti({ particleCount: 70 });
    if (onRevealComplete) onRevealComplete();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full rounded-2xl overflow-hidden select-none bg-neutral-950 ${className}`}
    >
      {/* Underlying Real Photo */}
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover transition-transform duration-700"
        loading="lazy"
      />

      {/* Gold Scratch Foil Overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute inset-0 w-full h-full z-10 cursor-crosshair touch-none transition-opacity duration-500"
        />
      )}

      {/* Interactive Controls Overlay */}
      {!isRevealed && (
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between pointer-events-auto">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#E7C878]/40 text-[10px] font-sans-luxury text-[#FEF08A] uppercase tracking-wider">
            Scratched: {scratchPercent}%
          </span>

          <button
            onClick={handleFullReveal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7C878] hover:bg-[#FEF08A] text-neutral-950 text-[10px] font-sans-luxury font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <Wand2 className="w-3 h-3" />
            <span>Instant Reveal</span>
          </button>
        </div>
      )}

      {/* Unlocked Sparkle Badge */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/50 text-emerald-300"
          title="Memory Unlocked"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
        </motion.div>
      )}
    </div>
  );
};
