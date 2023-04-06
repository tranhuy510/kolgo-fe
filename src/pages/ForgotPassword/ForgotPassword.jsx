import React, { useState } from 'react'

import { forgotPassword } from '../../services/authentication'

import ButtonFull from '../../components/UI/Button/ButtonFull';
import Modals from "../../components/UI/Modal/Modals";
import logo from "../../assets/logo/logo_KOLgo-removebg.svg";

const ForgotPassword = () => {
    const [userInput, setUserInput] = useState({
        email: "",
    });
    const [noti, setNoti] = useState({
        status: false,
        title: '',
        email: '',
        message: '',
        content: ''
    });

    const createSuccessNoti = (email, content) => {
        setNoti({ status: true, title: 'success', email: email, message: 'to proceed to change the password', content: content })
    }

    const createWarningNoti = (msg) => {
        setNoti({ status: true, title: 'warning', message: msg })
    }

    const createErrorNoti = (msg) => {
        setNoti({ status: true, title: 'error', message: msg })
    }

    const changeNotificationHandler = () => {
        setNoti({ status: false })
    }

    const inputChangeHandler = (event) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const forgotPasswordHandler = (event) => {
        if (event) {
            event.preventDefault();
        }

        forgotPassword(userInput)
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    return Promise.reject(res)
                }
                else return res.json()
            })
            .then(data => {
                console.log(data);
                createSuccessNoti(userInput.email, data.message)
            })
            .catch(err => {
                console.log(err)
                createErrorNoti(err.message)
            });
    }

    return (
        <div>
            {noti.status &&
                <Modals status={noti.status} title={noti.title} email={noti.email} message={noti.message} content={noti.content} changeNotification={changeNotificationHandler} />
            }
            <div className="forgot-password" style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff' }}>

                <div className="forgot-password__logo">
                    <img className="logo" src={logo} alt="" />
                </div>
                <div className="register-form__control" >
                    <h1 style={{ margin: '0 auto' }}>Forgot password</h1>
                </div>
                <form onSubmit={forgotPasswordHandler} className="login-form">
                    <div className="login-form__control">
                        <input
                            className="input-login"
                            type="text"
                            name="email"
                            onChange={inputChangeHandler}
                            placeholder="Email"
                        ></input>
                    </div>
                    <div className="login-form__control">
                        <ButtonFull type="submit">Confirm</ButtonFull>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ForgotPassword