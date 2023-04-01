import React from 'react'

import DidLogin from '../BtnLogin/DidLogin';

import { UserOutlined, ToolOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


const NavBar = (props) => {

    const items = [
        {
            label: <a style={{ fontSize: '20px' }} href="https://www.antgroup.com"><PlusCircleOutlined /> Load money</a>,
            key: '0',
        },
        {
            label: <a style={{ fontSize: '20px' }} href="/profile"><UserOutlined /> Your profile</a>,
            key: '1',
        },
        {
            label: <a style={{ fontSize: '20px' }} href="https://www.aliyun.com"><ToolOutlined /> Setting account</a>,
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: <DidLogin logOutHandler={props.logOutHandler} />,
            key: '4',
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {props.children}
                </Space>
            </a>
        </Dropdown>
    )
}

export default NavBar
