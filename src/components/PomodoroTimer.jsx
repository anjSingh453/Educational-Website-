import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaStopwatch, FaRedo, FaFire } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TimerPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      setPomodorosCompleted((count) => count + 1);
      alert("🎉 Pomodoro finished!");
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const chartData = {
    labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "Now"],
    datasets: [
      {
        label: "Pomodoros Completed",
        data: [0, 1, 1, 2, 2, 3, pomodorosCompleted],
        borderColor: "#ef4444",
        backgroundColor: "#fecaca",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-2xl w-full text-center">
          <h1 className="text-5xl font-extrabold text-red-600 mb-6 flex items-center justify-center gap-3 animate-pulse">
            <FaStopwatch /> Pomodoro Timer
          </h1>

          <p className="text-lg text-gray-700 mb-6 italic">
            Stay focused. One Pomodoro at a time.
          </p>

          <div className="text-7xl font-mono text-white bg-red-500 rounded-full w-56 h-56 flex items-center justify-center mx-auto shadow-2xl mb-6">
            {formatTime(secondsLeft)}
          </div>

          <div className="space-x-4 mb-6">
            <button
              onClick={() => setIsActive(!isActive)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition"
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setSecondsLeft(25 * 60);
              }}
              className="bg-white text-red-500 border-2 border-red-500 px-6 py-3 rounded-full font-bold shadow hover:bg-red-100 transition"
            >
              <FaRedo className="inline mr-2" /> Reset
            </button>
          </div>

          <div className="text-xl text-green-700 font-semibold flex justify-center items-center gap-2">
            <FaFire className="text-orange-500" /> Pomodoros Today: {pomodorosCompleted}
          </div>

          {/* Progress Chart */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Progress Chart</h2>
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerPage;
