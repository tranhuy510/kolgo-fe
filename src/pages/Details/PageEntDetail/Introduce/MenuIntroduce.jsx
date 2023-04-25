import React from 'react'
import { UserOutlined, MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(
        '',
        'grp',
        null,
        [
            getItem('Thông tin liên hệ cơ bản', '0'),
            getItem('Thông tin chi tiết', '1')
        ],
        'group'
    ),
]


const MenuIntroduce = (props) => {

    const onClick = (e) => {
        console.log('click ', e);
        props.onChangeContentHandler(e.key)
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: '100%',
                fontSize: '20px'
            }}
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['grp']}
            mode="inline"
            items={items}
        />
    )
}

export default MenuIntroduce