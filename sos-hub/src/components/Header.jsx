import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-pink-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className={`mr-4 hover:text-pink-200 ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <h3 className="uppercase">sos hub</h3>
          </Link>
          <Nav />
        </div>
        <div className="flex space-x-4">
          {accessToken ? (
            <Link to="/" className="hover:text-pink-200" onClick={handleLogout}>
              Logg ut
            </Link>
          ) : (
            <Link
              to="/login"
              className={`hover:text-pink-200 ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              Logg inn
            </Link>
          )}
          {accessToken ? (
            <Link
              to="/account"
              className={`hover:text-pink-200 ${
                location.pathname === "/account" ? "active" : ""
              }`}
            >
              Min Profil
            </Link>
          ) : (
            <Link
              to="/register"
              className={`hover:text-pink-200 ${
                location.pathname === "/register" ? "active" : ""
              }`}
            >
              Registrer deg
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
