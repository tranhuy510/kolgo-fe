import React, { useState } from 'react'
import { updatePassword } from '../../services/authentication'

import { Input, message } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import ButtonFull from '../../components/UI/Button/ButtonFull';
import Modals from "../../components/UI/Modal/Modals";
import logo from "../../assets/logo/logo_KOLgo-removebg.svg";

const UpdatePassword = () => {
    const [input, setInput] = useState({
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

    const demo = {
        newPassword: '123456789',
        confirmPassword: '123456789'
    }

    const createSuccessNoti = (message) => {
        setNoti({ status: true, title: 'success', message: message })
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
        setInput((prevState) => {
            console.log(event.target.name, event.target.value);
            console.log(input);
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const changePassword = (token, data) => {
        updatePassword(token, data)
            .then(res => {
                console.log(res.json());
                if (!res.ok) {
                    return Promise.reject(res)
                }
                else return res.json()
            })
            .then(data => {
                console.log(data);
                createSuccessNoti(data.message)
            })
            .catch(err => {
                console.log(err)
                createErrorNoti(err.message)
            });
    }

    const confirmHandler = (event) => {
        if (event) {
            event.preventDefault();
        }

        changePassword(window.location.search, input);
    }

    return (
        <div>
            {noti.status &&
                <Modals status={noti.status} title={noti.title} email={noti.email} message={noti.message} content={noti.content} changeNotification={changeNotificationHandler} />
            }
            <div className="forgot-pass" style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff' }}>

                <div className="forgot-password__logo">
                    <img className="logo" src={logo} alt="" />
                </div>
                <div className="register-form__control" >
                    <h1 style={{ margin: '0 auto' }}>Change password</h1>
                </div>
                <form onSubmit={confirmHandler} className="login-form">
                    <div className="register-form__control">
                        <Input.Password
                            name="newPassword "
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
                        <ButtonFull type="submit">Confirm</ButtonFull>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default UpdatePassword