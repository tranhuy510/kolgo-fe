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

import { isAuthenticatedRoute } from "../context/ProtectedRoute.context";
import BookingDetails from "../pages/Booking/BookingDetails";
import BookingCreate from "../pages/Booking/BookingCreate";

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
        path: "/kols/:id",
        element: <PageKolDetail />,
      },
      {
        path: "/ents/:id",
        element: isAuthenticatedRoute(PageEntDetail, "entDetail"),
      },
      {
        path: "/fields/kol/:id",
        element: <Fields />,
      },
      {
        path: "setting",
        element: <Profile />,
      },
      {
        path: "/chat",
        element: isAuthenticatedRoute(Chat, "chat"),
      },
      {
        path: "/kols/:kolId/book/",
        element: isAuthenticatedRoute(BookingCreate, "bookingCreate"),
      },
      {
        path: "/bookings/:id",
        element: isAuthenticatedRoute(BookingDetails, "bookingDetails"),
      },
      {
        path: "/vnpay/return",
        element: isAuthenticatedRoute(PaymentResult, "paymentResilt"),
      },
      {
        path: "/chat",
        element: isAuthenticatedRoute(Chat, "chat"),
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
    path: "/admin",
    element: isAuthenticatedRoute(HomeAdmin, "admin"),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const privateRouters = [];
