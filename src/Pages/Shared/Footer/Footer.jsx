import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)] text-white py-12 shadow-lg overflow-hidden">
      
      {/* Decorative blur effect */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Logo */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <h1 className="text-3xl font-bold tracking-wide">
            ContestHub
          </h1>
          <p className="text-white/80 text-sm md:ml-2">
            Connecting creators & participants worldwide
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-white">
          <a href="#" className="hover:text-black transition duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-black transition duration-300">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" className="hover:text-black transition duration-300">
            <FaGithub size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-white/80 text-sm">
          © 2025 ContestHub. All rights reserved.
        </div>
      </div>

      {/* Bottom animated border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-secondary)] animate-pulse"></div>
    </footer>
  );
};

export default Footer;
