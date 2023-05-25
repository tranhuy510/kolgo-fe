import React, { useEffect } from 'react'
import { Modal } from 'antd';

const Modals = ({ status, title, email, message, content, changeNotification }) => {

    const success = () => {
        Modal.success({
            title: `${title}`,
            content: (
                <div>
                    <p>{content}</p>
                    {email && <p>Hãy đi đến {email} {message}</p>}
                </div>
            ),
        });
    };

    const warning = () => {
        Modal.warning({
            title: title,
            content: (
                <div>
                    <p>{content}</p>
                    <p>{message}</p>
                </div>
            ),
        });
    };

    const error = () => {
        Modal.error({
            title: title,
            content: (
                <div>
                    <p>{content}</p>
                    <p>{message}</p>
                </div>
            ),
        });
    };

    useEffect(() => {
        const identifier = setTimeout(() => {
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
        }, 500)
        return () => {
            clearTimeout(identifier)
        }
    }, [])

    return (
        <>
        </>
    )
}

export default Modals