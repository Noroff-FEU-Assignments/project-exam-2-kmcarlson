import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Profil from "./components/Profil";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
          <Footer />
        </>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
