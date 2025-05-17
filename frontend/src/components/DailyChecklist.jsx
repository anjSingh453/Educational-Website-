import React, { useState } from "react";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import Navbar from "./Navbar";

export default function DailyHabitChecklist() {
  const [habits, setHabits] = useState([
    "Read 30 mins",
    "Practice coding",
    "Meditate",
    "Exercise",
    "Write journal",
  ]);
  const [completed, setCompleted] = useState(new Set());
  const [newHabit, setNewHabit] = useState("");

  const toggleHabit = (habit) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(habit)) {
      newCompleted.delete(habit);
    } else {
      newCompleted.add(habit);
    }
    setCompleted(newCompleted);
  };

  const addHabit = () => {
    const trimmed = newHabit.trim();
    if (trimmed && !habits.includes(trimmed)) {
      setHabits([...habits, trimmed]);
      setNewHabit("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addHabit();
  };

  const progress = habits.length
    ? Math.round((completed.size / habits.length) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10">
      <div
        className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl mt-12 transition-transform transform hover:scale-[1.02] duration-300"
        role="region"
        aria-label="Daily Habit Checklist"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 tracking-wide drop-shadow-md animate-pulse">
          Daily Habit Checklist
        </h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-indigo-100 rounded-full h-6 shadow-inner overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-6 bg-indigo-600 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            />
          </div>
          <p className="mt-2 text-indigo-700 font-semibold text-center tracking-wide">
            {progress}% completed
          </p>
        </div>

        {/* Add New Habit */}
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add new habit..."
            className="flex-grow border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addHabit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        {/* Habits List */}
        <ul className="space-y-5">
          {habits.map((habit) => {
            const done = completed.has(habit);
            return (
              <li
                key={habit}
                tabIndex={0}
                role="checkbox"
                aria-checked={done}
                onClick={() => toggleHabit(habit)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleHabit(habit);
                  }
                }}
                className="flex items-center cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-lg px-3 py-2 hover:bg-indigo-50 transition-colors"
              >
                {done ? (
                  <CheckCircle
                    className="text-indigo-600 mr-4 transition-transform duration-300 hover:scale-125"
                    fontSize="large"
                  />
                ) : (
                  <RadioButtonUnchecked
                    className="text-gray-400 mr-4 hover:text-indigo-600 transition-colors duration-300"
                    fontSize="large"
                  />
                )}
                <span
                  className={`text-xl font-medium select-text ${
                    done
                      ? "line-through text-gray-400 italic"
                      : "text-gray-900 font-semibold"
                  }`}
                >
                  {habit}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      </div>
    </>
  );
}
