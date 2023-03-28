import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import React from "react";

import { AuthProvider } from "./context/auth.context";
import { ProtectedRoute } from "./context/ProtectedRoute.context";
import { publicRouters } from "./router";
import useAuth from "./context/useAuth.context";
import RequestLogin from "./components/UI/Modal/RequestLogin";

export default function App() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  return (
    <AuthProvider userData={user}>
      <Routes>
        {publicRouters.map((item, index) => {
          const Page = item?.component;
          if (item.path.includes("/host")) {
            if (!user || !user.token || user.token === "") {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<RequestLogin />}
                />
              );
            }
            return (
              <Route key={item.path} path={item.path} element={<Page />} />
            );
          } else
            return (
              <Route key={item.path} path={item.path} element={<Page />} />
            );
        })}
      </Routes>
    </AuthProvider>
  );
}
