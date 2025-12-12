import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logoImg from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-10 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo + Text */}
        <div className="flex items-center gap-3">
          <img
            className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] rounded-full"
            src={logoImg}
            alt="Logo"
          />
          <div>
            <h1 className="text-2xl font-bold">ContestHub</h1>
            <p className="text-white/70 text-sm"> Connecting creators & participants worldwide. <br />Join. Compete. Win.</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex mr-40 md:mr-0  items-center gap-5">
          <a href="#" className="hover:text-primary transition">
            <FaFacebookF size={20} /> 
          </a>
          <a href="#" className="hover:text-primary  transition">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" className="hover:text-primary transition">
            <FaGithub size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/70 text-sm text-center md:text-right">
          © 2025 ContestHub — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
