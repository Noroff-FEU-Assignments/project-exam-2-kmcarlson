import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const saveAccessToken = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, saveAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
