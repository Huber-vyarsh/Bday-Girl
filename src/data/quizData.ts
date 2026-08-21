import { QuizQuestion } from '../types';

/* ============================================================
   HOW WELL DO YOU KNOW ME? QUIZ DATA
   Difficulty: 8/10. Playful, teasing, insider relationship humor.
   ============================================================ */

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When I say 'I'm not that hungry, just order whatever', what is my true hidden intention?",
    context: "Scenario: Late night dinner delivery ordering session",
    options: [
      "I genuinely want a light, healthy meal.",
      "I am secretly going to eat 60% of your fries and malai chaap.",
      "I am on a strict keto diet until tomorrow morning.",
      "I am expecting you to cook a 5-course gourmet meal."
    ],
    correctIndex: 1,
    reactionCorrect: "EXACTLY. You know my appetite better than I do! 😂🍟",
    reactionWrong: "Are you serious?! You know my fork always wanders into your plate!",
    personalTease: "Taxing your food plate is my marital right.",
  },
  {
    id: 2,
    question: "What is my immediate reaction when you start a sentence with 'Wait, I have tea/gossip'?",
    context: "The Daily Evening Briefing",
    options: [
      "I ignore it and keep scrolling.",
      "I put down everything, sit upright, and demand all names & timestamps.",
      "I tell you we shouldn't gossip.",
      "I fall asleep immediately."
    ],
    correctIndex: 1,
    reactionCorrect: "100%! I need the backstory, the screenshots, and the full drama analysis!",
    reactionWrong: "Wrong! You know I am the unpaid assistant director of your gossip department.",
    personalTease: "We are partners in crime and gossip.",
  },
  {
    id: 3,
    question: "What is my all-time favorite thing to do with you on a Sunday afternoon?",
    context: "The Ultimate Weekend Priority",
    options: [
      "Running a 10km marathon in hot weather.",
      "Doing tax accounting spreadsheets.",
      "Cuddling in bed under blankets, watching series, and snacking endlessly.",
      "Rearranging the furniture for the 4th time."
    ],
    correctIndex: 2,
    reactionCorrect: "Spot on! Hibernation with my Polar Bear is heaven on earth. 🐻❄️",
    reactionWrong: "Did you mix me up with an Olympic athlete?! We are couch royalty!",
    personalTease: "Cozy blanket mode: permanently activated.",
  },
  {
    id: 4,
    question: "Why do I call you 'Khil'?",
    context: "The Sweet Inside Joke",
    options: [
      "Because it is short for a secret superhero codename.",
      "Because like sweet white puffed khil eaten with batasha, you are my sweet, crisp, irreplaceable joy.",
      "I accidentally misspelled your contact name 4 years ago.",
      "It is a secret password for our Wi-Fi."
    ],
    correctIndex: 1,
    reactionCorrect: "Aww yes! Sweet, fluffy, and perfect with batasha — you are my Khil. ❤️",
    reactionWrong: "How could you forget our sweet khil-batasha lore?!",
    personalTease: "Best inside nickname ever.",
  },
  {
    id: 5,
    question: "If we get into a playful argument about who loves who more, what is the mathematically proven truth?",
    context: "The Eternal Love Debate",
    options: [
      "It is a 50/50 exact tie.",
      "You love me more (obvious lie).",
      "I love you more, by approximately 10 million light-years.",
      "We consult a Supreme Court lawyer."
    ],
    correctIndex: 2,
    reactionCorrect: "FACTS! Science, astrophysics, and my whole heart agree. 🥰",
    reactionWrong: "Nice try contesting it, but my love for you is non-negotiable and infinite!",
    personalTease: "I win this debate every single day.",
  }
];

export const QUIZ_RESULTS = {
  perfect: {
    title: "ADMIN ACCESS TO MY BRAIN 👑",
    scoreText: "5 / 5 — Uncanny Perfection",
    description: "You know every thought, every craving, and every heartbeat of mine. Suspiciously accurate... are you running surveillance on my brain, Sweetheart?",
    badge: "Mastermind Soulmate",
  },
  great: {
    title: "OFFICIAL POLAR BEAR SCHOLAR 🎓",
    scoreText: "High Honor Roll",
    description: "You know me inside out! A few mischievous answers here and there, but you hold the keys to my heart forever.",
    badge: "Certified Jessica Royalty",
  },
  playful: {
    title: "SUSPICIOUSLY CHEEKY 😈",
    scoreText: "Passing Grade in Mischief",
    description: "You missed a couple on purpose just to tease me, didn't you? Either way, you get lifetime VIP hugs and unlimited malai chaap privileges!",
    badge: "Chief Trouble Maker",
  }
};
