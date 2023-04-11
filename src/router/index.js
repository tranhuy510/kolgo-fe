import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import HomeDetail from "../pages/Details/HomeDetails";
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
      {
        path: "kols",
        children: [{ path: "detail", element: <HomeDetail /> }],
      },
      { path: "chat", element: <Chat /> },
      {
        path: "setting",
        element: <Profile />,
        children: [{ path: "profile" }],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/chat", element: <Chat /> },
]);

export const privateRouters = [];
