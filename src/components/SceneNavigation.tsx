import React from 'react';
import { SceneId } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface SceneNavigationProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
}

export const SceneNavigation: React.FC<SceneNavigationProps> = ({
  currentScene,
  onSelectScene,
}) => {
  const chapters: { id: SceneId; label: string; number: string }[] = [
    { id: 'cake', label: 'The Wish', number: '01' },
    { id: 'bouquet', label: 'Water Lilies', number: '02' },
    { id: 'memories', label: 'Memories', number: '03' },
    { id: 'fashion-collection', label: 'Diva Vogue', number: '04' },
    { id: 'quiz', label: 'Quiz', number: '05' },
    { id: 'yes-no-game', label: 'YES/NO', number: '06' },
    { id: 'mystery-box', label: 'Mystery Box', number: '07' },
    { id: 'letter', label: 'Love Letter', number: '08' },
    { id: 'final-ending', label: 'Finale', number: '✦' },
  ];

  if (currentScene === 'countdown' || currentScene === 'unlock-reveal') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-full px-4">
      <div className="flex items-center gap-1.5 p-1.5 rounded-full dark:bg-neutral-950/90 bg-white/90 backdrop-blur-xl dark:border-neutral-800/90 border-[#D4AF37]/35 shadow-2xl dark:shadow-black/70 shadow-amber-900/15 overflow-x-auto max-w-[92vw] sm:max-w-xl">
        {chapters.map((ch) => {
          const isActive = currentScene === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => {
                soundEngine.playClick();
                onSelectScene(ch.id);
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-sans-luxury tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'dark:bg-[#E7C878] bg-[#B38838] text-neutral-950 dark:text-neutral-950 text-white font-bold shadow-md shadow-[#B38838]/30 dark:shadow-[#E7C878]/30'
                  : 'dark:text-neutral-400 text-neutral-600 hover:text-[#B38838] dark:hover:text-[#FEF08A] dark:hover:bg-neutral-900/60 hover:bg-neutral-100/80'
              }`}
            >
              <span className="opacity-60 text-[9px]">{ch.number}</span>
              <span className="hidden sm:inline">{ch.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
