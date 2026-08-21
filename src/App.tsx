import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SceneId } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { AmbientBackground } from './components/AmbientBackground';
import { FloatingDoodles } from './components/FloatingDoodles';
import { MusicPlayer } from './components/MusicPlayer';
import { CountdownScene } from './components/CountdownScene';
import { PinModal } from './components/PinModal';
import { CinematicUnlockReveal } from './components/CinematicUnlockReveal';
import { CakeScene } from './components/CakeScene';
import { WaterLilyBouquetScene } from './components/WaterLilyBouquetScene';
import { MemoryUniverseScene } from './components/MemoryUniverseScene';
import { JessicaCollectionScene } from './components/JessicaCollectionScene';
import { QuizScene } from './components/QuizScene';
import { MischievousYesNoScene } from './components/MischievousYesNoScene';
import { MysteryBoxScene } from './components/MysteryBoxScene';
import { WaxSealedLetterScene } from './components/WaxSealedLetterScene';
import { FinalEndingScene } from './components/FinalEndingScene';
import { SceneNavigation } from './components/SceneNavigation';
import { DevToolbar } from './components/DevToolbar';
import { SceneTransitionOverlay } from './components/SceneTransitionOverlay';
import { CursorGlow } from './components/CursorGlow';

function AppContent() {
  const [currentScene, setCurrentScene] = useState<SceneId>('countdown');
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Global event listener for unified unlock pipeline
  useEffect(() => {
    const handleUnlockEvent = () => {
      setIsUnlocked(true);
      setIsPinModalOpen(false);
      setCurrentScene('unlock-reveal');
    };

    window.addEventListener('birthdayUnlocked', handleUnlockEvent);
    return () => window.removeEventListener('birthdayUnlocked', handleUnlockEvent);
  }, []);

  const handleUnlockTrigger = () => {
    window.dispatchEvent(new CustomEvent('birthdayUnlocked'));
  };

  const handleResetLock = () => {
    setIsUnlocked(false);
    setCurrentScene('countdown');
  };

  return (
    <main className="relative min-h-screen w-full dark:bg-[#050505] bg-[#FAF6F0] dark:text-[#F5F1E8] text-[#1C1618] overflow-x-hidden font-sans-luxury selection:bg-[#E7C878]/30 selection:text-[#FEF08A] transition-colors duration-500">
      <CursorGlow />
      {/* Ambient Stardust & Radial Glow Backdrop */}
      <AmbientBackground />

      {/* Cross-fading Particle Transition System */}
      <SceneTransitionOverlay currentScene={currentScene} />

      {/* Floating Interactive Luxury Stickers & Easter Eggs */}
      <FloatingDoodles />

      {/* Top Floating Controls: Theme Toggle & Audio Controller */}
      <ThemeToggle />
      <MusicPlayer />

      {/* Development / Testing Quick Navigator */}
      <DevToolbar
        currentScene={currentScene}
        onSelectScene={setCurrentScene}
        onUnlock={handleUnlockTrigger}
        onLock={handleResetLock}
      />

      {/* Secret Access PIN Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handleUnlockTrigger}
      />

      {/* Main Scene Presentation Engine */}
      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScene === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
            >
              <CountdownScene
                onOpenPinModal={() => setIsPinModalOpen(true)}
                onUnlock={handleUnlockTrigger}
              />
            </motion.div>
          )}

          {currentScene === 'unlock-reveal' && (
            <motion.div
              key="unlock-reveal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <CinematicUnlockReveal
                onStartExperience={() => setCurrentScene('cake')}
              />
            </motion.div>
          )}

          {currentScene === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CakeScene onNextScene={() => setCurrentScene('bouquet')} />
            </motion.div>
          )}

          {currentScene === 'bouquet' && (
            <motion.div
              key="bouquet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WaterLilyBouquetScene onNextScene={() => setCurrentScene('memories')} />
            </motion.div>
          )}

          {currentScene === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MemoryUniverseScene onNextScene={() => setCurrentScene('fashion-collection')} />
            </motion.div>
          )}

          {currentScene === 'fashion-collection' && (
            <motion.div
              key="fashion-collection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <JessicaCollectionScene onNextScene={() => setCurrentScene('quiz')} />
            </motion.div>
          )}

          {currentScene === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <QuizScene onNextScene={() => setCurrentScene('yes-no-game')} />
            </motion.div>
          )}

          {currentScene === 'yes-no-game' && (
            <motion.div
              key="yes-no-game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MischievousYesNoScene onNextScene={() => setCurrentScene('mystery-box')} />
            </motion.div>
          )}

          {currentScene === 'mystery-box' && (
            <motion.div
              key="mystery-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MysteryBoxScene onNextScene={() => setCurrentScene('letter')} />
            </motion.div>
          )}

          {currentScene === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WaxSealedLetterScene onNextScene={() => setCurrentScene('final-ending')} />
            </motion.div>
          )}

          {currentScene === 'final-ending' && (
            <motion.div
              key="final-ending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <FinalEndingScene onRestart={() => setCurrentScene('cake')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Chapter Bar (Active once unlocked) */}
      {isUnlocked && (
        <SceneNavigation
          currentScene={currentScene}
          onSelectScene={setCurrentScene}
        />
      )}
    </main>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
