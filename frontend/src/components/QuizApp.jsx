import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const correctSoundUrl =
  "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";
const wrongSoundUrl =
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg";


const questionsPool = [
  {
    question: "What does OOP stand for?",
    options: [
      "Object-Oriented Programming",
      "Open-Source Programming",
      "Overloaded Operations Protocol",
      "Optional Operational Procedures",
    ],
    answer: "Object-Oriented Programming",
    explanation:
      "OOP stands for Object-Oriented Programming, a programming paradigm based on objects.",
  },
  {
    question: "Which of these is NOT a pillar of OOP?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Compilation"],
    answer: "Compilation",
    explanation:
      "The four pillars of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction, not Compilation.",
  },
  {
    question: "What is encapsulation in OOP?",
    options: [
      "Wrapping data and methods into a single unit",
      "Deriving new classes from existing ones",
      "Ability of an object to take many forms",
      "Writing programs without bugs",
    ],
    answer: "Wrapping data and methods into a single unit",
    explanation:
      "Encapsulation is the concept of bundling data and methods that operate on that data within one unit, usually a class.",
  },
  {
    question: "What is polymorphism?",
    options: [
      "Multiple forms of a function or method",
      "Single form of data representation",
      "Class inheritance hierarchy",
      "Compilation of code",
    ],
    answer: "Multiple forms of a function or method",
    explanation:
      "Polymorphism allows methods to do different things based on the object it is acting upon.",
  },
  {
    question: "What does inheritance enable?",
    options: [
      "Creating new classes based on existing classes",
      "Hiding internal details of an object",
      "Creating multiple objects from the same class",
      "Allowing objects to change their form",
    ],
    answer: "Creating new classes based on existing classes",
    explanation:
      "Inheritance allows a class to inherit properties and methods from another class.",
  },
  {
    question: "What is abstraction?",
    options: [
      "Hiding complexity and showing only essential features",
      "Writing detailed implementation code",
      "Creating a new object from a class",
      "Multiple forms of methods",
    ],
    answer: "Hiding complexity and showing only essential features",
    explanation:
      "Abstraction focuses on exposing only the necessary details while hiding the complexity.",
  },
];

const TIMER_SECONDS = 15;

export default function QuizApp() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questionsPool.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [reviewMode, setReviewMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [savedToLeaderboard, setSavedToLeaderboard] = useState(false);

  const correctSoundRef = useRef(new Audio(correctSoundUrl));
  const wrongSoundRef = useRef(new Audio(wrongSoundUrl));
  const timerRef = useRef(null);

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
    } catch {
      return [];
    }
  });

  const playSound = (correct) => {
    const sound = correct ? correctSoundRef.current : wrongSoundRef.current;
    sound.currentTime = 0;
    sound.play();
  };

  const question = questionsPool[currentQ];

  useEffect(() => {
    if (showScore || reviewMode) return;
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerRef.current);
          handleSkip();
          return TIMER_SECONDS;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, showScore, reviewMode]);

  const handleAnswer = (option) => {
    if (selected !== null) return;

    setSelected(option);
    const correct = option === question.answer;
    const newAnswers = [...answers];
    newAnswers[currentQ] = { selected: option, correct };
    setAnswers(newAnswers);

    playSound(correct);
    if (correct) {
      setScore((s) => s + 1);
      setFeedback("Correct! 🎉");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setFeedback("Oops! That's incorrect. ❌");
    }

    clearInterval(timerRef.current);
  };

  const handleSkip = () => {
    if (answers[currentQ] === null) {
      setSkippedQuestions((prev) => [...new Set([...prev, currentQ])]);
      const newAnswers = [...answers];
      newAnswers[currentQ] = { selected: null, correct: false, skipped: true };
      setAnswers(newAnswers);
    }
    setSelected(null);
    setFeedback("");

    if (currentQ + 1 < questionsPool.length) {
      setCurrentQ(currentQ + 1);
    } else if (skippedQuestions.length > 0) {
      setReviewMode(true);
      setCurrentQ(skippedQuestions[0]);
    } else {
      setShowScore(true);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback("");

    if (reviewMode) {
      setSkippedQuestions((prev) => prev.filter((q) => q !== currentQ));
      if (skippedQuestions.length > 1) {
        setCurrentQ(skippedQuestions[1]);
      } else {
        setReviewMode(false);
        setShowScore(true);
      }
    } else if (currentQ + 1 < questionsPool.length) {
      setCurrentQ(currentQ + 1);
    } else if (skippedQuestions.length > 0) {
      setReviewMode(true);
      setCurrentQ(skippedQuestions[0]);
    } else {
      setShowScore(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowScore(false);
    setFeedback("");
    setSkippedQuestions([]);
    setAnswers(Array(questionsPool.length).fill(null));
    setReviewMode(false);
    setUserName("");
    setSavedToLeaderboard(false);
  };

  const saveScoreToLeaderboard = (name) => {
    const newEntry = {
      name: name || "Anonymous",
      score,
      total: questionsPool.length,
      date: new Date().toISOString(),
    };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem("quizLeaderboard", JSON.stringify(updatedLeaderboard));
    setSavedToLeaderboard(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#d1f4ff] via-[#fde1ff] to-[#fff3d6] flex items-center justify-center py-10 px-4">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl bg-white/30 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/40"
        >
          {showConfetti && <Confetti numberOfPieces={180} recycle={false} />}
          {!showScore ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-purple-700 drop-shadow">
                  Question {currentQ + 1} of {questionsPool.length}
                </h2>
                <p className={`text-lg font-bold ${timeLeft <= 5 ? "text-red-600 animate-pulse" : "text-sky-800"}`}>
                  {timeLeft}s
                </p>
              </div>

              <p className="mb-6 text-2xl font-semibold text-gray-800 tracking-tight">{question.question}</p>

              <div className="grid gap-4">
                {question.options.map((option) => {
                  const isSelected = selected === option;
                  const isCorrect = option === question.answer;
                  return (
                    <motion.button
                      whileHover={{ scale: selected ? 1 : 1.03, rotateX: selected ? 0 : 5 }}
                      whileTap={{ scale: 0.97 }}
                      key={option}
                      disabled={selected !== null}
                      onClick={() => handleAnswer(option)}
                      className={`py-3 px-5 rounded-xl font-semibold text-lg shadow-lg transform transition-all duration-300
                        ${
                          selected === null
                            ? "bg-white hover:bg-indigo-100 text-indigo-800"
                            : isSelected && isCorrect
                            ? "bg-green-500 text-white"
                            : isSelected
                            ? "bg-red-500 text-white line-through"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              {feedback && (
                <div className="mt-4 text-lg text-center font-bold">
                  {feedback.includes("Correct") ? (
                    <p className="text-green-600">{feedback}</p>
                  ) : (
                    <p className="text-red-600">{feedback}</p>
                  )}
                </div>
              )}

              {(selected !== null || reviewMode) && question.explanation && (
                <div className="mt-5 p-4 bg-yellow-100 rounded-md border-l-4 border-yellow-400 text-yellow-900">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button onClick={handleSkip} className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold shadow-md">
                  Skip
                </button>
                <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md">
                  Next
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-purple-700">🎉 Quiz Completed!</h2>
              <p className="text-xl font-medium text-gray-800 mb-2">Your score: {score} / {questionsPool.length}</p>
              <button
                onClick={handleRetry}
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-bold shadow-lg"
              >
                Restart Quiz
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
