import React from 'react'
import Button from '../../../assets/style/UI/Button/Button'

const RegisterKOL = (props) => {

    const onClickBackHandler = () => {
        props.changeFormHandler(0)
    }
    return (
        <div>
            <Button onClick={onClickBackHandler}>quay lai</Button>
        </div>
    )
}

export default RegisterKOL