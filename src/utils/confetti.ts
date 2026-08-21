import confetti from 'canvas-confetti';

/**
 * Luxury Gold Dust & Champagne Confetti Celebration
 * Simulates glittering metallic gold dust, rose gold sparks, and stardust flakes
 */
export function triggerGoldDustConfetti(options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
}) {
  const count = options?.particleCount || 75;
  const spread = options?.spread || 85;
  const origin = options?.origin || { y: 0.6, x: 0.5 };

  try {
    // Primary gold dust blast
    confetti({
      particleCount: count,
      spread: spread,
      origin: origin,
      colors: ['#FEF08A', '#E7C878', '#D4AF37', '#F5E6BE', '#C52A49', '#FDA4AF'],
      ticks: 200,
      gravity: 0.85,
      scalar: 0.9,
      drift: 0.05,
      shapes: ['circle', 'square'],
      disableForReducedMotion: false,
    });

    // Secondary delayed micro-shimmer sparkle
    setTimeout(() => {
      confetti({
        particleCount: Math.round(count * 0.4),
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: (origin.y || 0.6) + 0.1 },
        colors: ['#FEF08A', '#E7C878', '#FFFFFF'],
        ticks: 150,
        gravity: 0.6,
        scalar: 0.75,
      });
      confetti({
        particleCount: Math.round(count * 0.4),
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: (origin.y || 0.6) + 0.1 },
        colors: ['#FEF08A', '#E7C878', '#FDA4AF'],
        ticks: 150,
        gravity: 0.6,
        scalar: 0.75,
      });
    }, 120);
  } catch {
    // Confetti fallback safely ignored
  }
}

export function triggerGrandFinaleConfetti() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#FEF08A', '#E7C878', '#D4AF37', '#C52A49', '#FFFFFF', '#FDA4AF'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
