import React from 'react'
import { Descriptions } from 'antd';

const InformationKOL = ({ email, phoneNumber, gender, city }) => {
    const user = localStorage.getItem('user')

    return (
        <Descriptions title="Thông tin KOL" contentStyle={{ fontSize: '20px' }} labelStyle={{ fontSize: '20px' }} style={{ fontSize: '100px' }}>
            <Descriptions.Item label="Giới tính">{gender}</Descriptions.Item>
            <Descriptions.Item label="Khu vực">{city}</Descriptions.Item>
            {user && <Descriptions.Item label="Số điện thoại"> {phoneNumber}</Descriptions.Item>}
            {user && <Descriptions.Item label="Email">{email}</Descriptions.Item>}
        </Descriptions>
    )
}

export default InformationKOL