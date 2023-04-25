import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spin, Avatar } from "antd";

import DidLogin from "../BtnLogin/DidLogin";
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
  const [user, setUser] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
    }, 500)
    return () => {
      clearTimeout(identifier)
    }
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
              <Avatar size={40} src={user?.image}>
                {user?.image ? "" : user?.email.charAt(0)?.toUpperCase()}
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
    </div>
  );
};

export default Header;
