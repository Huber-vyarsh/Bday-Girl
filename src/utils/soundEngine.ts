/* ============================================================
   SOUND & MUSIC ENGINE
   Web Audio API harmonic synthesizer + Ambient background music.
   No external audio file dependencies needed for crisp interaction SFX!
   ============================================================ */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private isPlayingBg: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Soft subtle click sound for buttons
  playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  // Melodic PIN Key press
  playKeyTone(num: number | string) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const baseFreq = 440;
      const step = typeof num === 'number' ? num : 5;
      const freq = baseFreq * Math.pow(1.05946, step * 2);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  // Wrong PIN shake thud
  playErrorTone() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  // Cinematic grand chord for Unlock and Reveal
  playGrandUnlock() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // E-flat major 9th luxury chord arpeggio
      const chord = [311.13, 392.00, 466.16, 587.33, 622.25, 932.33];
      chord.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

        const startTime = this.ctx.currentTime + index * 0.08;
        const duration = 2.5;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(this.volume * 0.18, startTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {}
  }

  // Soft warm candle blow breath & chime
  playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // White noise breath + rising sparkle
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();

      // Sparkle follow-up chime
      setTimeout(() => {
        this.playCelebrationChime();
      }, 400);
    } catch {}
  }

  // Realistic metallic scratch friction SFX
  playScratchSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200 + Math.random() * 800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  // Playful hint tease chuckle sound
  playGiggleTroll() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      [580, 720, 640, 850].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        const startTime = this.ctx.currentTime + idx * 0.07;
        gain.gain.setValueAtTime(this.volume * 0.14, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.1);
      });
    } catch {}
  }

  // Romantic water lily bloom harmonic sparkle
  playBloomChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const pentatonic = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
      pentatonic.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        const startTime = this.ctx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(this.volume * 0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch {}
  }

  // Celebratory confetti fanfare
  playCelebrationChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        const startTime = this.ctx.currentTime + idx * 0.05;
        gain.gain.setValueAtTime(this.volume * 0.16, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.8);
      });
    } catch {}
  }

  // Ambient Background Music controls
  playBackgroundMusic(srcUrl?: string) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.bgAudio) {
        const defaultSrc = srcUrl || "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-1144.mp3";
        this.bgAudio = new Audio(defaultSrc);
        this.bgAudio.loop = true;
        this.bgAudio.volume = this.volume;
      }
      this.bgAudio.play().then(() => {
        this.isPlayingBg = true;
      }).catch(() => {
        // Autoplay may need user gesture
        this.isPlayingBg = false;
      });
    } catch {}
  }

  pauseBackgroundMusic() {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.isPlayingBg = false;
    }
  }

  toggleBackgroundMusic(): boolean {
    if (this.isPlayingBg) {
      this.pauseBackgroundMusic();
      return false;
    } else {
      this.playBackgroundMusic();
      return true;
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.bgAudio) {
      this.bgAudio.muted = mute;
    }
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  getIsPlaying(): boolean {
    return this.isPlayingBg;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }
}

export const soundEngine = new SoundEngine();
