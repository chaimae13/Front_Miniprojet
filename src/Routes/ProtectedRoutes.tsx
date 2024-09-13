import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Props = { children: React.ReactNode };

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp! * 1000 < Date.now(); 
  } catch (error) {
    return true; 
  }
};

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { token, logout } = useAuth();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired(token)) {
        logout(); 
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 5000);
    return () => clearInterval(intervalId); 
  }, [token, logout]);

  return token && !isTokenExpired(token) ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
