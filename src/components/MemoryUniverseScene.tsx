import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Mic, Play, Pause, X, MapPin, Calendar, ArrowRight, Wand2 } from 'lucide-react';
import { MEMORIES_DATA, VOICE_NOTES } from '../data/memoriesData';
import { MemoryItem, VoiceNote } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { ScratchCardPhoto } from './ScratchCardPhoto';
import { triggerGoldDustConfetti } from '../utils/confetti';

interface MemoryUniverseSceneProps {
  onNextScene: () => void;
}

export const MemoryUniverseScene: React.FC<MemoryUniverseSceneProps> = ({
  onNextScene,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(null);
  const [playingVoiceNoteId, setPlayingVoiceNoteId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'us', label: 'Us & Romance' },
    { id: 'fashion', label: 'Diva & Fashion' },
    { id: 'travel', label: 'Adventures' },
    { id: 'chaos', label: 'Chaos & Laughs' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? MEMORIES_DATA
    : MEMORIES_DATA.filter((item) => item.category === selectedCategory);

  const handleVoiceNoteToggle = (vn: VoiceNote) => {
    soundEngine.playClick();
    if (playingVoiceNoteId === vn.id) {
      setPlayingVoiceNoteId(null);
    } else {
      setPlayingVoiceNoteId(vn.id);
      soundEngine.playBloomChime();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center py-12 px-4 md:px-8 pb-28 sm:pb-32 select-none">
      {/* Chapter Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 text-center mb-8"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Chapter 03 ✦ The Memory Universe
        </span>
        <h2 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
          FRAGMENTS OF OUR STORY
        </h2>
        <p className="text-xs sm:text-sm font-editorial italic dark:text-neutral-300 text-neutral-600 max-w-lg">
          "Every memory is coated in gold foil. Scratch with your finger or cursor to reveal the hidden moments!"
        </p>
      </motion.div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-3 mb-8">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans-luxury tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'dark:bg-[#E7C878] bg-[#B38838] dark:text-neutral-950 text-white font-bold shadow-lg shadow-amber-900/15'
                  : 'dark:bg-neutral-900/60 bg-white/90 border dark:border-neutral-800 border-neutral-300 dark:text-neutral-400 text-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Voice Notes Feature Strip */}
      <div className="w-full max-w-5xl mb-12">
        <div className="flex items-center gap-2 mb-3 text-xs uppercase font-sans-luxury tracking-[0.25em] dark:text-[#FEF08A] text-[#9E7B34] font-semibold">
          <Mic className="w-3.5 h-3.5 text-[#C52A49] dark:text-[#FEF08A]" />
          <span>Whispers & Voice Notes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VOICE_NOTES.map((vn) => {
            const isPlaying = playingVoiceNoteId === vn.id;
            return (
              <div
                key={vn.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isPlaying
                    ? 'dark:bg-[#3A0B17]/40 bg-rose-50 border-[#E7C878] shadow-lg shadow-[#C52A49]/20'
                    : 'dark:bg-neutral-950/70 bg-white/90 dark:border-neutral-800 border-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-cinzel dark:text-[#F5F1E8] text-[#1C1618] font-bold">{vn.title}</h4>
                    <span className="text-[10px] font-sans-luxury dark:text-neutral-400 text-neutral-500">{vn.duration}</span>
                  </div>
                  <p className="text-xs font-editorial dark:text-neutral-300 text-neutral-700 line-clamp-2">{vn.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t dark:border-neutral-800/80 border-neutral-200">
                  {/* Waveform visualizer */}
                  <div className="flex items-end gap-1 h-5">
                    {[12, 20, 8, 24, 16, 28, 10, 22, 14, 18].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full transition-all duration-300 ${
                          isPlaying ? 'dark:bg-[#FEF08A] bg-rose-600 animate-pulse' : 'dark:bg-neutral-600 bg-neutral-300'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(6, Math.round(h * Math.random()))}px` : `${h / 2}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleVoiceNoteToggle(vn)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-neutral-900 bg-rose-50 border dark:border-[#E7C878]/40 border-rose-300 hover:bg-rose-100 dark:hover:bg-[#E7C878]/20 text-xs font-sans-luxury dark:text-[#FEF08A] text-rose-800 font-semibold transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isPlaying ? 'Playing' : 'Listen'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Masonry / Editorial Polaroid Grid with Scratch-to-Reveal Photos */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative flex flex-col p-3 rounded-2xl dark:bg-neutral-900/60 bg-white/90 border dark:border-neutral-800 border-neutral-200 hover:border-[#E7C878] dark:hover:border-[#E7C878]/60 backdrop-blur-md shadow-xl dark:shadow-black/50 shadow-amber-900/10 hover:shadow-2xl hover:shadow-[#E7C878]/15 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Scratchable Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-neutral-950">
              <ScratchCardPhoto
                imageSrc={photo.image}
                altText={photo.title}
                title={photo.title}
                isUnlockedByDefault={index < 2}
              />
              {photo.favorite && (
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E7C878]/40 z-20 pointer-events-none">
                  <Heart className="w-3 h-3 text-[#E7C878] fill-[#E7C878]" />
                </div>
              )}
            </div>

            {/* Polaroid Content */}
            <div
              onClick={() => {
                soundEngine.playClick();
                setActivePhoto(photo);
              }}
              className="flex flex-col gap-1 text-left px-1 cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-sans-luxury dark:text-neutral-400 text-neutral-500">
                <span>{photo.date}</span>
                {photo.location && (
                  <span className="flex items-center gap-0.5 truncate max-w-[120px]">
                    <MapPin className="w-2.5 h-2.5 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34]" />
                    {photo.location}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-cinzel dark:text-[#F5F1E8] text-[#1C1618] group-hover:text-[#B38838] dark:group-hover:text-[#FEF08A] transition-colors truncate font-bold">
                {photo.title}
              </h3>
              <p className="text-xs font-editorial dark:text-neutral-400 text-neutral-600 line-clamp-2 italic">
                "{photo.caption}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox Modal with Full Scratch Experience */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-3xl w-full rounded-3xl dark:bg-neutral-950 bg-white border dark:border-[#E7C878]/40 border-[#D4AF37]/40 p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full dark:bg-neutral-900 bg-neutral-100 dark:text-neutral-400 text-neutral-600 hover:text-black dark:hover:text-white cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden bg-black shadow-inner relative">
                <ScratchCardPhoto
                  imageSrc={activePhoto.image}
                  altText={activePhoto.title}
                  title={activePhoto.title}
                  isUnlockedByDefault={true}
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-between text-left h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans-luxury text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] tracking-widest uppercase mb-2 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activePhoto.category}</span>
                  </div>

                  <h3 className="text-2xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] mb-3 font-bold">
                    {activePhoto.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-sans-luxury dark:text-neutral-400 text-neutral-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34]" />
                      {activePhoto.date}
                    </span>
                    {activePhoto.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34]" />
                        {activePhoto.location}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-editorial dark:text-neutral-200 text-neutral-800 leading-relaxed mb-4">
                    "{activePhoto.caption}"
                  </p>

                  {activePhoto.insideJoke && (
                    <div className="p-3 rounded-xl dark:bg-neutral-900/80 bg-amber-50/80 border dark:border-[#E7C878]/20 border-amber-300/40 text-xs font-editorial italic dark:text-[#FEF08A] text-amber-900">
                      💡 Inside Note: {activePhoto.insideJoke}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 border-t dark:border-neutral-800 border-neutral-200">
                  <span className="text-[11px] font-sans-luxury tracking-widest dark:text-neutral-500 text-neutral-500 uppercase">
                    Handcrafted For Jessica ✦ 07·09
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Proceed to The Jessica Collection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6"
      >
        <button
          onClick={() => {
            soundEngine.playClick();
            triggerGoldDustConfetti({ particleCount: 80 });
            onNextScene();
          }}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2a0810] to-[#450c1b] border border-[#E7C878] text-xs font-cinzel tracking-[0.25em] text-[#FEF08A] uppercase shadow-xl hover:shadow-[#E7C878]/25 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <span>Discover The Jessica Collection</span>
          <ArrowRight className="w-4 h-4 text-[#FEF08A] group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

