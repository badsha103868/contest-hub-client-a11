import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-10 shadow-lg relative overflow-hidden">
      {/* Background decorative shape */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        {/* Logo & Branding */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <h1 className="text-2xl font-bold tracking-wide">ContestHub</h1>
          <p className="text-gray-100 text-sm md:ml-2">
            Connecting creators & participants worldwide
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 text-white">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            <FaGithub size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-gray-100 text-sm">
          © 2025 ContestHub. All rights reserved.
        </div>
      </div>

      {/* Gradient bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse"></div>
    </footer>
  );
};

export default Footer;
