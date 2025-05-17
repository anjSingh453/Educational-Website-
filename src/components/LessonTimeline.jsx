import React, { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Schedule, Edit, Delete, AddCircle, CheckCircle, RadioButtonUnchecked, Sort } from "@mui/icons-material";
import Navbar from "./Navbar";

const initialLessons = [
  { id: "1", title: "🌐 Intro to HTML", date: "2025-05-17", completed: false },
  { id: "2", title: "🎨 CSS Fundamentals", date: "2025-05-18", completed: false },
  { id: "3", title: "🧠 JavaScript Basics", date: "2025-05-19", completed: false },
  { id: "4", title: "⚛️ React Components", date: "2025-05-20", completed: false },
];

const sortOptions = [
  { label: "Date ↑", key: "date", asc: true },
  { label: "Date ↓", key: "date", asc: false },
  { label: "Title ↑", key: "title", asc: true },
  { label: "Title ↓", key: "title", asc: false },
];

export default function LessonTimeline() {
  const [lessons, setLessons] = useState(initialLessons);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  // Drag and drop reorder
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newLessons = [...lessons];
    const [moved] = newLessons.splice(result.source.index, 1);
    newLessons.splice(result.destination.index, 0, moved);
    setLessons(newLessons);
  };

  // Toggle lesson completed status
  const toggleCompleted = (id) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
  };

  // Handle edit button click
  const handleEditClick = (lesson) => {
    setCurrentLesson(lesson);
    setIsEditing(true);
  };

  // Save edited lesson
  const handleSave = () => {
    setLessons((prev) =>
      prev.map((l) => (l.id === currentLesson.id ? currentLesson : l))
    );
    setIsEditing(false);
    setCurrentLesson(null);
  };

  // Delete a lesson
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
    }
  };

  // Add new lesson
  const handleAddNew = () => {
    setCurrentLesson({ id: Date.now().toString(), title: "", date: "", completed: false });
    setIsAdding(true);
  };

  // Save new lesson
  const handleAddSave = () => {
    if (!currentLesson.title.trim() || !currentLesson.date) {
      alert("Please provide valid title and date");
      return;
    }
    setLessons((prev) => [...prev, currentLesson]);
    setIsAdding(false);
    setCurrentLesson(null);
  };

  // Filter and sort lessons based on search and sort options
  const filteredSortedLessons = useMemo(() => {
    let filtered = lessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortBy.key === "date") {
        cmp = a.date.localeCompare(b.date);
      } else if (sortBy.key === "title") {
        cmp = a.title.localeCompare(b.title);
      }
      return sortBy.asc ? cmp : -cmp;
    });

    return filtered;
  }, [lessons, searchTerm, sortBy]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-emerald-200 mt-6">
        <h2 className="text-3xl font-extrabold text-emerald-600 mb-6 flex items-center gap-2 animate-pulse">
          <Schedule /> 📆 Lesson Tracker (Drag to Reschedule)
        </h2>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg shadow-md transition"
          >
            <AddCircle /> Add New Lesson
          </button>

          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-300 w-full sm:w-64"
          />

          <select
            value={sortBy.label}
            onChange={(e) =>
              setSortBy(sortOptions.find((opt) => opt.label === e.target.value))
            }
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-emerald-300"
          >
            {sortOptions.map((opt) => (
              <option key={opt.label} value={opt.label}>
                Sort by: {opt.label}
              </option>
            ))}
          </select>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lessons">
            {(provided) => (
              <ul
                className="space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredSortedLessons.map((lesson, index) => (
                  <Draggable
                    key={lesson.id}
                    draggableId={lesson.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded-xl border shadow-md flex justify-between items-center transition-all duration-200
                          ${
                            lesson.completed
                              ? "bg-emerald-100 border-emerald-400 line-through text-gray-500"
                              : "bg-emerald-50 border-emerald-300 hover:bg-emerald-100"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleCompleted(lesson.id)}>
                          {lesson.completed ? (
                            <CheckCircle className="text-emerald-600" />
                          ) : (
                            <RadioButtonUnchecked className="text-gray-400 hover:text-emerald-600 transition-colors" />
                          )}

                          <div>
                            <div className="text-xl font-semibold text-emerald-800">
                              {lesson.title}
                            </div>
                            <div className="text-sm text-gray-600 font-mono">
                              📅 {lesson.date}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(lesson)}
                            className="bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 text-sm flex items-center gap-1"
                            aria-label={`Edit ${lesson.title}`}
                          >
                            <Edit fontSize="small" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(lesson.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm flex items-center gap-1"
                            aria-label={`Delete ${lesson.title}`}
                          >
                            <Delete fontSize="small" /> Delete
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {filteredSortedLessons.length === 0 && (
                  <li className="text-center text-gray-500 py-8">No lessons found</li>
                )}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {/* Modal for editing or adding lesson */}
        {(isEditing || isAdding) && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-emerald-300">
              <h3 className="text-xl font-bold mb-4 text-emerald-700">
                {isEditing ? "✏️ Edit Lesson" : "➕ Add New Lesson"}
              </h3>

              <label className="block mb-2 text-sm text-gray-700 font-medium">
                Lesson Title
              </label>
              <input
                type="text"
                value={currentLesson.title}
                onChange={(e) =>
                  setCurrentLesson({ ...currentLesson, title: e.target.value })
                }
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring focus:ring-emerald-200"
                placeholder="Enter lesson title"
              />

              <label className="block mb-2 text-sm text-gray-700 font-medium">
                Lesson Date
              </label>
              <input
                type="date"
                value={currentLesson.date}
                onChange={(e) =>
                  setCurrentLesson({ ...currentLesson, date: e.target.value })
                }
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring focus:ring-emerald-200"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setIsAdding(false);
                    setCurrentLesson(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={isEditing ? handleSave : handleAddSave}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  {isEditing ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
