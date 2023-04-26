import { RouterProvider } from "react-router-dom";
import React from "react";

import { AuthProvider } from "./context/auth.context";
import { router } from "./router";

export default function App() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  return (
    <AuthProvider userData={user}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
