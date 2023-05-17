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
import HomeAdmin from "../pages/Admin/HomeAdmin";
import PaymentResult from "../pages/Payment/PaymentResult";

import {
  isAuthenticatedRoute,
  isAuthenticatedAdmin,
} from "../context/ProtectedRoute.context";
import BookingDetails from "../pages/Booking/BookingDetails";

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
        path: "kols/:id",
        element: <PageKolDetail />,
      },
      {
        path: "ents/:id",
        element: isAuthenticatedRoute(PageEntDetail),
      },
      {
        path: "field/:id",
        element: <Fields />,
      },
      {
        path: "setting",
        element: <Profile />,
      },
      {
        path: "chat",
        element: isAuthenticatedRoute(Chat),
      },
      {
        path: "/bookings/:id",
        element: isAuthenticatedRoute(BookingDetails),
      },
      {
        path: "/vnpay/return",
        element: isAuthenticatedRoute(PaymentResult),
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
  // {
  //   path: "/admin",
  //   element: isAuthenticatedAdmin(HomeAdmin),
  // },
  {
    path: "/admin",
    element: <HomeAdmin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const privateRouters = [];
