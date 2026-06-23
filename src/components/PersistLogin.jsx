import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PersistLogin = () => {
  const location = useLocation();
  const { accessToken } = useAuth();

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("access_token");
  //   if (storedToken !== accessToken) {
  //     setAccessToken(storedToken);
  //   }
  // }, [accessToken]);

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location.pathname }} />
  );
};

export default PersistLogin;
