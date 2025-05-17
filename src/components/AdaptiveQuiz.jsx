import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { RestartAlt, Quiz } from "@mui/icons-material";
import Navbar from "./Navbar";

const correctSoundUrl =
  "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";
const wrongSoundUrl =
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg";


const questionPool = {
  easy: [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "What color is the sky?", options: ["Green", "Blue", "Red"], answer: "Blue" },
    { question: "What does HTML stand for?", options: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "HyperText Markup Language"], answer: "HyperText Markup Language" },
    { question: "Which tag is used to display images in HTML?", options: ["<image>", "<img>", "<src>"], answer: "<img>" },
    { question: "What is the correct extension for a JavaScript file?", options: [".js", ".java", ".script"], answer: ".js" },
  ],
  medium: [
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Mars" },
    { question: "Boiling point of water in °C?", options: ["100", "80", "120"], answer: "100" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style Syntax"], answer: "Cascading Style Sheets" },
    { question: "Which property is used to change text color in CSS?", options: ["font-color", "text-color", "color"], answer: "color" },
    { question: "Which HTML tag is used for creating a hyperlink?", options: ["<a>", "<link>", "<href>"], answer: "<a>" },
  ],
  hard: [
    { question: "Derivative of x²?", options: ["2x", "x", "x²"], answer: "2x" },
    { question: "Who proposed relativity?", options: ["Newton", "Einstein", "Tesla"], answer: "Einstein" },
    { question: "What is the output of `typeof null` in JavaScript?", options: ["'null'", "'object'", "'undefined'"], answer: "'object'" },
    { question: "Which JavaScript method converts a JSON string into an object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()"], answer: "JSON.parse()" },
    { question: "Which HTTP method is used to update existing data?", options: ["GET", "PUT", "POST"], answer: "PUT" },
  ],
};


export default function AdaptiveQuiz() {
  const [stage, setStage] = useState("start");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateFade, setAnimateFade] = useState(false);

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  const startQuiz = () => {
    setQuestions(questionPool[selectedDifficulty]);
    setIndex(0);
    setScore(0);
    setStage("quiz");
    setShowScore(false);
    setAnswered(false);
    setSelectedOption("");
  };

  const playSound = (correct) => {
    if (correct) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play();
    } else {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play();
    }
  };

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(option);

    const isCorrect = option === questions[index].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    playSound(isCorrect);

    setTimeout(() => {
      setAnimateFade(true);
      setTimeout(() => {
        const newIndex = index + 1;
        if (newIndex < questions.length) {
          setIndex(newIndex);
          setAnswered(false);
          setSelectedOption("");
        } else {
          setShowScore(true);
        }
        setAnimateFade(false);
      }, 500);
    }, 1500);
  };

  const nextQuestion = () => {
    if (!answered) return;
    setAnimateFade(true);
    setTimeout(() => {
      const newIndex = index + 1;
      if (newIndex < questions.length) {
        setIndex(newIndex);
        setAnswered(false);
        setSelectedOption("");
      } else {
        setShowScore(true);
      }
      setAnimateFade(false);
    }, 500);
  };

  const resetQuiz = () => {
    setStage("start");
    setSelectedOption("");
    setAnswered(false);
    setShowScore(false);
    setScore(0);
    setIndex(0);
  };

  const progressPercent = questions.length
    ? ((index + (answered ? 1 : 0)) / questions.length) * 100
    : 0;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 min-h-screen py-10 px-4">
        <div className="relative max-w-4xl mt-8 mx-auto bg-white rounded-xl shadow-2xl p-8 transition-all duration-500">
          {showConfetti && <Confetti recycle={false} numberOfPieces={150} />}

          <audio ref={correctSoundRef} src={correctSoundUrl} />
          <audio ref={wrongSoundRef} src={wrongSoundUrl} />

          <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 flex items-center gap-3 animate-pulse">
            <Quiz fontSize="large" /> Adaptive Quiz
          </h2>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {stage === "start" && (
            <div className="text-center">
              <p className="text-gray-700 text-lg mb-6">
                Choose difficulty level to start:
              </p>
              <div className="flex justify-center gap-5 mb-8">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    className={`px-5 py-3 rounded-lg border text-white capitalize font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                      selectedDifficulty === level
                        ? "bg-indigo-700 shadow-indigo-700"
                        : "bg-indigo-400 hover:bg-indigo-500 shadow-indigo-400"
                    }`}
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <button
                onClick={startQuiz}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
              >
                Start Quiz
              </button>
            </div>
          )}

          {stage === "quiz" && !showScore && (
            <div
              className={`transition-opacity duration-500 ${
                animateFade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="mb-5">
                <p className="text-xl font-semibold text-gray-900 mb-1">
                  {questions[index].question}
                </p>
                <p className="text-sm text-gray-500">
                  Question {index + 1} of {questions.length}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {questions[index].options.map((opt, i) => {
                  const isCorrect = opt === questions[index].answer;
                  const isSelected = opt === selectedOption;

                  let bgColor = "bg-gray-100 hover:bg-indigo-100";
                  if (answered) {
                    if (isCorrect) bgColor = "bg-green-500 text-white";
                    else if (isSelected) bgColor = "bg-red-500 text-white";
                    else bgColor = "bg-gray-200";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={answered}
                      className={`w-full px-6 py-3 rounded-lg border border-transparent shadow-md font-medium text-left transition duration-300 transform hover:scale-[1.03] ${bgColor}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextQuestion}
                disabled={!answered}
                className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  !answered ? "cursor-not-allowed" : ""
                }`}
              >
                Next Question
              </button>
            </div>
          )}

          {showScore && (
            <div className="text-center mt-10 animate-fadeIn">
              <p className="text-2xl font-bold text-indigo-700 mb-6">
                🎉 You scored {score} out of {questions.length}
              </p>
              <button
                onClick={resetQuiz}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-lg transition transform hover:scale-110"
              >
                <RestartAlt /> Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>
    </>
  );
}
