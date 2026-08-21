/* ============================================================
   PROJECT CONFIGURATION
   Central hub for all personalized settings, dates, secret PIN, 
   nicknames, easter eggs, and testing flags.
   ============================================================ */

export const PROJECT_CONFIG = {
  // Recipient Information
  recipient: {
    name: "Jessica",
    formalName: "Jessica",
    nicknames: ["Polar Bear", "Sweetheart", "Khil"],
    specialJokeName: "Khil", // The puffed rice & batasha inside joke
    subtitle: "FOR MY FAVORITE HUMAN IN THE ENTIRE UNIVERSE",
  },

  // Target Birthday Information
  birthday: {
    // 7 September 2026, 12:00 PM IST (UTC+05:30)
    year: 2026,
    month: 9, // September
    day: 7,
    hour: 12,
    minute: 0,
    second: 0,
    timezone: "Asia/Kolkata",
    targetIso: "2026-09-07T12:00:00+05:30",
    displayDate: "07 · 09 · 2026",
    displayTime: "12:00 PM IST",
  },

  // Access & Secret PIN Bypass
  access: {
    secretPin: "0709", // Month & day code
    hint: "Enter the four digits that mark your special day",
    wrongPinQuotes: [
      "Hmm... that isn't the secret.",
      "Nice try, sweetheart, but guess again!",
      "Are you sure you're Jessica? Try 0709 😉",
      "Almost... but my heart says try once more.",
    ],
  },

  // Audio / Music Settings
  music: {
    enabled: true,
    defaultVolume: 0.6,
    ambientSynthEnabled: true,
    tracks: [
      {
        id: "ambient-love",
        title: "Golden Hour Symphony (Cinematic Romance)",
        artist: "For Jessica",
        // Soft romantic royalty-free lofi piano ambient stream
        src: "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-1144.mp3",
      },
      {
        id: "gentle-waltz",
        title: "Midnight In Paris (Acoustic Elegance)",
        artist: "Handcrafted with Love",
        src: "https://assets.mixkit.co/music/preview/mixkit-sweet-love-melody-1142.mp3",
      }
    ],
  },

  // Visual Palette Accents
  theme: {
    butterYellow: "#FEF08A",
    butterYellowMuted: "#FDE68A",
    champagneGold: "#E7C878",
    deepBurgundy: "#3A0B17",
    crimson: "#C52A49",
    obsidianBlack: "#050505",
    softIvory: "#F5F1E8",
  },

  // Development & Testing Flags
  development: {
    // Set to true to allow one-click quick scene switching in dev toolbar
    devToolbarEnabled: true,
    // When true, allows instantly triggering unlock for review
    quickPreviewAllowed: true,
  },
};
