import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../data/quizData';
import { soundEngine } from '../utils/soundEngine';

interface QuizSceneProps {
  onNextScene: () => void;
}

export const QuizScene: React.FC<QuizSceneProps> = ({ onNextScene }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      soundEngine.playCelebrationChime();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      soundEngine.playErrorTone();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      soundEngine.playGrandUnlock();
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
    setScore(0);
    setStreak(0);
  };

  const getResultAssessment = () => {
    if (score === QUIZ_QUESTIONS.length) return QUIZ_RESULTS.perfect;
    if (score >= 3) return QUIZ_RESULTS.great;
    return QUIZ_RESULTS.playful;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8 pb-28 sm:pb-32 select-none">
      {/* Quiz Eyebrow Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 text-center max-w-xl z-10"
      >
        <span className="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#E7C878] dark:text-[#E7C878] text-[#9E7B34] font-semibold">
          Chapter 05 ✦ The Husbands Mind Exam
        </span>
        <h2 className="text-2xl sm:text-4xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] tracking-wider font-bold">
          HOW WELL DO YOU KNOW ME?
        </h2>
        <p className="text-xs sm:text-sm font-editorial italic dark:text-neutral-400 text-neutral-600">
          "A scientifically accurate, highly classified investigation into our marriage dynamics."
        </p>
      </motion.div>

      {/* Main Game Arena */}
      {!isCompleted ? (
        <div className="w-full max-w-2xl my-6 z-10">
          {/* Progress & Streak Bar */}
          <div className="flex items-center justify-between mb-4 px-2 text-xs font-sans-luxury dark:text-neutral-400 text-neutral-600">
            <span>
              Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="dark:text-[#FEF08A] text-amber-700 font-semibold">Streak: {streak} 🔥</span>
              <span className="dark:text-[#E7C878] text-[#9E7B34] font-medium">• Score: {score}</span>
            </div>
          </div>

          <div className="w-full h-1.5 rounded-full dark:bg-neutral-900 bg-neutral-200 overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-[#E7C878] to-[#FEF08A] transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-3xl dark:bg-neutral-950/90 bg-white/95 border dark:border-neutral-800 border-neutral-200 backdrop-blur-xl shadow-2xl dark:shadow-black/60 shadow-amber-900/10 flex flex-col gap-6"
            >
              <div>
                <span className="text-[11px] font-sans-luxury tracking-[0.25em] dark:text-[#E7C878] text-[#9E7B34] font-semibold uppercase block mb-1">
                  {currentQ.context}
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] leading-snug font-bold">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="flex flex-col gap-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;
                  const showCorrectness = isAnswered;

                  let buttonStyle = 'dark:bg-neutral-900/60 bg-neutral-50 dark:border-neutral-800 border-neutral-200 dark:text-neutral-300 text-neutral-800 hover:border-[#E7C878] dark:hover:border-[#E7C878]/50';

                  if (showCorrectness) {
                    if (isCorrect) {
                      buttonStyle = 'dark:bg-emerald-950/60 bg-emerald-50 dark:border-emerald-500 border-emerald-600 dark:text-emerald-200 text-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-medium';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'dark:bg-rose-950/60 bg-rose-50 dark:border-rose-500 border-rose-600 dark:text-rose-200 text-rose-900 shadow-[0_0_15px_rgba(244,63,94,0.2)] font-medium';
                    } else {
                      buttonStyle = 'dark:bg-neutral-950/40 bg-neutral-100 dark:border-neutral-800 border-neutral-200 dark:text-neutral-500 text-neutral-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswered}
                      className={`p-4 rounded-2xl border text-left text-sm font-editorial transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <span className="leading-relaxed">{option}</span>
                      {showCorrectness && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />
                      )}
                      {showCorrectness && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reaction Banner */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-editorial leading-relaxed ${
                    selectedOption === currentQ.correctIndex
                      ? 'dark:bg-emerald-950/40 bg-emerald-50/90 dark:border-emerald-500/40 border-emerald-400 dark:text-emerald-200 text-emerald-900'
                      : 'dark:bg-rose-950/40 bg-rose-50/90 dark:border-rose-500/40 border-rose-400 dark:text-rose-200 text-rose-900'
                  }`}
                >
                  <p className="font-semibold mb-0.5">
                    {selectedOption === currentQ.correctIndex ? currentQ.reactionCorrect : currentQ.reactionWrong}
                  </p>
                  <p className="text-xs dark:text-neutral-400 text-neutral-600 italic">"{currentQ.personalTease}"</p>
                </motion.div>
              )}

              {/* Next Question CTA */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E7C878] hover:bg-[#FEF08A] text-neutral-950 text-xs font-cinzel font-bold tracking-widest uppercase transition-all cursor-pointer shadow-lg"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Assessment'}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Final Assessment Scorecard */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl my-6 p-8 rounded-3xl dark:bg-neutral-950/90 bg-white/95 border dark:border-[#E7C878]/50 border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center gap-5 z-10"
        >
          <div className="p-4 rounded-full dark:bg-[#3A0B17]/60 bg-amber-100 border dark:border-[#E7C878]/50 border-amber-300 dark:text-[#FEF08A] text-[#9E7B34]">
            <Trophy className="w-10 h-10 animate-pulse" />
          </div>

          <div>
            <span className="text-[11px] font-sans-luxury tracking-[0.3em] dark:text-[#E7C878] text-[#9E7B34] font-semibold uppercase">
              {getResultAssessment().badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel dark:text-[#F5F1E8] text-[#1C1618] my-1 font-bold">
              {getResultAssessment().title}
            </h3>
            <p className="text-xs font-sans-luxury dark:text-[#FEF08A] text-[#C52A49] font-bold">
              Final Score: {score} / {QUIZ_QUESTIONS.length}
            </p>
          </div>

          <p className="text-sm font-editorial dark:text-neutral-300 text-neutral-700 leading-relaxed max-w-md">
            "{getResultAssessment().description}"
          </p>

          <div className="flex items-center gap-4 pt-4 border-t dark:border-neutral-800 border-neutral-200 w-full justify-center">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-300 text-xs font-sans-luxury dark:text-neutral-400 text-neutral-700 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNextScene();
              }}
              className="group flex items-center gap-2 px-8 py-3 rounded-full dark:bg-gradient-to-r dark:from-[#3A0B17] dark:to-[#5C1224] bg-gradient-to-r from-[#C52A49] to-[#9B1D35] border border-[#E7C878] text-xs font-cinzel tracking-widest text-[#FEF08A] uppercase shadow-lg hover:shadow-[#E7C878]/30 transition-all cursor-pointer font-bold"
            >
              <span>Play The Mischievous YES/NO Game</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Footer text */}
      <div className="text-[11px] font-editorial dark:text-neutral-500 text-neutral-500 tracking-widest z-10">
        Certified Jessica & Husband Brain Compatibility Index
      </div>
    </div>
  );
};
