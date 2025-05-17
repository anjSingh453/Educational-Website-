import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaBook,
  FaQuestionCircle,
  FaClipboardList,
  FaListAlt,
  FaStar,
  FaMarkdown,
  FaChartLine,
  FaVideo,
  FaCalendarAlt,
  FaRedo,
  FaStopwatch,
  FaTrophy,
} from "react-icons/fa";

const features = [
  { title: "Flashcards", icon: <FaBook className="text-blue-500" />, path: "/flashcards" },
  { title: "Quiz", icon: <FaQuestionCircle className="text-green-500" />, path: "/quiz" },
  { title: "Daily Habit Checklist", icon: <FaClipboardList className="text-yellow-500" />, path: "/habits" },
  { title: "Course Catalog", icon: <FaListAlt className="text-purple-500" />, path: "/courses" },
  { title: "Reading Log", icon: <FaStar className="text-pink-500" />, path: "/reading-log" },
  { title: "Markdown Notes", icon: <FaMarkdown className="text-indigo-500" />, path: "/notes" },
  { title: "Adaptive Quiz", icon: <FaChartLine className="text-teal-500" />, path: "/adaptive-quiz" },
  { title: "Video Player", icon: <FaVideo className="text-red-500" />, path: "/video-player" },
  { title: "Lesson Tracker", icon: <FaCalendarAlt className="text-orange-500" />, path: "/lesson-tracker" },
  { title: "Spaced Repetition", icon: <FaRedo className="text-cyan-500" />, path: "/spaced-repetition" },
  { title: "Timer", icon: <FaStopwatch className="text-red-600" />, path: "/timer" },
  { title: "Achievements", icon: <FaTrophy className="text-yellow-600" />, path: "/achievements" },
];

// Motivational Quote component
const MotivationalQuote = () => {
  const quotes = [
    "The expert in anything was once a beginner.",
    "Push yourself, because no one else is going to do it for you.",
    "Learning never exhausts the mind.",
    "Success is the sum of small efforts repeated daily.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white bg-opacity-60 backdrop-blur-md rounded-xl p-6 text-center text-purple-800 font-semibold italic shadow-md">
      “{quotes[index]}”
    </div>
  );
};

// StreakCounter component
const StreakCounter = ({ streak }) => (
  <div className="max-w-md mx-auto bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-white rounded-xl p-6 text-center shadow-lg font-bold text-xl">
    🔥 Current Learning Streak: {streak} days
  </div>
);

// Main Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();

  const currentStreak = 10; 

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-200 to-yellow-100 pt-20 px-6 md:px-16">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-white-300 animate-pulse drop-shadow-lg">
          Your Learning Dashboard
        </h1>

        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg italic">
          Track and engage with your study features. Click a card below to dive in!
        </p>

        <div className="mb-10">
          <MotivationalQuote />
        </div>

        <div className="mb-10">
          <StreakCounter streak={currentStreak} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map(({ title, icon, path }) => (
            <div
              key={title}
              onClick={() => navigate(path)}
              className="cursor-pointer bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-400 flex flex-col items-center justify-center space-y-5 py-10 px-6 text-center"
            >
              <div className="text-7xl">{icon}</div>
              <h2 className="text-2xl font-semibold text-purple-800">{title}</h2>
              <p className="text-gray-500 text-sm">Click to open</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
