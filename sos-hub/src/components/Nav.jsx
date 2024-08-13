import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col md:flex-row space-x-4 md:space-x-8">
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
        className={`md:flex md:items-center ${
          isOpen ? "block" : "hidden"
        } space-y-2 md:space-y-0 md:space-x-8`}
      >
        <Link
          to="/about"
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/contact" ? "active" : ""
          }`}
        >
          Contact
        </Link>
        <Link
          to="/profiles"
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/profiles" ? "active" : ""
          }`}
        >
          Profiles
        </Link>
        <Link
          to="/posts"
          className={`block md:inline-block hover:text-pink-200 ${
            location.pathname === "/posts" ? "active" : ""
          }`}
        >
          posts
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
