import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

import logo from '../../assets/logo/logo_KOLgo-removebg.svg'
import ButtonFull from '../../assets/style/UI/Button/ButtonFull'
import { users } from '../../json/db'
import './style.css'

const Login = props => {
    const navigate = useNavigate();
    // const [users, setUsers] = useState([])
    const [dataInput, setdataInput] = useState({
        username: "",
        password: "",
    });

    const inputChangeHandler = (event) => {
        setdataInput((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const checkUserName = (data) => {
        const check = users.filter((user) => {
            return user.username === data;
        })
        if (check.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const checkPassword = (data) => {
        const check = users.filter((user) => {
            return user.password === data;
        })
        if (check.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const checkLogin = (username, password) => {
        const data = users.filter((user) => {
            if (user.username === username) {
                if (user.password === password) {
                    window.location.replace('http://localhost:3000/');
                    return user;
                }
                else {
                    alert("Mat khau khong dung")
                }
            }
        })
        localStorage.setItem("account", JSON.stringify(data))
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        if (!dataInput.username) {
            alert("ten dang nhap trong")
            return;
        }
        if (!dataInput.password) {
            alert("chua nhap mat khau")
            return;
        }
        if (!checkUserName(dataInput.username)) {
            alert("Khong co ten hoac gmail nguoi dung")
        }
        if (!checkPassword(dataInput.password)) {
            alert("Mat khau khong dung")
        }
        // if (checkUserName(dataInput.username) && checkPassword(dataInput.password)) {
        //     const data = users.filter((user) => {
        //         return user.username === dataInput.username;
        //     })
        //     localStorage.setItem("account", JSON.stringify(data))
        //     window.location.replace('http://localhost:3000/');
        // }
        checkLogin(dataInput.username, dataInput.password)
    };

    const forgotPasswordHandler = () => {
        navigate('./forgotpassword')
    }

    const comeRegisterHandler = () => {
        window.location.replace('http://localhost:3000/register');
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img className='logo' src={logo} alt="" />
            </div>
            <form onSubmit={submitFormHandler} className="login-form">
                <div className="login-form__control">
                    <input
                        type="text"
                        name="username"
                        onChange={inputChangeHandler}
                        placeholder='User name'
                    ></input>
                </div>
                <div className="login-form__control">
                    <input
                        type="text"
                        name="password"
                        onChange={inputChangeHandler}
                        placeholder='Password'
                    ></input>
                </div>
                <div className="login-form__control">
                    <label className="forgot-password" onClick={forgotPasswordHandler}>Fogot password?</label>
                </div>
                <div className="login-form__control">
                    <ButtonFull type="submit">Log in</ButtonFull>
                </div>
            </form>
            <div className="login-form__control">
                <button onClick={comeRegisterHandler} className="register-line">Register</button>
            </div>
        </div>
    )
}

export default Login;