import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar } from "antd";
import NotLogin from "../BtnNotLogin/NotLogin";
import Menu from "./Menu";
import NavBar from "../Navbar/NavBar";
import SearchModal from "./Search/SearchModal";

import logo from "../../assets/logo/logo_KOLgo-removebg.svg";
import home from "../../assets/logo/icon-home.svg";
import campaign from "../../assets/logo/icon-compaign.svg";
import chat from "../../assets/logo/icon-chat.svg";
import "./style.css";

const Header = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    const handleStorageChange = () => {
      setUser({ ...JSON.parse(localStorage.getItem("user")) });
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("http://localhost:3000/");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div className="header">
      <div className="header__icon">
        <a href="/">
          <img className="icon-logo" src={logo} alt="" />
        </a>
      </div>
      <SearchModal />
      <div className="header__room">
        <Menu icons={[home, campaign, chat]} />
      </div>
      <div className="header__button">
        {user && (
          <div className="avata">
            <NavBar logOutHandler={logOutHandler}>
              <Avatar
                size={40}
                src={user?.avatar ? `http://localhost:8080/api/images/${user.avatar}` : ''}
              >
                {user?.avatar ? "" : user?.firstName.charAt(0)?.toUpperCase()}
                {/* {user?.image ? "" : user?.email.slice(0, 1).toUpperCase()} */}
              </Avatar>
            </NavBar>
          </div>
        )}
        {!user && (
          <NotLogin
            loginHandler={loginHandler}
            registerHandler={registerHandler}
          />
        )}
      </div>
    </div >
  );
};

export default Header;
