import React, { useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Navbar from "./Navbar";

const cards = [
  { question: "What is React?", answer: "A JavaScript library for building UIs." },
  { question: "What is Tailwind CSS?", answer: "A utility-first CSS framework." },
  { question: "What is Material UI?", answer: "A React UI component library." },
  { question: "What is JavaScript?", answer: "A programming language for the web." },
  { question: "What is Node.js?", answer: "JavaScript runtime built on Chrome's V8 engine." },
  { question: "What is JSX?", answer: "Syntax extension for JavaScript used in React." },
];

export default function FlashcardViewer() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState(Array(cards.length).fill(null));

  const handleFlip = () => setFlipped((f) => !f);

  const handleKnow = () => {
    const newStatus = [...status];
    newStatus[index] = true;
    setStatus(newStatus);
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const handleDontKnow = () => {
    const newStatus = [...status];
    newStatus[index] = false;
    setStatus(newStatus);
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10">
        <div className="max-w-3xl mx-auto p-8 bg-white/30 rounded-3xl shadow-2xl text-white font-sans select-none backdrop-blur-md">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 animate-pulse drop-shadow-lg   ">
            🃏 Flashcard Viewer
          </h1>

          {/* Progress */}
          <div className="flex justify-between mb-6 font-semibold text-gray-700 text-lg">
            <span>
              Card <span className="underline">{index + 1}</span> / {cards.length}
            </span>
            <span>
              Known: <span className="text-green-600">{status.filter((s) => s).length}</span>{" "}
              | Unknown: <span className="text-red-600">{status.filter((s) => s === false).length}</span>
            </span>
          </div>

          {/* Flashcard */}
          <div
            className="relative cursor-pointer w-full h-60 mx-auto perspective"
            onClick={handleFlip}
            aria-label="Flip flashcard"
            title="Click to flip card"
          >
            <div
              className={`relative w-full h-full rounded-xl shadow-2xl text-center text-2xl font-semibold transition-transform duration-700 ease-in-out transform-style preserve-3d ${flipped ? "rotate-y-180" : ""}`}
            >
              {/* Front side */}
              <div
                className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="mb-4 text-xl font-semibold tracking-wide">❓ Question</p>
                <p>{cards[index].question}</p>
                <small className="mt-3 opacity-80">Click card to see answer</small>
              </div>

              {/* Back side */}
              <div
                className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6 rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl rotate-y-180"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="mb-4 text-xl font-semibold tracking-wide">💡 Answer</p>
                <p>{cards[index].answer}</p>
                <small className="mt-3 opacity-80">Click card to go back</small>
              </div>
            </div>
          </div>

          {/* Tick / Cross buttons */}
          <div className="flex justify-center mt-8 gap-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleKnow();
              }}
              className="flex flex-col items-center bg-green-500 hover:bg-green-600 shadow-lg rounded-full p-5 w-28 transition-transform transform hover:-translate-y-1 active:scale-95"
              aria-label="I know this card"
            >
              <CheckCircle className="text-white text-5xl mb-2" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDontKnow();
              }}
              className="flex flex-col items-center bg-red-500 hover:bg-red-600 shadow-lg rounded-full p-5 w-28 transition-transform transform hover:-translate-y-1 active:scale-95"
              aria-label="I don't know this card"
            >
              <Cancel className="text-white text-5xl mb-2" />
            </button>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-10 space-x-3">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setFlipped(false);
                }}
                className={`w-5 h-5 rounded-full transition-colors duration-300 focus:outline-none ${
                  i === index ? "bg-yellow-400 shadow-lg" : "bg-yellow-200 opacity-70"
                }`}
                aria-label={`Go to card ${i + 1}`}
                title={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Flip styles */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style {
          transform-style: preserve-3d;
        }
      `}</style>
    </>
  );
}
