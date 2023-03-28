import { Route } from "react-router-dom";

import RequestLogin from "../components/UI/Modal/RequestLogin";
import useAuth from "./useAuth.context";

const ProtectedRoute = ({ key, path, element }) => {
  let { user } = useAuth();

  if (!user || !user.token || user.token === "") {
    // component thong bao yeu cau dang nhap
    return <RequestLogin />;
  }

  return <Route key={key} path={path} element={element} />;
};

export default ProtectedRoute;
