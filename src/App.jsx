import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import FlashcardViewer from "./components/FlashcardViewer";
import QuizApp from "./components/QuizApp";
import DailyHabitChecklist from "./components/DailyChecklist";
import CourseCatalog from "./components/CourseCatalog";
import ReadingLog from "./components/ReadingLog";
import MarkdownEditor from "./components/MarkdownEditor";
import AdaptiveQuiz from "./components/AdaptiveQuiz";
import InteractiveVideoPlayer from "./components/VideoPlayer";
import LessonTracker from "./components/LessonTimeline";
import SpacedRepetition from "./components/SpacedRepetition";
import Home from "./pages/Home"; 
import About from './pages/About';
import Contact from './pages/Contact';
import AchievementsPage from './components/Achievements';
import TimerPage from './components/PomodoroTimer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Routes for each feature page */}
        <Route path="/flashcards" element={<FlashcardViewer />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/habits" element={<DailyHabitChecklist />} />
        <Route path="/courses" element={<CourseCatalog />} />
        <Route path="/reading-log" element={<ReadingLog />} />
        <Route path="/notes" element={<MarkdownEditor />} />
        <Route path="/adaptive-quiz" element={<AdaptiveQuiz />} />
        <Route path="/video-player" element={<InteractiveVideoPlayer />} />
        <Route path="/lesson-tracker" element={<LessonTracker />} />
        <Route path="/spaced-repetition" element={<SpacedRepetition />} />
         <Route path="/timer" element={<TimerPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
