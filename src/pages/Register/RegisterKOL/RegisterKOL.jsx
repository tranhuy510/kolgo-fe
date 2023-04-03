import React, { useState } from "react";

import Button from "../../../components/UI/Button/Button";
import ButtonFull from "../../../components/UI/Button/ButtonFull";
import Message from "../../../components/UI/Message/Message";
import ButtonBack from "../../../components/UI/Button/ButtonBack";
import ErrorModal from "../../../components/UI/ErrorModal/ErrorModal";

import { Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import logo from "../../../assets/logo/logo_KOLgo-removebg.svg";

const RegisterKOL = (props) => {
  const [dataInput, setdataInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmationpassword: "",
  });
  const [check, setCheck] = useState({
    status: false,
    type: "",
    content: "",
  });
  const [error, setError] = useState();

  const changeMessage = () => {
    setCheck({
      status: false,
      type: "",
      content: "",
    });
  };

  const onClickBackHandler = () => {
    props.changeFormHandler(0);
  };

  const inputChangeHandler = (event) => {
    setdataInput((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const errorHandler = () => {
    setError(null);
  };

  const submitFormHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!dataInput.username) {
      setCheck({
        status: true,
        type: "error",
        content: `Username can't be empty`,
      });
      return;
    }
    if (!dataInput.email) {
      setCheck({
        status: true,
        type: "error",
        content: `Email can't be empty`,
      });
      return;
    }
    if (dataInput.email.indexOf("@") < 0) {
      setCheck({
        status: true,
        type: "error",
        content: `Email must have '@'`,
      });
      return;
    }
    if (!dataInput.password) {
      setCheck({
        status: true,
        type: "error",
        content: `Password can't be empty`,
      });
      return;
    }
    if (!dataInput.confirmationpassword) {
      setCheck({
        status: true,
        type: "error",
        content: `Confirmation password can't be empty`,
      });
      return;
    }
    if (dataInput.password !== dataInput.confirmationpassword) {
      setCheck({
        status: true,
        type: "error",
        content: "Password and confirmation password must not be different",
      });
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json ; charset=UTF-8" },
      body: JSON.stringify({
        email: dataInput.email,
        username: dataInput.username,
        password: dataInput.password,
      }),
    };
    fetch("http://localhost:8080/api/auth/register", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          if (data.error.email) {
            setError({
              title: "Error email",
              message: data.error.email,
            });
          } else if (data.error.password) {
            setError({
              title: "Error password",
              message: data.error.password,
            });
          } else if (data.error.username) {
            setError({
              title: "Error username",
              message: data.error.username,
            });
          }
        } else {
          setCheck({
            status: true,
            type: "success",
            content: `Register success`,
          });
          window.location.replace("http://localhost:3000/login");
        }
      })
      .catch((err) => {
        console.log("Looks like there was a problem: \n", err);
        setCheck({
          status: true,
          type: "error",
          content: `Register fail`,
        });
      });
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
      <ButtonBack onClickBackHandler={onClickBackHandler}>quay lai</ButtonBack>
      <div className="register__logo">
        <img className="logo" src={logo} alt="" />
      </div>
      <form onSubmit={submitFormHandler} className="register-form">
        <div className="form__top">
          <h1 style={{ textAlign: "center" }}>KOL register information</h1>
          <div className="register-form__control">
            <input
              type="text"
              name="username"
              onChange={inputChangeHandler}
              placeholder="Input Username"
              className="input-register"
            />
            <input
              type="text"
              name="email"
              onChange={inputChangeHandler}
              placeholder="Input Email"
              className="input-register"
            ></input>
          </div>
          <div className="register-form__control">
            <Input.Password
              name="password"
              onChange={inputChangeHandler}
              placeholder="Input Password"
              className="input-register"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="register-form__control">
            <Input.Password
              name="confirmationpassword"
              onChange={inputChangeHandler}
              placeholder="Input Confirmation Password"
              className="input-register"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
        </div>
        <div className="form-bottom">
          <div className="register-form__control">
            <ButtonFull type="submit">Register</ButtonFull>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterKOL;
