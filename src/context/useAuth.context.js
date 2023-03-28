import React, { useContext } from "react";

const AuthContext = React.createContext(null);

const useAuth = () => useContext(AuthContext);

export default useAuth;
