import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        setIsPointer(computedStyle.cursor === 'pointer');
      }
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  // Use a softer, more luxurious glow for the custom cursor
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#E7C878]/40 pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: position.x > -100 ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#FEF08A] rounded-full pointer-events-none z-[100] shadow-[0_0_10px_#FEF08A]"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isPointer ? 0.5 : 1,
          opacity: position.x > -100 ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 25, mass: 0.1 }}
      />
    </>
  );
};
