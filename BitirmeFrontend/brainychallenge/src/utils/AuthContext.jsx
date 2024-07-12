import { createContext, useState, useEffect } from "react";
import { getUserFromToken } from "./auth";

export const AuthContext = createContext();
/* eslint-disable react/prop-types */

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
         const userData = await getUserFromToken();
         setUser(userData);
      };
      fetchUser();
   }, []);

   const login = (token) => {
      localStorage.setItem("token", token);
      fetchUser();
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
   };

   const fetchUser = async () => {
      const userData = await getUserFromToken();
      setUser(userData);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
