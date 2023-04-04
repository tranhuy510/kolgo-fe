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
                console.log(content);
            }
            if (type === 'error') {
                error();
                changeMessage()
                console.log(content);
            }
            if (type === 'warning') {
                warning();
                changeMessage()
                console.log(content);
            }
        }
    }, [content])
    // if (status) {
    //     if (type === 'success') {
    //         success();
    //         changeMessage()
    //         console.log(content);
    //     }
    //     if (type === 'error') {
    //         error();
    //         changeMessage()
    //         console.log(content);
    //     }
    //     if (type === 'warning') {
    //         warning();
    //         changeMessage()
    //         console.log(content);
    //     }
    // }

    return (
        <>
            {contextHolder}
        </>
    );
})

export default Message
