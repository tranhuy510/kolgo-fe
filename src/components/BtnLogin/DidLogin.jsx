import React from 'react'
import Button from '../../assets/style/UI/Button/Button'


const DidLogin = (props) => {
    return (
        <div>
            <Button onClick={props.logOutHandler}>
                Dang xuat
            </Button>
        </div>
    )
}

export default DidLogin;