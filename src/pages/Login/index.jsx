import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import authApi from "../../api/auth";

import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

// import axios from "axios";

import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import logo from "../../assets/logo/logo_KOLgo-removebg.svg";
import ButtonFull from "../../components/UI/Button/ButtonFull";
import Message from "../../components/UI/Message/Message";

// import { users } from '../../json/db'
import "./style.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [dataInput, setdataInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [check, setCheck] = useState({
    status: false,
    type: "",
    content: "",
  });

  const changeMessage = () => {
    setCheck({
      status: false,
      type: "",
      content: "",
    });
  };

  const inputChangeHandler = (event) => {
    setdataInput((prevState) => {
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
    if (!dataInput.email) {
      setError({
        title: "Invalid email",
        message: "Please enter a valid email (non-empty email)",
      });
      return;
    }
    if (!dataInput.password) {
      setError({
        title: "Invalid password",
        message: "Please enter a valid password (non-empty password)",
      });
      return;
    }
    try {
      let response = await authApi(dataInput);
      console.log(response);
      if (response.data && response.data.success === false) {
        return setError({
          title: "Error Login",
          message: response.data.msg,
        });
      }

      return setProfile(response);
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.data.message)
          return setError({
            title: "Error",
            message: err.response.data.message,
          });
      }
      return setError({
        title: "Error",
        message: err.message,
      });
    }
  };

  const setProfile = (response) => {
    console.log(response);

    let accessToken = response.data.token.accessToken;
    accessToken = JSON.stringify(accessToken);
    localStorage.setItem("accessToken", accessToken);

    let refreshToken = response.data.token.refreshToken;
    refreshToken = JSON.stringify(refreshToken);
    localStorage.setItem("refreshToken", refreshToken);

    let user = {
      id: response.data.userId,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      role: response.data.roles[0],
    };
    user = JSON.stringify(user);
    localStorage.setItem("user", user);

    setCheck({
      status: true,
      type: "success",
      content: `Login success`,
    });

    if (response.data.roles[0] === 'ADMIN') {
      return navigate("/admin");
    }
    else return navigate("..");
  };

  const errorHandler = () => {
    setError(null);
  };

  const forgotPasswordHandler = () => {
    navigate("../forgot_password");
  };

  const comeRegisterHandler = () => {
    navigate("../register");
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Message
        status={check.status}
        type={check.type}
        content={check.content}
        changeMessage={changeMessage}
      />
      <div className="login">
        <div className="login__logo">
          <Link to='../'><img className="logo" src={logo} alt="" /></Link>
        </div>
        <div className="login-form__control">
          <h1 className="tittle-login">Log in to KOLgo</h1>
        </div>
        <form onSubmit={loginHandler} className="login-form">
          <div className="login-form__control">
            <input
              className="input-login"
              type="text"
              name="email"
              onChange={inputChangeHandler}
              placeholder="Enter your email"
            ></input>
          </div>
          <Input.Password
            name="password"
            onChange={inputChangeHandler}
            placeholder="Enter your password"
            className="input-login"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <div className="login-form__control">
            <label className="line-forgot-password" onClick={forgotPasswordHandler}>
              Fogot password?
            </label>
          </div>
          <div className="login-form__control">
            <ButtonFull type="submit">Log in</ButtonFull>
          </div>
        </form>
        <div className="login-form__control">
          <button onClick={comeRegisterHandler} className="register-line">
            You do not have an account, register?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
