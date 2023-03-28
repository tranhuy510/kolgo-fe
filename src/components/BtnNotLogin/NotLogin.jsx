import React from 'react'
import Button from '../UI/Button/Button'
import ButtonRadius from '../UI/Button/ButtonRadius'


const NotLogin = (props) => {
    return (
        <div>
            <ButtonRadius onClick={props.loginHandler}>
                Dang nhap
            </ButtonRadius>
            <ButtonRadius onClick={props.registerHandler}>
                Dang ky
            </ButtonRadius>
        </div>

    )
}

export default NotLogin