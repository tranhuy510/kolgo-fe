import React from 'react'
import { Descriptions } from 'antd';

const InformationKOL = ({ email, phoneNumber, gender, city }) => {
    const user = localStorage.getItem('user')

    return (
        <Descriptions title="Thông tin KOL" contentStyle={{ fontSize: '16px' }} labelStyle={{ fontSize: '16px' }} >
            <Descriptions.Item label="Giới tính" span={1}>{gender}</Descriptions.Item>
            <Descriptions.Item label="Khu vực" span={2}>{city}</Descriptions.Item>
            {user && <Descriptions.Item label="Số điện thoại" span={3}> {phoneNumber}</Descriptions.Item>}
            {user && <Descriptions.Item label="Email" span={3}>{email}</Descriptions.Item>}
        </Descriptions>
    )
}

export default InformationKOL