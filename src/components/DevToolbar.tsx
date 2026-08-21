import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, Unlock, Lock } from 'lucide-react';
import { SceneId } from '../types';
import { PROJECT_CONFIG } from '../config';

interface DevToolbarProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  onUnlock: () => void;
  onLock: () => void;
}

export const DevToolbar: React.FC<DevToolbarProps> = ({
  currentScene,
  onSelectScene,
  onUnlock,
  onLock,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!PROJECT_CONFIG.development.devToolbarEnabled) return null;

  const scenes: { id: SceneId; name: string }[] = [
    { id: 'countdown', name: '00. Countdown' },
    { id: 'unlock-reveal', name: '00. Unlock Reveal' },
    { id: 'cake', name: '01. Birthday Cake' },
    { id: 'bouquet', name: '02. Water Lily Bouquet' },
    { id: 'memories', name: '03. Photo Universe' },
    { id: 'fashion-collection', name: '04. Diva Collection' },
    { id: 'quiz', name: '05. Quiz Exam' },
    { id: 'yes-no-game', name: '06. YES/NO Game' },
    { id: 'mystery-box', name: '07. Mystery Box' },
    { id: 'letter', name: '08. Wax-Sealed Letter' },
    { id: 'final-ending', name: '09. Grand Finale' },
  ];

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-[10px] font-sans-luxury text-neutral-300 hover:text-white uppercase tracking-wider shadow-lg cursor-pointer"
        >
          <Eye className="w-3 h-3 text-[#E7C878]" />
          <span>Dev Preview</span>
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {isOpen && (
          <div className="absolute top-8 left-0 w-56 p-3 rounded-2xl bg-neutral-950/95 border border-neutral-700 shadow-2xl backdrop-blur-xl flex flex-col gap-2 mt-1">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-[10px] font-cinzel text-[#E7C878] uppercase tracking-widest">
              <span>Scene Switcher</span>
              <span className="text-neutral-500">PIN: {PROJECT_CONFIG.access.secretPin}</span>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={onUnlock}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 uppercase tracking-wider hover:bg-emerald-900 cursor-pointer"
              >
                <Unlock className="w-2.5 h-2.5" /> Unlock All
              </button>
              <button
                onClick={onLock}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-[10px] text-rose-300 uppercase tracking-wider hover:bg-rose-900 cursor-pointer"
              >
                <Lock className="w-2.5 h-2.5" /> Reset Lock
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto flex flex-col gap-1 pr-1">
              {scenes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectScene(s.id);
                    setIsOpen(false);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-sans-luxury transition-all cursor-pointer ${
                    currentScene === s.id
                      ? 'bg-[#E7C878] text-neutral-950 font-bold'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
