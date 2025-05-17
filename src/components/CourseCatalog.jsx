import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Navbar from "./Navbar";

const courses = [
  { id: 1, title: "React Basics", topic: "Web Development", time: 3 },
  { id: 2, title: "Advanced CSS", topic: "Web Development", time: 4 },
  { id: 3, title: "Data Science Intro", topic: "Data Science", time: 5 },
  { id: 4, title: "Machine Learning", topic: "Data Science", time: 7 },
  { id: 5, title: "Digital Marketing", topic: "Marketing", time: 2 },
  { id: 6, title: "SEO Fundamentals", topic: "Marketing", time: 3 },
];

const topics = [...new Set(courses.map((c) => c.topic))];
const timeOptions = [
  { label: "Any", value: 0 },
  { label: "<= 3 hours", value: 3 },
  { label: "<= 5 hours", value: 5 },
  { label: "<= 7 hours", value: 7 },
];

 

export default function CourseCatalog() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedTime, setSelectedTime] = useState(0);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    

    // Filter courses
    const filtered = courses.filter((course) => {
      const topicMatch = selectedTopic ? course.topic === selectedTopic : true;
      const timeMatch = selectedTime ? course.time <= selectedTime : true;
      return topicMatch && timeMatch;
    });

    setFilteredCourses(filtered);

    // Trigger fade-in animation
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 800);
    return () => clearTimeout(timer);
  }, [selectedTopic, selectedTime]);

  // Progress bar width percentage
  const progressPercent = Math.round(
    (filteredCourses.length / courses.length) * 100
  );

  return (
    <>
      <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10 px-4"> 
      <div className="max-w-5xl mx-auto bg-white p-8 mt-5 rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 tracking-wide drop-shadow- animate-pulse">
          Course Catalog
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-8 mb-10 justify-center">
          <FormControl sx={{ minWidth: 180 }} size="medium" variant="outlined">
            <InputLabel id="topic-label">Topic</InputLabel>
            <Select
              labelId="topic-label"
              value={selectedTopic}
              label="Topic"
              onChange={(e) => setSelectedTopic(e.target.value)}
              sx={{
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(99, 102, 241, 0.2)",
                borderRadius: "12px",
              }}
            >
              <MenuItem value="">
                <em>All Topics</em>
              </MenuItem>
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }} size="medium" variant="outlined">
            <InputLabel id="time-label">Estimated Time</InputLabel>
            <Select
              labelId="time-label"
              value={selectedTime}
              label="Estimated Time"
              onChange={(e) => setSelectedTime(e.target.value)}
              sx={{
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(99, 102, 241, 0.2)",
                borderRadius: "12px",
              }}
            >
              {timeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-indigo-100 rounded-full h-4 mb-10 overflow-hidden shadow-inner">
          <div
            className="bg-indigo-600 h-4 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-center mb-8 font-semibold text-indigo-700 tracking-wide">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>

        {/* Courses List */}
        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500 italic text-lg">
            No courses match your filters.
          </p>
        ) : (
          <ul
            className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${
              animate ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"
            } transition-all duration-700 ease-out`}
          >
            {filteredCourses.map(({ id, title, topic, time }) => (
              <li
                key={id}
                className="border border-indigo-400 rounded-xl p-6 cursor-pointer bg-gradient-to-tr from-indigo-50 to-white hover:shadow-lg hover:scale-[1.03] transform transition-all duration-300"
                tabIndex={0}
                aria-label={`Course: ${title}, Topic: ${topic}, Estimated time: ${time} hours`}
              >
                <h3 className="text-xl font-bold text-indigo-900 mb-2 drop-shadow-md">
                  {title}
                </h3>
                <p className="text-indigo-600 font-semibold mb-1">{topic}</p>
                <p className="text-gray-600 font-medium">
                  Estimated time: {time} hour{time > 1 ? "s" : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </>
  );
}
