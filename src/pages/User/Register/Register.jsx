import React, { useState } from 'react'
import ButtonFull from '../../../assets/style/UI/Button/ButtonFull'
import RegisterEnterprise from '../../Enterprise/Register/RegisterEnterprise'
import RegisterKOL from '../../KOL/Register/RegisterKOL'

const Register = () => {
    const [typeForm, setTypeForm] = useState(0)

    // const enterpriseRegisterHandler = () => {
    //     setTypeForm(1)
    // }

    // const kolRegisterHandler = () => {
    //     setTypeForm(2)
    // }

    const changeFormHandler = (value) => {
        setTypeForm(value)
    }

    return (
        <div className='register'>
            {typeForm == 0 &&
                <div className='register-form'>
                    <div className='register__top'>
                        <h1>Chào bạn,</h1>
                        <p>Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!</p>
                    </div>
                    <div className='register__bottom'>
                        <div className='bottom-enterprise'>
                            <img src="" alt="" />
                            <ButtonFull onClick={() => { changeFormHandler(1) }}>Enterprise</ButtonFull>
                        </div>
                        <div className='bottom-kol'>
                            <img src="" alt="" />
                            <ButtonFull onClick={() => { changeFormHandler(2) }}>KOL</ButtonFull>
                        </div>
                    </div>
                </div>
            }
            {typeForm == 1 && <RegisterEnterprise changeFormHandler={changeFormHandler} />}
            {typeForm == 2 && <RegisterKOL changeFormHandler={changeFormHandler} />}

        </div>
    )
}

export default Register