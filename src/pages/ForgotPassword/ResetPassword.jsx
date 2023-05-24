import React, { useState } from 'react'
import { resetPassword } from '../../services/authentication'
import { useNavigate } from "react-router-dom";
import { refreshToken } from '../../services/authentication';
import { Link } from "react-router-dom";

import { Input, message } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import ButtonFull from '../../components/UI/Button/ButtonFull';
import Modals from "../../components/UI/Modal/Modals";
import logo from "../../assets/logo/logo_KOLgo-removebg.svg";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [noti, setNoti] = useState({
        status: false,
        title: '',
        email: '',
        message: '',
        content: ''
    });

    const createSuccessNoti = (message) => {
        setNoti({ status: true, title: 'success', message: message })
    }

    const createWarningNoti = (message) => {
        setNoti({ status: true, title: 'warning', message: message, })
    }

    const createErrorNoti = (message, content) => {
        setNoti({ status: true, title: 'error', message: message, content: content })
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

    const validateUserInput = (userInput) => {
        let res = true;
        let errMsg = '';
        if (!userInput.newPassword) {
            errMsg = 'Please enter New Password';
        }
        else if (userInput.newPassword.length > 32 || userInput.newPassword.length < 6) {
            errMsg = 'Password size must be between 6 and 36';
        }
        else if (!userInput.confirmPassword) {
            errMsg = 'Please enter Confirm Password';
        }
        else if (userInput.newPassword !== userInput.confirmPassword) {
            errMsg = 'Password does not match';
        }
        if (errMsg) {
            createWarningNoti(errMsg)
            res = false;
        }
        return res;
    }

    const checkRefreshToken = () => {
        refreshToken()
            .then(res => {
                if (res.status !== 200) {
                    navigate("../forgot_password");
                }
            })
            .then(data => console.log(data))
    }

    const changePassword = (token, data) => {
        resetPassword(token, data)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.message === 'Token expired') {
                    createWarningNoti('Your email has expired, please resend email to continue')
                    checkRefreshToken()
                }
                else {
                    createSuccessNoti(data.message)
                    setTimeout(() => {
                        navigate("../login");
                    }, 1000)
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    const confirmHandler = (event) => {
        if (event) {
            event.preventDefault();
        }
        validateUserInput(userInput)
        if (validateUserInput(userInput)) {
            changePassword(window.location.search, { newPassword: userInput.newPassword, confirmPassword: userInput.confirmPassword });
        }
    }

    return (
        <div>
            {noti.status &&
                <Modals status={noti.status} title={noti.title} email={noti.email} message={noti.message} content={noti.content} changeNotification={changeNotificationHandler} />
            }
            <div className="forgot-pass" style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff' }}>

                <div className="forgot-password__logo" style={{ display: 'flex', justifyContent: 'space-around', textDecorationLine: 'underline' }}>
                    <Link to={`../`} >
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="register-form__control" >
                    <h1 style={{ margin: '0 auto' }}>Thay đổi mật khẩu</h1>
                </div>
                <form onSubmit={confirmHandler} className="login-form">
                    <div className="register-form__control">
                        <Input.Password
                            name="newPassword"
                            onChange={inputChangeHandler}
                            placeholder="Enter your password"
                            className='input-register'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div className="register-form__control">
                        <Input.Password
                            name="confirmPassword"
                            onChange={inputChangeHandler}
                            placeholder="Re-enter your password"
                            className='input-register'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div className="register-form__control">
                        <ButtonFull type="submit">Xác nhận</ButtonFull>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default ResetPassword