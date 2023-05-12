import { RouterProvider } from "react-router-dom";
import React from "react";

import { AuthProvider } from "./context/auth.context";
import { router } from "./router";
import { MessageProvider } from "./context/Message.context";

export default function App() {

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <AuthProvider userData={user} >
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </AuthProvider>
  );
}
