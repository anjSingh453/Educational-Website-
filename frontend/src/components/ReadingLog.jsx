import React, { useState, useEffect } from "react";
import { Star, StarBorder, Edit, Delete } from "@mui/icons-material";
import Navbar from "./Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const initialLogs = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 5 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", rating: 4 },
  { id: 3, title: "1984", author: "George Orwell", rating: 3 },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", rating: 5 },
  { id: 5, title: "Moby Dick", author: "Herman Melville", rating: 2 },
];

export default function ReadingLog() {
  const [logs, setLogs] = useState(initialLogs);
  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });
  const [form, setForm] = useState({ title: "", author: "", rating: 1, id: null });
  const [search, setSearch] = useState("");

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    const sorted = [...logs].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setLogs(sorted);
    setSortConfig({ key, direction });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "rating" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || form.rating < 1 || form.rating > 5) return;

    if (form.id) {
      setLogs((prev) =>
        prev.map((book) => (book.id === form.id ? { ...form } : book))
      );
    } else {
      setLogs((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    setForm({ title: "", author: "", rating: 1, id: null });
  };

  const handleEdit = (book) => {
    setForm(book);
  };

  const handleDelete = (id) => {
    setLogs((prev) => prev.filter((book) => book.id !== id));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <Star key={i} className="text-yellow-400" />
      ) : (
        <StarBorder key={i} className="text-yellow-400" />
      )
    );
  };

  const arrow = (key) =>
    sortConfig.key === key ? (sortConfig.direction === "asc" ? "↑" : "↓") : null;

  const filteredLogs = logs.filter(
    (log) =>
      log.title.toLowerCase().includes(search.toLowerCase()) ||
      log.author.toLowerCase().includes(search.toLowerCase())
  );

  const ratingData = [1, 2, 3, 4, 5].map((r) => ({
    rating: `${r}⭐`,
    count: logs.filter((b) => b.rating === r).length,
  }));

  return (
    <>
      <Navbar />
       <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 animate-pulse">Reading Log</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-4 mb-6 flex-wrap">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleInputChange}
            placeholder="Author"
            required
            className="flex-1 p-2 border rounded"
          />
          <select
            name="rating"
            value={form.rating}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {form.id ? "Update Book" : "Add Book"}
          </button>
        </form>

        {/* Table */}
        <table className="w-full table-auto border-collapse text-left mb-8">
          <thead>
            <tr className="border-b border-indigo-300">
              <th
                onClick={() => sortTable("title")}
                className="cursor-pointer px-4 py-3 hover:text-indigo-600"
              >
                Title {arrow("title")}
              </th>
              <th
                onClick={() => sortTable("author")}
                className="cursor-pointer px-4 py-3 hover:text-indigo-600"
              >
                Author {arrow("author")}
              </th>
              <th
                onClick={() => sortTable("rating")}
                className="cursor-pointer px-4 py-3 hover:text-indigo-600"
              >
                Rating {arrow("rating")}
              </th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(({ id, title, author, rating }) => (
              <tr
                key={id}
                className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
              >
                <td className="px-4 py-3">{title}</td>
                <td className="px-4 py-3">{author}</td>
                <td className="px-4 py-3 flex">{renderStars(rating)}</td>
                <td className="px-4 py-3 space-x-2">
                  <button onClick={() => handleEdit({ id, title, author, rating })}>
                    <Edit className="text-indigo-500" />
                  </button>
                  <button onClick={() => handleDelete(id)}>
                    <Delete className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Chart */}
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Rating Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData}>
            <XAxis dataKey="rating" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    </>
  );
}
