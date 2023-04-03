import React, { useState } from 'react'

import Button from '../../../components/UI/Button/Button'
import ButtonFull from '../../../components/UI/Button/ButtonFull';
import Message from '../../../components/UI/Message/Message';
import ButtonBack from '../../../components/UI/Button/ButtonBack';
import ErrorModal from '../../../components/UI/ErrorModal/ErrorModal'

import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import logo from '../../../assets/logo/logo_KOLgo-removebg.svg'
import { register } from '../../../services/authentication';

const RegisterEnterprise = (props) => {
    const [userInput, setUserInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmationpassword: "",
        biz: true
    });
    const [check, setCheck] = useState({
        status: false,
        type: '',
        content: '',
    })
    const [error, setError] = useState();

    const changeMessage = (status, type, content) => {
        setCheck({
            status: status,
            type: type,
            content: content,
        })
    }
    const createErrorMessage = (msg) => {
        changeMessage(true, 'error', msg)
    }

    const createSuccessMessage = (msg) => {
        changeMessage(true, 'success', msg)
    }

    const onClickBackHandler = () => {
        props.changeFormHandler(0)
    }

    const inputChangeHandler = (event) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const errorHandler = () => {
        setError(null);
    };

    const validateUserInput = (userInput) => {
        let res = true;
        let errMsg = '';
        if (!userInput.firstName) {
            errMsg = 'Please enter your first name';
        }
        else if (!userInput.lastName) {
            errMsg = 'Please enter your last name';
        }
        else if (!userInput.email) {
            errMsg = 'Please enter your email';
        }
        else if (userInput.email.indexOf('@') < 0) {
            errMsg = 'Wrong email format';
        }
        else if (!userInput.password) {
            errMsg = 'Please enter your password';
        }
        else if (!userInput.confirmationpassword) {
            errMsg = 'Please confirm your password';
        }
        else if (userInput.password !== userInput.confirmationpassword) {
            errMsg = 'Password does not match';
        }
        if (errMsg) {
            createErrorMessage(errMsg)
            res = false;
        }
        return res;
    }

    const registerWithCredentials = (credentials) => {
        register(credentials)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res)
                }
                return res.json();
            })
            .then(data => {
                createSuccessMessage(data.message)
                // window.location.replace(`${process.env.REACT_APP_PUBLIC_URL}/login`);
                // handle message cho user biet la email da duoc gui
            }).catch(err => {
                err.json().then(e => createErrorMessage(e.message))
            });
    }

    const handleRegister = (event) => {
        if (event) {
            event.preventDefault();
        }
        validateUserInput(userInput)
        registerWithCredentials(userInput)
    }

    return (
        <div>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={setError(null)}
                />
            )}
            <Message status={check.status} type={check.type} content={check.content} changeMessage={changeMessage} />
            <ButtonBack onClickBackHandler={onClickBackHandler}>Come back</ButtonBack>
            <div className="register__logo">
                <img className='logo' src={logo} alt="" />
            </div>
            <form onSubmit={handleRegister} className="register-form">
                <div className='form-top'>
                    <h1 style={{ textAlign: 'center' }}>Enterprise register information</h1>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="firstName"
                            onChange={inputChangeHandler}
                            placeholder='Enter your first name'
                            className='input-register'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="lastName"
                            onChange={inputChangeHandler}
                            placeholder='Enter your last name'
                            className='input-register'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="email"
                            onChange={inputChangeHandler}
                            placeholder='Enter your email'
                            className='input-register'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <Input.Password
                            name="password"
                            onChange={inputChangeHandler}
                            placeholder="Enter your password"
                            className='input-register'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div className="register-form__control">
                        <Input.Password
                            name="confirmationpassword"
                            onChange={inputChangeHandler}
                            placeholder="Confirm your password"
                            className='input-register'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                </div>
                <div className='form-bottom'>
                    <div className="register-form__control">
                        <ButtonFull type="submit">Register</ButtonFull>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterEnterprise