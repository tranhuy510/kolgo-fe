import React, { useState } from 'react'
import ButtonFull from '../../components/UI/Button/ButtonFull'
import RegisterEnterprise from './RegisterEnterprise/RegisterEnterprise'
import RegisterKOL from './RegisterKOL/RegisterKOL'

import './style.css'
import enterprise from "../../assets/images/doanhnghiep.png";
import kol from "../../assets/images/KOL.png"

const Register = () => {
    const [typeForm, setTypeForm] = useState(0)

    const changeFormHandler = (value) => {
        setTypeForm(value)
    }

    const comeLoginHandler = () => {
        window.location.replace('http://localhost:3000/login');
    }

    return (
        <div className='register'>
            {typeForm == 0 &&
                <div className='register-form'>
                    <div className='register__top'>
                        <h1>Chào bạn,</h1>
                        <p>Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!</p>
                    </div>
                    <div className='register__middle'>Để tối ưu tốt nhất cho trải nghiệm của bạn với KOLgo, vui lòng lựa chọn nhóm phù hợp nhất với bạn.</div>
                    <div className='register__bottom'>
                        <div className='item-bottom enterprise'>
                            <img src={enterprise} className='img' />
                            <ButtonFull onClick={() => { changeFormHandler(1) }}>Enterprise</ButtonFull>
                        </div>
                        <div className='item-bottom kol'>
                            <img src={kol} className='img' />
                            <ButtonFull onClick={() => { changeFormHandler(2) }}>KOL</ButtonFull>
                        </div>
                    </div>
                    <div className='come-login'>
                        <button className='btn-come-login' onClick={comeLoginHandler}>Login</button>
                    </div>
                </div>
            }
            {typeForm == 1 && <RegisterEnterprise changeFormHandler={changeFormHandler} />}
            {typeForm == 2 && <RegisterKOL changeFormHandler={changeFormHandler} />}
        </div>
    )
}

export default Register