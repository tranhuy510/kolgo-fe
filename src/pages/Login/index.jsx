import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import authApi from '../../api/auth'
import useAuth from '../../context/useAuth.context'
// import axios from "axios";

import ErrorModal from '../../components/UI/ErrorModal/ErrorModal'
import logo from '../../assets/logo/logo_KOLgo-removebg.svg'
import ButtonFull from '../../components/UI/Button/ButtonFull'
// import { users } from '../../json/db'
import './style.css'

const Login = props => {
    const navigate = useNavigate();
    const [dataInput, setdataInput] = useState({
        userInput: "",
        password: "",
    });
    const [error, setError] = useState();
    const setUser = useAuth();

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
            let response = await authApi(dataInput)
            console.log(response);
            if (response.data && response.data.success === false) {
                return setError({
                    title: "Error Login",
                    message: response.data.msg,
                });
            }
            return setProfile(response)
        } catch (err) {
            console.log(err);
            if (err.response) {
                return setError({
                    title: "Error",
                    message: err.response.data.msg,
                });
            }
            return setError({
                title: "Error",
                message: "There has been an error"
            });
        }
    };

    const setProfile = (response) => {
        let user = { ...response.data.user };
        user.token = response.data.token;
        user = JSON.stringify(user);
        setUser(user);
        localStorage.setItem("user", user);
        return Navigate("/");
    };

    const errorHandler = () => {
        setError(null);
    };

    // const checkUserName = (data) => {
    //     const check = users.filter((user) => {
    //         return user.userInput === data;
    //     })
    //     if (check.length > 0) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    // const checkPassword = (data) => {
    //     const check = users.filter((user) => {
    //         return user.password === data;
    //     })
    //     if (check.length > 0) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    // const checkLogin = (userInput, password) => {
    //     const data = users.filter((user) => {
    //         if (user.useruserInputname === userInput) {
    //             if (user.password === password) {
    //                 window.location.replace('http://localhost:3000/');
    //                 return user;
    //             }
    //             else {
    //                 alert("Mat khau khong dung")
    //             }
    //         }
    //     })
    //     localStorage.setItem("account", JSON.stringify(data))
    // }


    // const componentDidmount = (event) => {
    //     event.preventDefault();
    //     const headers = {
    //         'Authorization': "Bearer" + accessToken,
    //     };
    //     // const headers = {
    //     //     'Authorization': 'Bearer my-token',
    //     //     'My-Custom-Header': 'foobar'
    //     // };
    //     axios.post('https://reqres.in/api/articles', dataInput, { headers })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 console.log(response);
    //             }
    //             else {
    //                 console.log("loi")
    //             }
    //         })
    //         .catch(error => {
    //             console.log('error', error)
    //         });
    // }

    // const submitFormHandler = (event) => {
    //     event.preventDefault();
    //     if (!dataInput.userInput) {
    //         alert("ten dang nhap trong")
    //         return;
    //     }
    //     if (!dataInput.password) {
    //         alert("chua nhap mat khau")
    //         return;
    //     }
    //     if (!checkUserName(dataInput.userInput)) {
    //         alert("Khong co ten hoac gmail nguoi dung")
    //     }
    //     if (!checkPassword(dataInput.password)) {
    //         alert("Mat khau khong dung")
    //     }
    //     checkLogin(dataInput.userInput, dataInput.password)
    // };

    const forgotPasswordHandler = () => {
        navigate('./forgotpassword')
    }

    const comeRegisterHandler = () => {
        window.location.replace('http://localhost:3000/register');
    }

    return (
        <div>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <div className="login">
                <div className="login__logo">
                    <img className='logo' src={logo} alt="" />
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
                            placeholder='User name'
                        ></input>
                    </div>
                    <div className="login-form__control">
                        <input
                            className="input-login"
                            type="password"
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
                    <button onClick={comeRegisterHandler} className="register-line">You do not have an account, register?</button>
                </div>
            </div>
        </div>

    )
}

export default Login;