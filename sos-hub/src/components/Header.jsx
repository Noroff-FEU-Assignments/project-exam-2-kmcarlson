import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { accessToken } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <header className="bg-pink-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <h3 className="uppercase">sos hub</h3>
            {/* <img src="logo.png" alt="Logo" className="h-8" /> */}
          </div>
          <Nav />
        </div>
        <div className="flex space-x-4">
          {accessToken ? (
            <Link to="/" className="hover:text-pink-200" onClick={handleLogout}>
              Logg ut
            </Link>
          ) : (
            <Link to="/login" className="hover:text-pink-200">
              Logg inn
            </Link>
          )}
          {accessToken ? (
            <Link to="/profil" className="hover:text-pink-200">
              Min Profil
            </Link>
          ) : (
            <Link to="/register" className="hover:text-pink-200">
              Registrer deg
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
