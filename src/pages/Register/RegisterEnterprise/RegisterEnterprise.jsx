import React, { useState } from 'react'

import Button from '../../../components/UI/Button/Button'
import ButtonFull from '../../../components/UI/Button/ButtonFull';
import Message from '../../../components/UI/Message/Message';
import ButtonBack from '../../../components/UI/Button/ButtonBack';

import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import logo from '../../../assets/logo/logo_KOLgo-removebg.svg'


const RegisterEnterprise = (props) => {
    const [dataInput, setdataInput] = useState({
        username: "",
        password: "",
        confirmationpassword: "",
        nameenterprise: "",
        field: "",
        corporateheadquarters: ""
    });
    const [check, setCheck] = useState({
        status: false,
        type: '',
        content: '',
    })

    const changeMessage = () => {
        setCheck({
            status: false,
            type: '',
            content: '',
        })
    }

    const onClickBackHandler = () => {
        props.changeFormHandler(0)
    }

    const inputChangeHandler = (event) => {
        setdataInput((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const submitFormHandler = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (!dataInput.username) {
            setCheck({
                status: true,
                type: 'error',
                content: `Username can't be empty`,
            })
            return;
        }
        if (dataInput.username.length < 8) {
            setCheck({
                status: true,
                type: 'error',
                content: 'Username must be more than 8 characters',
            })
            return;
        }
        if (!dataInput.password) {
            setCheck({
                status: true,
                type: 'error',
                content: `Password can't be empty`,
            })
            return;
        }
        if (!dataInput.confirmationpassword) {
            setCheck({
                status: true,
                type: 'error',
                content: `Confirmation password can't be empty`,
            })
            return;
        }
        if (dataInput.password !== dataInput.confirmationpassword) {
            setCheck({
                status: true,
                type: 'error',
                content: 'Password and confirmation password must not be different',
            })
            return;
        }
    }

    return (
        <div>
            <Message status={check.status} type={check.type} content={check.content} changeMessage={changeMessage} />
            <ButtonBack onClickBackHandler={onClickBackHandler}>Come back</ButtonBack>
            <div className="register__logo">
                <img className='logo' src={logo} alt="" />
            </div>
            <form onSubmit={submitFormHandler} className="register-form">
                <div className='form-top'>
                    <h1 style={{ textAlign: 'center' }}>Login information</h1>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="username"
                            onChange={inputChangeHandler}
                            placeholder='User name'
                            className='input-register'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <Input.Password
                            name="password"
                            onChange={inputChangeHandler}
                            placeholder="input password"
                            className='input-register'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <div className="register-form__control">
                        <Input.Password
                            name="confirmationpassword"
                            onChange={inputChangeHandler}
                            placeholder="input confirmation password"
                            className='input-register'
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                </div>
                <div className='form-middle'>
                    <h1 style={{ textAlign: 'center' }}>Business information</h1>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="nameenterprise"
                            onChange={inputChangeHandler}
                            placeholder='Name enterprise'
                            className='input-register'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="field"
                            onChange={inputChangeHandler}
                            placeholder='Field'
                            className='input-register'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="corporateheadquarters"
                            onChange={inputChangeHandler}
                            placeholder='Corporate headquarters'
                            className='input-register'
                        ></input>
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