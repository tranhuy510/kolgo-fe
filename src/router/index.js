import Home from "../pages/Home";
import Campaign from "../pages/Campaign";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Profile from "../pages/Profile/Profile";

export const publicRouters = [
  { path: "/", component: Home },
  { path: "/host/campaign", component: Campaign },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgotpassword", component: ForgotPassword },
  { path: "/profile", component: Profile },
];

export const privateRouters = [];
