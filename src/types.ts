/* ============================================================
   SHARED TYPES & INTERFACES
   ============================================================ */

export type SceneId = 
  | 'countdown'
  | 'unlock-reveal'
  | 'cake'
  | 'bouquet'
  | 'memories'
  | 'fashion-collection'
  | 'quiz'
  | 'yes-no-game'
  | 'mystery-box'
  | 'letter'
  | 'final-ending';

export interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
  totalSecondsRemaining: number;
}

export interface MemoryItem {
  id: string;
  title: string;
  category: 'memories' | 'travel' | 'fashion' | 'us' | 'chaos';
  image: string;
  date: string;
  location?: string;
  caption: string;
  insideJoke?: string;
  voiceNoteId?: string;
  favorite?: boolean;
}

export interface VoiceNote {
  id: string;
  title: string;
  duration: string;
  date: string;
  description: string;
  previewUrl?: string;
}

export interface WaterLilyFlower {
  id: string;
  name: string;
  color: string;
  meaning: string;
  dedication: string;
  stage: number; // 0: unopened bud, 1: blooming, 2: fully bloomed
  note: string;
  accentQuote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  reactionCorrect: string;
  reactionWrong: string;
  personalTease: string;
}

export interface FashionLookbookCard {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  description: string;
  image: string;
  quote: string;
  traits: string[];
  easterEggNote?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
}
