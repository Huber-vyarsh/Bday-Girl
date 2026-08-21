import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SceneId } from '../types';

interface SceneTransitionOverlayProps {
  currentScene: SceneId;
}

export const SceneTransitionOverlay: React.FC<SceneTransitionOverlayProps> = ({
  currentScene,
}) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const prevSceneRef = useRef<SceneId>(currentScene);

  useEffect(() => {
    if (prevSceneRef.current !== currentScene) {
      prevSceneRef.current = currentScene;
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="scene-transition-particles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center"
        >
          {/* Radiant gold stardust vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-amber-500/10 to-black/40 backdrop-blur-[2px]" />

          {/* Center Light Flare */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.4, 2], opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="w-96 h-96 rounded-full bg-gradient-to-r from-[#FEF08A]/30 via-[#E7C878]/40 to-transparent blur-3xl"
          />

          {/* Floating Stardust Particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * 360;
              const distance = 80 + (i % 5) * 45;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;

              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: [0, x],
                    y: [0, y],
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: (i % 3) * 0.05,
                    ease: 'easeOut',
                  }}
                  className="absolute w-2 h-2 rounded-full bg-[#FEF08A] shadow-[0_0_12px_#FEF08A]"
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
