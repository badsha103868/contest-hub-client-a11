import React from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import logoImg from "../../../assets/logo.png";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allContest">All Contest</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-secondary text-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown z-50 ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 text-primary rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-1">
          <img
            className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] ml-1 rounded-full"
            src={logoImg}
            alt="Logo"
          />
          <h3 className="font-semibold md:font-semibold lg:font-bold text-xl">
            Contest Hub
          </h3>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user && (
          <div className="flex items-center gap-3">
            {/* User Image */}
            <div className="w-10 mr-2 h-10 rounded-full overflow-hidden border">
              <img
                src={
                  user.photoURL || "https://i.ibb.co/Y0WHx8Y/default-avatar.png"
                }
                alt="Profile"
                className="w-full  h-full object-cover"
              />
            </div>
          </div>
        )}

        {user ? (
          <a onClick={handleLogout} className="btn">
            Logout
          </a>
        ) : (
          <Link to="/login" className="btn btn-primary text-white m-2">
            Login
          </Link>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
