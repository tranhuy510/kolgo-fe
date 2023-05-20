import React from 'react'
import Button from '../UI/Button/Button'
import ButtonRadius from '../UI/Button/ButtonRadius'


const NotLogin = (props) => {
    return (
        <div>
            <ButtonRadius onClick={props.loginHandler}>
                Đăng nhập
            </ButtonRadius>
            <ButtonRadius onClick={props.registerHandler}>
                Đăng ký
            </ButtonRadius>
        </div>

    )
}

export default NotLogin