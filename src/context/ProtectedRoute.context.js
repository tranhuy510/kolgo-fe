import { Navigate } from "react-router-dom";
import React from "react";
import NotAdmin from "../pages/NotFound/NotAdmin";

export function isAuthenticatedRoute(Component) {
  const user = JSON.parse(localStorage.getItem("user"));

  const WrappedComponent = (props) => <Component {...props} />;
  if (!user) {
    return <Navigate to="/login" />;
  } else return <WrappedComponent />;
}

export function isAuthenticatedAdmin(Component) {
  const user = JSON.parse(localStorage.getItem("user"));

  const WrappedComponent = (props) => <Component {...props} />;
  if (user?.role === "ADMIN") {
    return <WrappedComponent />;
  } else return <NotAdmin />;
}
