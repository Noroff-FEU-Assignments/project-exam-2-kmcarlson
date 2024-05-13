import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Account from "./components/Account";
import Profiles from "./pages/Profiles";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Home from "./components/Home";
import Contact from "./pages/Contact";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <>
          <Header />
          <AppRoutes />
          <Footer />
        </>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {

    const path = location.pathname;
    let title = "The SOS hub ";
    switch (path) {
      case "/":
        title = "Home - " + title;
        break;
      case "/login":
        title = "Login - " + title;
        break;
      case "/register":
        title = "Register - " + title;
        break;
      case "/account":
        title = "Account - " + title;
        break;
      case "/profiles":
        title = "Profiles - " + title;
        break;
      case "/about":
        title = "About Us - " + title;
        break;
      case "/contact":
        title = "Contact - " + title;
        break;
      case "/posts":
        title = "Posts - " + title;
        break;
      case "/create-post":
        title = "Create Post - " + title;
        break;
      default:

        break;
    }
    document.title = title;
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/profile/:name" element={<Profile />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  );
}

export default App;
