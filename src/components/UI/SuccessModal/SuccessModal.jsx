import React from 'react'
import { Modal } from 'antd';

const SuccessModal = (props) => {

    const success = () => {
        Modal.success({
            content: (
                <div>
                    <p>Register success</p>
                    <p>Please go to {props.emal} for email verification</p>
                </div>
            ),
        });
    };

    if (props.noti) {
        success();
    }

    return (
        <>

        </>
    )
}

export default SuccessModal