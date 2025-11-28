import React from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaHeart, FaFileWord } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full  bg-gray-900 text-white py-6 px-4 border-t border-green-500/20">
      <div className="max-w-6xl mx-auto">

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-4">

          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaFileWord className="text-3xl text-green-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Word<span className="text-white">To</span>PDF
              </h2>
            </div>
            <p className="text-gray-400 text-xs text-center lg:text-left max-w-xs">
              Convert your Word docs to PDF instantly — fast, secure, and free.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Connect With Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30">
                <FaGithub />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                <FaLinkedin />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-500 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                <FaGlobe />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-end gap-2">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:underline">
                Contact Us
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:underline">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mb-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {year} WordToPDF. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <FaHeart className="text-red-500 animate-pulse" /> by 
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold ml-1">Ketan</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div> Service Active
          </span>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">🔒 Secure</span>
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">⚡ Instant</span>
          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full text-xs border border-purple-500/30">🆓 Free</span>
          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs border border-yellow-500/30">📱 Mobile</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
