import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Account from "./components/Account";
import Profiles from "./pages/Profiles";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Home from "./components/Home"; 

function App() {
 return (
    <AuthProvider>
      <BrowserRouter>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/About" element={<About />} />
            <Route path="/profile/:name" element={<Profile />} /> 
          </Routes>
          <Footer />
        </>
      </BrowserRouter>
    </AuthProvider>
 );
}

export default App;
