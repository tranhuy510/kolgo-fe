import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import HomeDetail from "../pages/Details/HomeDetails";
import VerifyRegister from "../pages/VerifyRegister/VerifyRegister";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import Chat from "../pages/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "campaign",
        element: <Campaign />,
      },
      { path: "/detail", element: <HomeDetail /> },
      { path: "/chat", element: <Chat /> },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot_password", element: <ForgotPassword /> },
  { path: "/detail", element: <HomeDetail /> },
  {
    path: "/verify_account",
    element: <VerifyRegister />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
]);

export const privateRouters = [];
