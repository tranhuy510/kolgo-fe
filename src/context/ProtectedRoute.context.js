import { Navigate } from "react-router-dom";
import React from "react";
import NotAdmin from "../pages/NotFound/NotAdmin";

export function isAuthenticatedRoute(Component, name) {
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const WrappedComponent = (props) => <Component {...props} />;
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  if (name === "admin") {
    if (user?.role === "ADMN") {
      return <WrappedComponent />;
    } else return <NotAdmin />;
  }
  return <WrappedComponent />;
}
