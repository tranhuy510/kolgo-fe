import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/AuthService";

import { Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

// import axios from "axios";
import logo from "../../assets/logo/logo_KOLgo-removebg.svg";
import ButtonFull from "../../components/UI/Button/ButtonFull";
import Message from "../../components/UI/Message/Message";
import { AuthContext } from "../../context/auth.context";

// import { users } from '../../json/db'
import "./style.css";


const Login = (props) => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [check, setCheck] = useState({
    status: false,
    type: "",
    content: "",
  });

  useEffect(() => {
    document.title = `KOLgo | Đăng nhập`

    return () => {
      document.title = 'KOLgo';
    };
  }, [])

  const changeMessage = () => {
    setCheck({
      status: false,
      type: "",
      content: "",
    });
  };

  const inputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const loginHandler = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!userInput.email) {
      setCheck({
        status: true,
        type: "error",
        content: `Email không được để trống, hãy nhập email`,
      });
      return;
    }
    else if (userInput.email.indexOf('@') < 0 || userInput.email.indexOf('.com') < 0) {
      setCheck({
        status: true,
        type: "error",
        content: `Cấu trúc email không đúng xin hãy nhập lại, vs dụ: "abc@kolgo.com"`,
      });
      return;
    }
    else if (!userInput.password) {
      setCheck({
        status: true,
        type: "error",
        content: `Mật khẩu không được để trống, hãy nhập mật khẩu`,
      });
      return;
    }

    let response = await login(userInput);
    if (!response) {
      setCheck({
        status: true,
        type: "error",
        content: `Đăng nhập thất bại, kiểm tra lại email và mật khẩu!`,
      });
    }
    else setProfile(response);
  };

  const setProfile = (response) => {

    let accessToken = response.token.accessToken;
    accessToken = JSON.stringify(accessToken);
    localStorage.setItem("accessToken", accessToken);

    let refreshToken = response.token.refreshToken;
    refreshToken = JSON.stringify(refreshToken);
    localStorage.setItem("refreshToken", refreshToken);

    let user = {
      id: response.user.id,
      email: response.user.email,
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      avatar: response.user.avatar,
      role: response.user.role,
    };

    setUser(user)

    localStorage.setItem("user", JSON.stringify({ ...user }))
    window.dispatchEvent(new Event('storage'))

    setCheck({
      status: true,
      type: "success",
      content: `Đăng nhập thành công`,
    });

    setTimeout(() => {
      if (response.user.role === "ADMIN") {
        return navigate("../admin");
      } else return navigate("..");
    }, 500)
  };

  const forgotPasswordHandler = () => {
    navigate("../forgot_password");
  };

  const comeRegisterHandler = () => {
    navigate("../register");
  };

  return (
    <div>
      <Message
        status={check.status}
        type={check.type}
        content={check.content}
        changeMessage={changeMessage}
      />
      <div className="login">
        <div className="login__logo">
          <Link to="../">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        <div className="login-form__control">
          <h1 className="tittle-login">Đăng nhập vào KOLgo</h1>
        </div>
        <form onSubmit={loginHandler} className="login-form">
          <div className="login-form__control">
            <input
              className="input-login"
              type="text"
              name="email"
              onChange={inputChangeHandler}
              placeholder="Nhập email"
            ></input>
          </div>
          <Input.Password
            name="password"
            onChange={inputChangeHandler}
            placeholder="Nhập mật khẩu"
            className="input-login"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <div className="login-form__control">
            <label
              className="line-forgot-password"
              onClick={forgotPasswordHandler}
            >
              Quên mật khẩu?
            </label>
          </div>
          <div className="login-form__control">
            <ButtonFull type="submit">Đăng nhập</ButtonFull>
          </div>
        </form>
        <div className="login-form__control">
          <button onClick={comeRegisterHandler} className="register-line">
            Bạn chưa có tài khoản?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
