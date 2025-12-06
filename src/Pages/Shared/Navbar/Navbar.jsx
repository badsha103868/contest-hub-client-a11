import React from 'react';
import { NavLink } from 'react-router';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';

const Navbar = () => {
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allContest">All Contest</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <span className="btn btn-ghost text-xl">Contest Hub</span>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <img
            src="https://i.ibb.co/Y0WHx8Y/default-avatar.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
