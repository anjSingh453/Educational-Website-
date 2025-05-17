import React from "react";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const AchievementsPage = () => {
  const userStats = {
    quizzesCompleted: 15,
    habitStreak: 10,
    flashcardsReviewed: 200,
  };

  const data = [
    { name: "Quizzes", value: userStats.quizzesCompleted, emoji: "🎯" },
    { name: "Habit Streak", value: userStats.habitStreak, emoji: "🔥" },
    { name: "Flashcards", value: userStats.flashcardsReviewed, emoji: "📚" },
  ];

  const colors = ["#a78bfa", "#f472b6", "#facc15"];

  const badges = [
    { title: "Quiz Master", icon: "🏆", condition: userStats.quizzesCompleted >= 10 },
    { title: "Streak Champ", icon: "🔥", condition: userStats.habitStreak >= 7 },
    { title: "Flashcard Pro", icon: "📘", condition: userStats.flashcardsReviewed >= 100 },
  ];

  const shareUrl = "https://yourappdomain.com/achievements";
  const shareMessage = "Check out my achievements on this awesome learning app! 🚀";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 p-6">
        <h1 className="text-5xl text-center text-purple-700 font-extrabold mb-12 drop-shadow-lg animate-pulse">
          🎉 Your Achievements
        </h1>

        {/* Stat Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.map((stat, idx) => (
            <div
              key={stat.name}
              className="transform hover:scale-105 transition duration-300 rounded-2xl p-6 text-center shadow-xl bg-white"
            >
              <div className="text-4xl mb-3">{stat.emoji}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{stat.name}</h2>
              <p className="text-3xl font-bold text-purple-700">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">📊 Progress Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Earned Badges */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">🏅 Earned Badges</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {badges
              .filter((badge) => badge.condition)
              .map((badge, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl px-6 py-4 shadow-lg flex flex-col items-center text-center hover:scale-105 transition duration-300"
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="text-lg font-semibold text-gray-700">{badge.title}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📤 Share Your Achievements</h2>
          <p className="text-gray-600 mb-4">Let your friends know about your progress!</p>
          <div className="flex justify-center gap-4">
            <FacebookShareButton url={shareUrl} quote={shareMessage}>
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareMessage}>
              <TwitterIcon size={48} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} summary={shareMessage}>
              <LinkedinIcon size={48} round />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementsPage;
