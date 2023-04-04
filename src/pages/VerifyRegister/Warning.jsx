import React from 'react'
import { Result } from 'antd';

const Warning = () => {
    return (
        <Result
            status="warning"
            title="This link has already been used or expired."
            extra={[]}
        />
    )
}

export default Warning