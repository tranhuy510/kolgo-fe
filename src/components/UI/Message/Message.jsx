import React, { useState, memo, useEffect, useMemo } from 'react'
import { message } from 'antd';

const Message = memo(({ status, type, content, changeMessage }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: content,
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: content
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: content,
        });
    };

    useEffect(() => {
        if (status) {
            if (type === 'success') {
                success();
                changeMessage()
            }
            if (type === 'error') {
                error();
                changeMessage()
            }
            if (type === 'warning') {
                warning();
                changeMessage()
            }
        }
    }, [content])

    return (
        <>
            {contextHolder}
        </>
    );
})

export default Message
