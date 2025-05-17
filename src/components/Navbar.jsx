import React from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-pink-700 via-purple-600 to-indigo-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-extrabold text-3xl tracking-widest select-none cursor-default drop-shadow-lg">
          Edu
          <span className="text-yellow-300 animate-pulse">Spark</span>
        </div>
        <ul className="flex space-x-10">
          {navLinks.map(({ name, href }) => (
            <li key={name}>
              <a
                href={href}
                className="relative text-white font-semibold text-lg transform transition-transform duration-300 hover:text-yellow-400 hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/50"
                style={{ perspective: "600px" }}
              >
                <span className="inline-block transition-transform duration-300 hover:rotateY-12">
                  {name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
