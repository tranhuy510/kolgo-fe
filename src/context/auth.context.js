import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ userData, children }) => {
  let [user, setUser] = useState(userData);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser({ ...JSON.parse(localStorage.getItem("user")) });
      console.log("rerender");
      console.log(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
