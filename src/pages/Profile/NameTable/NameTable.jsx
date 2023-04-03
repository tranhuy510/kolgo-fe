import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const NameTable = (props) => {

    const kytudautien = (data) => {
        return data?.slice(0, 1).toUpperCase();
    }
    return (
        <div style={{ width: '100%', display: 'flex', margin: '30px 0px', alignItems: 'center', boxSizing: 'border-box' }}>
            <Avatar size={60} src={props?.image}>{props.image ? '' : <UserOutlined />}</Avatar>
            {!props.collapsed && <h3 style={{ marginLeft: '20px' }}>{props.name}</h3>}
        </div>
    )
}

export default NameTable