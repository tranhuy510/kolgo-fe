import { Navigate } from "react-router-dom";
import React from "react";
import NotAdmin from "../pages/NotFound/NotAdmin";

export function isAuthenticatedRoute(Component, name) {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const WrappedComponent = (props) => <Component {...props} />;
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  if (name === "admin") {
    if (user.role === "ADMIN") {
      return <WrappedComponent />;
    } else return <NotAdmin />;
  }
  return <WrappedComponent />;
}
