import React from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import authApi from "../../api/auth";
import useAuth from "../../context/useAuth.context";

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
    userInput: "",
    password: "",
  });
  const [error, setError] = useState();
  const [check, setCheck] = useState({
    status: false,
    type: "",
    content: "",
  });
  // const setUser = useAuth();

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
    if (!dataInput.userInput) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name (non-empty name)",
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
    let accessToken = response.data.token.access_token;
    accessToken = JSON.stringify(accessToken);
    localStorage.setItem("accessToken", accessToken);

    let refreshToken = response.data.token.refresh_token;
    refreshToken = JSON.stringify(refreshToken);
    localStorage.setItem("refreshToken", refreshToken);

    let user = {
      id: response.data.id,
      email: response.data.email,
      username: response.data.username,
    };
    user = JSON.stringify(user);
    localStorage.setItem("user", user);

    setCheck({
      status: true,
      type: "success",
      content: `Login success`,
    });

    return navigate("..");
  };

  const errorHandler = () => {
    setError(null);
  };

  const forgotPasswordHandler = () => {
    navigate("../forgotpassword");
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
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="login-form__control">
          <h1 className="tittle-login">Log in to KOLgo</h1>
        </div>
        <form onSubmit={loginHandler} className="login-form">
          <div className="login-form__control">
            <input
              className="input-login"
              type="text"
              name="userInput"
              onChange={inputChangeHandler}
              placeholder="User name"
            ></input>
          </div>
          <div className="login-form__control">
            <input
              className="input-login"
              type="password"
              name="password"
              onChange={inputChangeHandler}
              placeholder="Password"
            ></input>
          </div>
          <div className="login-form__control">
            <label className="forgot-password" onClick={forgotPasswordHandler}>
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
