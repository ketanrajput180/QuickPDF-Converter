import React from "react";
import { FaFileWord } from "react-icons/fa";

function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 backdrop-blur-md bg-white/70 shadow-md px-6 py-3 md:px-32 z-50 border-b border-white/30">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <FaFileWord className="text-green-500 text-3xl" />
          <h1 className="text-2xl font-extrabold tracking-tight">
            Word<span className="text-green-500">To</span>PDF
          </h1>
        </div>

        {/* Menu */}
        <button className="relative text-lg font-semibold group">
          Home
          <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
        </button>

      </div>
    </div>
  );
}

export default Navbar;
