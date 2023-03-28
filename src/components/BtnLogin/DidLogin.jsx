import React from 'react'
import Button from '../UI/Button/Button'
import ButtonRadius from '../UI/Button/ButtonRadius'


const DidLogin = (props) => {
    return (
        <div>
            <ButtonRadius onClick={props.logOutHandler}>
                Dang xuat
            </ButtonRadius>
        </div>
    )
}

export default DidLogin;