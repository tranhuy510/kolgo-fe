import {
  BrowserRouter,
  // createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

// import RootLayout from "../pages/Root";
import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
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
import BookingDetails from "../pages/Booking/BookingDetails";

import { ProtectedRoute } from "../context/ProtectedRoute.context";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       {
//         path: "campaign",
//         element: <Campaign />,
//       },
//       {
//         path: "kols/:id",
//         element: <PageKolDetail />,
//       },
//       {
//         path: "ents/:id",
//         element: ProtectedRoute(PageEntDetail),
//       },
//       {
//         path: "field/:id",
//         element: <Fields />,
//       },
//       {
//         path: "setting",
//         element: <Profile />,
//       },
//       {
//         path: "chat",
//         element: ProtectedRoute(Chat),
//       },
//       {
//         path: "bookings/:id",
//         element: ProtectedRoute(BookingDetails),
//       },
//       {
//         path: "/vnpay/return",
//         element: ProtectedRoute(PaymentResult),
//       },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
//   { path: "/forgot_password", element: <ForgotPassword /> },
//   {
//     path: "/verify_account",
//     element: <VerifyRegister />,
//   },
//   {
//     path: "/reset_password",
//     element: <ResetPassword />,
//   },
//   // {
//   //   path: "/admin",
//   //   element: isAuthenticatedAdmin(HomeAdmin),
//   // },
//   {
//     path: "/admin",
//     element: <HomeAdmin />,
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

// export const privateRouters = [];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="kols/:id" element={<PageKolDetail />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify_account" element={<VerifyRegister />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/field/:id" element={<Fields />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="ents/:id"
          element=<ProtectedRoute Component={PageEntDetail} />
        />
        <Route
          path="/admin"
          element=<ProtectedRoute Component={HomeAdmin} role={"ADMIN"} />
        />
        <Route path="/chat" element={<ProtectedRoute Component={Chat} />} />
        <Route
          path="/setting"
          element={<ProtectedRoute Component={Profile} />}
        />
        <Route
          path="/bookings/:id"
          element={<ProtectedRoute Component={BookingDetails} />}
        />
        <Route
          path="/vnpay/return"
          element={<ProtectedRoute Component={PaymentResult} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
