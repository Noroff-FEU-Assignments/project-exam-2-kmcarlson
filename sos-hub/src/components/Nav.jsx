import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative">
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-pink-200 hover:text-pink-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-20 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      <div
        className={`fixed inset-0 z-30 flex flex-col justify-center items-center space-y-6 text-white text-l transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex md:flex-row md:space-x-8 md:translate-x-0 md:bg-transparent md:space-y-0`}
      >
        <Link
          to="/about"
          onClick={closeMenu}
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/contact"
          onClick={closeMenu}
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/contact" ? "active" : ""
          }`}
        >
          Contact
        </Link>
        <Link
          to="/profiles"
          onClick={closeMenu}
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/profiles" ? "active" : ""
          }`}
        >
          Profiles
        </Link>
        <Link
          to="/posts"
          onClick={closeMenu}
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/posts" ? "active" : ""
          }`}
        >
          Posts
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
