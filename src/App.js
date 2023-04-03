import { Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { useState } from "react";
import React from "react";

import { AuthProvider } from "./context/auth.context";
import { ProtectedRoute } from "./context/ProtectedRoute.context";
import { publicRouters, router } from "./router";
import useAuth from "./context/useAuth.context";
import RequestLogin from "./components/UI/Modal/RequestLogin";
import Login from "./pages/Login";

export default function App() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  return (
    <AuthProvider userData={user}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
