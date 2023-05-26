import React, { useState } from 'react'
import { Link } from "react-router-dom";
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

    const createSuccessNoti = (content) => {
        setNoti({ status: true, title: 'success', content: content })
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

    let demo = 0

    const forgotPasswordHandler = (event) => {
        if (event) {
            event.preventDefault();
        }

        forgotPassword(userInput)
            .then(res => {
                if (res.ok) { demo = 1 }
                else { demo = 2 }
                return res.json()
            })
            .then(data => {
                if (demo === 1) {
                    createSuccessNoti(data.message)
                }
                if (demo === 2) {
                    createErrorNoti(data.message)
                }
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
                <div className="forgot-password__logo" style={{ display: 'flex', justifyContent: 'space-around', textDecorationLine: 'underline' }}>
                    <Link to={`../`} >
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="register-form__control" >
                    <h1 style={{ margin: '0 auto' }}>Quên mật khẩu</h1>
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
                        <ButtonFull type="submit">Xác nhận</ButtonFull>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ForgotPassword