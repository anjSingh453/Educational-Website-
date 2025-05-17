import React from "react";
import Navbar from "../components/Navbar";
const typingWords = ["Learn.", "Practice.", "Succeed.", "Grow."];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentWord = typingWords[currentWordIndex];
    let timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 100);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-indigo-400 via-purple-900 to-pink-900 flex flex-col items-center justify-center px-6 py-12 text-white select-none pt-20">
        {/* Title with typing effect */}
        <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-lg mb-6 flex items-center">
          Education That&nbsp;
          <span className="border-r-4 border-white pr-2 animate-pulse">{displayedText}</span>
        </h1>
        <p className="text-xl max-w-3xl text-center mb-12 font-semibold drop-shadow-md animate-pulse drop-shadow-lg">
          Dive into interactive learning with quizzes, flashcards, videos, and habit tracking.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full">
          {[
            {
              title: "Flashcards",
              desc: "Flip and learn with interactive flashcards and progress tracking.",
              icon: "🃏",
            },
            {
              title: "Quizzes",
              desc: "Test yourself with adaptive quizzes and earn your score.",
              icon: "📝",
            },
            {
              title: "Habit Tracker",
              desc: "Build daily learning habits and track your progress visually.",
              icon: "📅",
            },
            {
              title: "Course Catalog",
              desc: "Filter and pick courses that fit your goals and time.",
              icon: "📚",
            },
            {
              title: "Reading Log",
              desc: "Keep track of your reading history with star ratings.",
              icon: "⭐",
            },
            {
              title: "Video Lessons",
              desc: "Watch lessons with interactive timestamp comments.",
              icon: "🎥",
            },
          ].map(({ title, desc, icon }, idx) => (
            <div
              key={idx}
              className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center
                         shadow-lg shadow-purple-800/50
                         transform transition duration-300 hover:scale-105 hover:-rotate-1 cursor-pointer"
            >
              <div className="text-6xl mb-4 animate-bounce">{icon}</div>
              <h2 className="text-2xl font-bold mb-2 drop-shadow">{title}</h2>
              <p className="text-sm md:text-base text-white/90">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
