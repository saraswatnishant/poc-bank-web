import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserRole } from "../../utility/types";
import { UserContext } from "../../utility/UserContext";

export const AuthContext = createContext({ isAuthenticated: false });

const checkUserLoggedIn = (role: UserRole | string) => {
  return role === "Banker" || role === "Applicant";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkUserLoggedIn(role)
  );

  useEffect(() => {
    const isAuth = location.pathname === "/" ? false : checkUserLoggedIn(role);
    setIsAuthenticated(isAuth);
  }, [role, location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
