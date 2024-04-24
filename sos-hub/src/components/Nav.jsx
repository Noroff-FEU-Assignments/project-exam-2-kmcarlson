import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="hidden md:flex space-x-4">
      <Link to="/" className="hover:text-pink-200">
        Home
      </Link>
      <Link to="/about" className="hover:text-pink-200">
        About
      </Link>
      <Link to="/contact" className="hover:text-pink-200">
        Contact
      </Link>
    </nav>
  );
};

export default Nav;
