import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
 );
 const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem("userData")) || {});

 const saveAccessToken = (token, userData) => {
    setAccessToken(token);
    setUserData(userData);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
 };

 useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
 }, []);

 return (
    <AuthContext.Provider value={{ accessToken, userData, saveAccessToken }}>
      {children}
    </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
