import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const RequestLogin = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const onOkHandler = () => {
        window.location.replace('http://localhost:3000/login')
        setIsModalOpen(false);
    };

    const onCancelHandler = () => {
        setIsModalOpen(false);
        return;
    };

    return (
        <>
            <Modal title="Requires login" open={isModalOpen} onOk={onOkHandler} onCancel={onCancelHandler}>
                <p>Please login to continue</p>
            </Modal>
        </>
    );
};

export default RequestLogin;