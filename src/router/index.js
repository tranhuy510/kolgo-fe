import Home from "../pages/User/Home";
import Campaign from "../pages/User/Campaign";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register/Register";
import ForgotPassword from "../pages/User/ForgotPassword/ForgotPassword";

export const publicRouters = [
  { path: "/", component: Home },
  { path: "/host/campaign", component: Campaign },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgotpassword", component: ForgotPassword },
];

export const privateRouters = [];
