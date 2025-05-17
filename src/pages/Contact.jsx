import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>  
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-600 to-pink-900 flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-5xl font-extrabold mb-6 animate-pulse drop-shadow-lg">Contact Us</h1>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full p-8 bg-gradient-to-br from-white/80 to-white/60 rounded-3xl
                     shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                     backdrop-blur-xl
                     transform
                     transition-transform
                     hover:scale-[1.03]
                     active:scale-[0.98]
                     "
        >
          <input
            className="w-full mb-6 px-5 py-3 rounded-xl bg-white shadow-lg
                       text-black placeholder-gray-500 font-medium
                       focus:outline-none focus:ring-4 focus:ring-purple-500
                       transition-shadow duration-300
                       active:shadow-inner"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full mb-6 px-5 py-3 rounded-xl bg-white shadow-lg
                       text-black placeholder-gray-500 font-medium
                       focus:outline-none focus:ring-4 focus:ring-purple-500
                       transition-shadow duration-300
                       active:shadow-inner"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full mb-6 px-5 py-3 rounded-xl bg-white shadow-lg resize-none
                       text-black placeholder-gray-500 font-medium
                       focus:outline-none focus:ring-4 focus:ring-purple-500
                       transition-shadow duration-300
                       active:shadow-inner"
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold
                       shadow-lg hover:shadow-purple-500/60
                       transition-all duration-300 transform active:scale-95"
          >
            Send Message
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4 max-w-md w-full p-8 bg-white/80 rounded-3xl shadow-lg backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-purple-700">Thank you for reaching out!</h2>
          <p className="text-black">We will get back to you soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white
                       shadow-lg hover:shadow-purple-500/60
                       transition-all duration-300 transform active:scale-95"
          >
            Send Another Message
          </button>
        </div>
      )}
    </div>
    </>
  );
}
