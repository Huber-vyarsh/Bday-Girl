import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface CursorSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export const AmbientBackground: React.FC = () => {
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isHovering: boolean }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.isHovering = true;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Generate multi-layered gentle stardust particles
    const particleCount = Math.min(width > 768 ? 85 : 45, 100);
    const particles: Particle[] = [];
    const sparkles: CursorSparkle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseOpacity = Math.random() * 0.5 + 0.2;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.08,
        opacity: baseOpacity,
        baseOpacity,
        hue: Math.random() > 0.55 ? 45 : (Math.random() > 0.3 ? 345 : 210), // Warm gold, romantic rose, celestial violet
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkRef.current;

      // Smooth cursor lerp interpolation for buttery physics
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Atmosphere Radial Gradient Base
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        80,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );

      if (dark) {
        bgGrad.addColorStop(0, '#0f070b');
        bgGrad.addColorStop(0.4, '#090406');
        bgGrad.addColorStop(0.8, '#040304');
        bgGrad.addColorStop(1, '#020202');
      } else {
        bgGrad.addColorStop(0, '#FFFDF9');
        bgGrad.addColorStop(0.35, '#FAF4EC');
        bgGrad.addColorStop(0.7, '#F4EAE0');
        bgGrad.addColorStop(1, '#EDE0D4');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Cursor Reactive Radiant Aura (Follows cursor smoothly)
      if (mouseRef.current.isHovering || frame > 30) {
        const auraGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 340);
        if (dark) {
          auraGrad.addColorStop(0, 'rgba(231, 200, 120, 0.065)');
          auraGrad.addColorStop(0.35, 'rgba(197, 42, 73, 0.035)');
          auraGrad.addColorStop(0.7, 'rgba(58, 11, 23, 0.015)');
          auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          auraGrad.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
          auraGrad.addColorStop(0.35, 'rgba(225, 29, 72, 0.04)');
          auraGrad.addColorStop(0.7, 'rgba(231, 200, 120, 0.02)');
          auraGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);

        // Spawn occasional cursor micro-sparkles on movement
        if (Math.random() < 0.35) {
          sparkles.push({
            x: mx + (Math.random() - 0.5) * 16,
            y: my + (Math.random() - 0.5) * 16,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8 - 0.3,
            life: 0,
            maxLife: Math.floor(Math.random() * 30 + 20),
            size: Math.random() * 1.8 + 0.6,
            hue: Math.random() > 0.4 ? 45 : 340,
          });
        }
      }

      // 3. Render and Update Cursor Trail Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const progress = s.life / s.maxLife;
        const alpha = (1 - progress) * (dark ? 0.7 : 0.85);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `hsla(${s.hue}, 90%, 80%, ${alpha})`
          : `hsla(${s.hue}, 85%, 45%, ${alpha})`;
        ctx.shadowColor = dark
          ? `hsla(${s.hue}, 100%, 70%, ${alpha * 0.8})`
          : `hsla(${s.hue}, 90%, 50%, ${alpha * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
        }
      }

      // 4. Render and Update Ambient Magnetic Stardust Particles
      particles.forEach((p) => {
        // Natural drift
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interactive Cursor Magnetic Physics (Gentle push / swirl)
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 0.8;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Luminous twinkle effect
        const pulse = Math.sin(frame * p.pulseSpeed + p.pulseOffset);
        const currentOpacity = Math.max(0.12, p.baseOpacity + pulse * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + pulse * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `hsla(${p.hue}, 85%, 78%, ${currentOpacity})`
          : `hsla(${p.hue}, 80%, 48%, ${currentOpacity * 0.75})`;
        ctx.shadowColor = dark
          ? `hsla(${p.hue}, 100%, 75%, ${currentOpacity * 0.7})`
          : `hsla(${p.hue}, 80%, 55%, ${currentOpacity * 0.4})`;
        ctx.shadowBlur = p.size > 1.4 ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 0.98 }}
    />
  );
};


