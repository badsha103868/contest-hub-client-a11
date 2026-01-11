import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import logoImg from "../../../assets/logo.png";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const profileRef = useRef(null);

  //Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
           Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Log Out Successful",
            showConfirmButton: false,
            timer: 1500,
          });
      })
      .catch((error) => console.log(error.message));
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-contests" onClick={handleLinkClick}>
          All Contest
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={handleLinkClick}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard" onClick={handleLinkClick}>Leaderboard</NavLink>

      </li>
    </>
  );

  return (
    <div className="navbar bg-secondary text-white shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div ref={mobileMenuRef} className="relative z-50">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ☰
          </button>

          {isOpen && (
            <ul className="absolute menu menu-sm bg-base-100 text-primary rounded-box mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to='/' className="flex items-center gap-1 ml-2">
          <img
            className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] rounded-full"
            src={logoImg}
            alt="Logo"
          />
          <h3 className="font-bold text-xl">Contest Hub</h3>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right side */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div ref={profileRef} className="relative">
            <img
              className="w-12 h-12 rounded-full bg-white cursor-pointer"
              src={user.photoURL}
              alt="avatar"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />

            {isProfileOpen && (
              <ul className="absolute z-50 right-0 mt-2 menu bg-base-100 rounded-box w-52 p-2 shadow">
                <li>
                  <span className="text-primary text-xl">
                    {user.displayName || "Guest"}
                  </span>
                </li>
                <li>
                  <NavLink
                    className="text-primary text-xl"
                    to="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                    }}
                    className="text-green-500 text-xl"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login/">
            <button className="btn btn-primary bg-primary px-2 md:px-5">
              Login
            </button>
          </Link>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
