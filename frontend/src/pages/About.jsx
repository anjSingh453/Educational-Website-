import React from "react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <> 
     <Navbar />
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-600 to-pink-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-6 animate-pulse drop-shadow-lg">
        About Us
      </h1>
      <p className="max-w-3xl text-lg leading-relaxed mb-10 text-center drop-shadow-md">
        Welcome to EduSpark — your fun, interactive learning companion!  
        Our mission is to make education exciting, accessible, and effective.  
        We believe in hands-on learning through flashcards, quizzes, videos, and much more.  
        Join thousands of students transforming how they learn every day!
      </p>
      <div className="flex space-x-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer max-w-xs text-center">
          <h2 className="text-2xl font-semibold mb-2">Interactive Flashcards</h2>
          <p>Flip, know or don’t know - make your learning stick!</p>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer max-w-xs text-center">
          <h2 className="text-2xl font-semibold mb-2">Adaptive Quizzes</h2>
          <p>Challenge yourself at your own pace and track your progress.</p>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer max-w-xs text-center">
          <h2 className="text-2xl font-semibold mb-2">Video Learning</h2>
          <p>Engaging videos with timestamped notes to enhance retention.</p>
        </div>
      </div>
    </div>
    </>
  );
}
