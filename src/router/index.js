import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import PageKolDetail from "../pages/Details/PageKolDetail/PageKolDetail";
import VerifyRegister from "../pages/VerifyRegister/VerifyRegister";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import Chat from "../pages/Chat/Chat";
import Fields from "../pages/Fields/Fields";
import NotFound from "../pages/NotFound/NotFound";
import PageEntDetail from "../pages/Details/PageEntDetail/PageEntDetail";
import PaymentResult from "../pages/Payment/PaymentResult";

import { isAuthenticatedRoute } from "../context/ProtectedRoute.context";

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
        path: "/detail/kol/:id",
        element: <PageKolDetail />,
      },
      {
        path: "/detail/enterprise/:id",
        element: isAuthenticatedRoute(PageEntDetail, "entDetail"),
      },
      {
        path: "/fields/kol/:id",
        element: <Fields />,
      },
      {
        path: "profile",
        element: isAuthenticatedRoute(Profile, "profile"),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot_password", element: <ForgotPassword /> },
  {
    path: "/verify_account",
    element: <VerifyRegister />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/chat",
    element: isAuthenticatedRoute(Chat, "chat"),
  },
  {
    path: "/admin",
    element: isAuthenticatedRoute(Chat, "admin"),
  },
  {
    path: "/vnpay/return",
    element: <PaymentResult />
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const privateRouters = [];
