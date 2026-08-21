import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Play, Pause, Disc, SkipForward, Radio, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { PROJECT_CONFIG } from '../config';
import { soundEngine } from '../utils/soundEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const tracks = PROJECT_CONFIG.music.tracks;
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
    setIsPlaying(soundEngine.getIsPlaying());
  }, []);

  const handleTogglePlay = () => {
    soundEngine.playClick();
    const playing = soundEngine.toggleBackgroundMusic();
    setIsPlaying(playing);
  };

  const handleToggleMute = () => {
    soundEngine.playClick();
    const nextMute = !isMuted;
    soundEngine.setMute(nextMute);
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (isMuted && val > 0) {
      soundEngine.setMute(false);
      setIsMuted(false);
    }
  };

  const handleSelectTrack = (idx: number) => {
    soundEngine.playClick();
    setCurrentTrackIndex(idx);
    soundEngine.playBackgroundMusic(tracks[idx].src);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    soundEngine.playClick();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    handleSelectTrack(nextIdx);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <div className="relative">
        {/* Expanded High-End Floating Music Controller */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-16 right-0 w-80 p-5 rounded-3xl dark:bg-neutral-950/95 bg-white/95 backdrop-blur-2xl border dark:border-[#E7C878]/40 border-[#D4AF37]/40 shadow-[0_15px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col gap-3.5 mb-2 dark:text-neutral-200 text-neutral-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b dark:border-neutral-800/80 border-neutral-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-full dark:bg-[#3A0B17] bg-rose-100 dark:text-[#FEF08A] text-rose-700">
                    <Music className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-cinzel dark:text-[#FEF08A] text-[#B38838] font-bold tracking-wider uppercase">
                      Romantic Soundtrack
                    </h4>
                    <p className="text-[9px] font-sans-luxury dark:text-neutral-400 text-neutral-500">Jessica's Birthday Symphony</p>
                  </div>
                </div>
                <span className="text-[10px] dark:text-[#E7C878] text-[#9E7B34] font-sans-luxury px-2 py-0.5 rounded-full dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200">
                  Track 0{currentTrackIndex + 1} / 0{tracks.length}
                </span>
              </div>

              {/* Active Vinyl Disc Animation Display */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl dark:bg-gradient-to-r dark:from-[#20050C]/60 dark:to-neutral-900/60 bg-gradient-to-r from-rose-50 to-amber-50/50 border dark:border-[#E7C878]/20 border-[#D4AF37]/30">
                <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full dark:bg-neutral-900 bg-neutral-800 border-2 dark:border-neutral-700 border-neutral-600 flex items-center justify-center shadow-md ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '3.5s' }}
                  >
                    {/* Vinyl grooves */}
                    <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#E7C878] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-cinzel dark:text-[#F5F1E8] text-[#1C1618] font-bold truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs dark:text-[#E7C878] text-[#9E7B34] font-editorial italic truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Track Playlist Selector */}
              <div className="flex flex-col gap-1.5 max-h-28 overflow-y-auto pr-1">
                {tracks.map((t, idx) => {
                  const isCurrent = idx === currentTrackIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTrack(idx)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                        isCurrent
                          ? 'dark:bg-[#3A0B17] bg-rose-100/90 border dark:border-[#E7C878]/50 border-rose-300 dark:text-[#FEF08A] text-rose-900 font-semibold'
                          : 'dark:bg-neutral-900/40 bg-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-900 dark:text-neutral-400 text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-200'
                      }`}
                    >
                      <span className="truncate max-w-[190px] font-editorial">
                        {idx + 1}. {t.title}
                      </span>
                      {isCurrent && isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 h-full dark:bg-[#FEF08A] bg-rose-600 animate-pulse" />
                          <span className="w-0.5 h-2/3 dark:bg-[#E7C878] bg-amber-600 animate-pulse" />
                          <span className="w-0.5 h-4/5 dark:bg-[#FEF08A] bg-rose-600 animate-pulse" />
                        </div>
                      ) : (
                        <Play className="w-2.5 h-2.5 opacity-60" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider & Controls */}
              <div className="pt-2 border-t dark:border-neutral-800/80 border-neutral-200 flex flex-col gap-2">
                <div className="flex items-center gap-2 dark:text-neutral-400 text-neutral-600 text-xs">
                  <button onClick={handleToggleMute} className="dark:hover:text-white hover:text-neutral-900 cursor-pointer" title="Toggle Mute">
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 dark:text-[#E7C878] text-[#9E7B34]" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 dark:bg-neutral-800 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <span className="text-[10px] font-mono dark:text-neutral-400 text-neutral-500 w-8 text-right">
                    {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleTogglePlay}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl dark:bg-gradient-to-r dark:from-[#3A0B17] dark:to-[#5C1224] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border dark:border-[#E7C878]/50 border-rose-400 hover:brightness-110 text-xs font-cinzel text-[#FEF08A] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause Music' : 'Play Music'}</span>
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="ml-2 p-2 rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-300 dark:hover:border-[#E7C878]/40 hover:border-neutral-400 dark:text-neutral-300 text-neutral-700 dark:hover:text-[#FEF08A] transition-colors cursor-pointer"
                    title="Next Track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Floating Disk Floating Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            soundEngine.playClick();
            setIsExpanded(!isExpanded);
          }}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full dark:bg-neutral-950/90 bg-white/90 backdrop-blur-xl border transition-all cursor-pointer group shadow-2xl dark:shadow-black/70 shadow-amber-900/10 ${
            isPlaying
              ? 'dark:border-[#E7C878] border-[#D4AF37] shadow-[0_0_20px_rgba(231,200,120,0.25)]'
              : 'dark:border-neutral-800 border-neutral-300 hover:border-[#E7C878]/60'
          }`}
          title="Background Music Control"
        >
          <Disc
            className={`w-4 h-4 ${isPlaying ? 'dark:text-[#FEF08A] text-[#C52A49] animate-spin' : 'dark:text-neutral-400 text-neutral-500'}`}
            style={{ animationDuration: '3.5s' }}
          />

          {/* Real-time audio equalizer wave */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full dark:bg-[#FEF08A] bg-[#C52A49] animate-pulse" style={{ animationDuration: '0.6s' }} />
              <span className="w-0.5 h-2/3 dark:bg-[#E7C878] bg-[#D4AF37] animate-pulse" style={{ animationDuration: '0.9s' }} />
              <span className="w-0.5 h-4/5 dark:bg-[#FEF08A] bg-[#C52A49] animate-pulse" style={{ animationDuration: '0.4s' }} />
            </div>
          )}

          <span className="text-xs font-cinzel tracking-wider dark:text-[#F5F1E8] text-[#1C1618] group-hover:text-[#B38838] dark:group-hover:text-[#FEF08A] transition-colors font-medium">
            {isPlaying ? 'Melody Playing' : 'Music'}
          </span>

          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 dark:text-neutral-400 text-neutral-500" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 dark:text-neutral-400 text-neutral-500" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

