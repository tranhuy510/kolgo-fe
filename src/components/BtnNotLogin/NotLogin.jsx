import React from 'react'
import Button from '../UI/Button/Button'

const NotLogin = (props) => {
    return (
        <div>
            <Button onClick={props.loginHandler}>
                Dang nhap
            </Button>
            <Button onClick={props.registerHandler}>
                Dang ky
            </Button>
        </div>

    )
}

export default NotLogin