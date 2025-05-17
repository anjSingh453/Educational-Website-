import React, { useState, useRef } from "react";
import { CheckCircle, Cancel, VolumeUp, Edit, Delete, Add } from "@mui/icons-material";
import Navbar from "./Navbar";

export default function SpacedRepetition() {
  const [cards, setCards] = useState([
  { id: 1, front: "What is React...", back: "A JavaScript library for building UIs." },
  { id: 2, front: "What is Tailwind CSS...", back: "A utility-first CSS framework." },
  { id: 3, front: "What is Material UI...", back: "A React UI component library." },
  { id: 4, front: "What is JavaScript...", back: "A programming language for the web." },
  { id: 5, front: "What is Node.js...", back: "JavaScript runtime built on Chrome's V8 engine." },
  { id: 5, front: "What is JSX...", back: "Syntax extension for JavaScript used in React." },
  ]);

  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [remembered, setRemembered] = useState(0);
  const [forgot, setForgot] = useState(0);
  const [newCard, setNewCard] = useState({ front: "", back: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const speechRef = useRef(window.speechSynthesis);

  const currentCard = cards[index];

  const handleFlip = () => {
    setShowBack(!showBack);
    speak(showBack ? currentCard.front : currentCard.back);
  };

  const speak = (text) => {
    if (!text || !speechRef.current) return;
    const utter = new SpeechSynthesisUtterance(text);
    speechRef.current.cancel(); // Cancel any ongoing speech
    speechRef.current.speak(utter);
  };

  const handleReview = (isRemembered) => {
    if (isRemembered) setRemembered((r) => r + 1);
    else setForgot((f) => f + 1);

    setShowBack(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleAddCard = () => {
    if (!newCard.front.trim() || !newCard.back.trim()) return;
    const updatedCards = [...cards, { ...newCard, id: Date.now() }];
    setCards(updatedCards);
    setNewCard({ front: "", back: "" });
  };

  const handleEditCard = (card) => {
    setEditingIndex(card.id);
    setNewCard({ front: card.front, back: card.back });
  };

  const handleSaveEdit = () => {
    setCards(cards.map((card) => (card.id === editingIndex ? { ...card, ...newCard } : card)));
    setNewCard({ front: "", back: "" });
    setEditingIndex(null);
  };

  const handleDeleteCard = (id) => {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
    if (index >= updated.length) setIndex(0);
  };

  return (
    <>
      <Navbar />
       <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-purple-50 rounded-2xl shadow-xl border border-purple-200 mt-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center animate-pulse">🧠 Spaced Repetition Flashcards</h2>

        {/* Flashcard with Flip Animation */}
        <div
          className="relative w-full h-56 perspective mb-6"
          onClick={handleFlip}
        >
          <div
            className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              showBack ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white text-xl rounded-xl shadow-lg p-4 text-center text-gray-800 font-medium">
              {currentCard?.front}
            </div>
            {/* Back */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-indigo-50 text-xl rounded-xl shadow-lg p-4 text-center text-gray-800 font-medium">
              {currentCard?.back}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => speak(showBack ? currentCard.back : currentCard.front)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <VolumeUp /> Speak
          </button>
          <button
            onClick={() => handleReview(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <CheckCircle /> Remembered
          </button>
          <button
            onClick={() => handleReview(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <Cancel /> Forgot
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 font-semibold text-purple-700 mb-8">
          <div>✅ Remembered: <span className="text-green-600">{remembered}</span></div>
          <div>❌ Forgot: <span className="text-red-600">{forgot}</span></div>
          <div>📚 Total: {cards.length}</div>
        </div>

        {/* Add/Edit Flashcard */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-bold mb-2">{editingIndex ? "Edit Card" : "Add New Card"}</h3>
          <input
            type="text"
            name="front"
            placeholder="Front"
            value={newCard.front}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg mb-2"
          />
          <input
            type="text"
            name="back"
            placeholder="Back"
            value={newCard.back}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg mb-2"
          />
          <button
            onClick={editingIndex ? handleSaveEdit : handleAddCard}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            {editingIndex ? "Save Changes" : "Add Card"} <Add />
          </button>
        </div>

        {/* Card List with Edit/Delete */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">📋 All Flashcards</h3>
          <ul className="space-y-2">
            {cards.map((card) => (
              <li
                key={card.id}
                className="flex justify-between items-center bg-purple-50 px-4 py-2 rounded-lg shadow-sm"
              >
                <span className="font-medium text-purple-900">{card.front} → {card.back}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCard(card)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Delete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>

      {/* Flip Animation Styles */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
}
