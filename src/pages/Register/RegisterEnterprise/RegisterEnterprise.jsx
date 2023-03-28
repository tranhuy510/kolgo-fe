import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import ButtonFull from '../../../components/UI/Button/ButtonFull';
import logo from '../../../assets/logo/logo_KOLgo-removebg.svg'
import './style.css'


const RegisterEnterprise = (props) => {
    const [data, setdataInput] = useState({
        username: "",
        password: "",
        reenterpassword: "",
        nameenterprise: "",
        field: "",
        corporateheadquarters: ""
    });

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

    const submitFormHandler = () => {

    }

    return (
        <div>
            <Button onClick={onClickBackHandler}>quay lai</Button>
            <div className="register__logo">
                <img className='logo' src={logo} alt="" />
            </div>
            <form onSubmit={submitFormHandler} className="register-form">
                <div className='form__top'>
                    <h1 style={{ textAlign: 'center' }}>Thông tin đăng nhập</h1>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="username"
                            onChange={inputChangeHandler}
                            placeholder='User name'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="password"
                            onChange={inputChangeHandler}
                            placeholder='Password'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="reenterpassword"
                            onChange={inputChangeHandler}
                            placeholder='Re-enter password'
                        ></input>
                    </div>
                </div>
                <div className='form-middle'>
                    <h1 style={{ textAlign: 'center' }}>Thông Tin Doanh nghiệp</h1>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="nameenterprise"
                            onChange={inputChangeHandler}
                            placeholder='Name enterprise'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="field"
                            onChange={inputChangeHandler}
                            placeholder='Field'
                        ></input>
                    </div>
                    <div className="register-form__control">
                        <input
                            type="text"
                            name="corporateheadquarters"
                            onChange={inputChangeHandler}
                            placeholder='Corporate headquarters'
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