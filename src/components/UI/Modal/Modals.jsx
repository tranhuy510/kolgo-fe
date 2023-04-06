import React, { useEffect } from 'react'
import { Modal } from 'antd';

const Modals = ({ status, title, email, message, changeNotification }) => {

    const success = () => {
        Modal.success({
            title: `Register ${title}`,
            content: (
                <div>
                    <p>Please go to {email} for email verification</p>
                </div>
            ),
        });
    };

    const warning = () => {
        Modal.warning({
            title: title,
            content: message,
        });
    };

    const error = () => {
        Modal.error({
            title: title,
            content: message,
        });
    };


    useEffect(() => {
        if (status) {
            if (title === 'success') {
                success();
                changeNotification()
            }
            if (title === 'warning') {
                warning();
                changeNotification()
            }
            if (title === 'error') {
                error();
                changeNotification()
            }
        }
    }, [title])

    return (
        <>
        </>
    )
}

export default Modals