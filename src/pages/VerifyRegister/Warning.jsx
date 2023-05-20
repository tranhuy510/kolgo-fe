import React from 'react'
import { Result } from 'antd';

const Warning = () => {
    return (
        <Result
            status="warning"
            title="Đường dẫn này đã được sử dụng hoặc hến hạn sử dụng."
            extra={[]}
        />
    )
}

export default Warning