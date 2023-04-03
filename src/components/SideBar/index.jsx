import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import './sidebar.css'

const SideBar = () => {

    const listsIcon = [MenuFoldOutlined,
        MenuUnfoldOutlined,
        UploadOutlined,
        UserOutlined,
        VideoCameraOutlined];
    const items = [{
        key: 1,
        title: "cong viec 1",
        icon: <MenuFoldOutlined />,
    }, {
        key: 2,
        title: "cong viec 1",
        icon: <MenuUnfoldOutlined />,
    }, {
        key: 3,
        title: "cong viec 1",
        icon: <UploadOutlined />,
    }, {
        key: 4,
        title: "cong viec 1",
        icon: <UserOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    },
    {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    },
    {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    }, {
        key: 5,
        title: "cong viec 1",
        icon: <VideoCameraOutlined />,
    },
    {
        key: 1,
        title: "cong viec 1",
        icon: <MenuFoldOutlined />,
    }, {
        key: 1,
        title: "cong viec 1",
        icon: <MenuFoldOutlined />,
    }, {
        key: 1,
        title: "cong viec 1",
        icon: <MenuFoldOutlined />,
    },
    {
        key: 3,
        title: "cong viec 1",
        icon: <UploadOutlined />,
    },
    {
        key: 3,
        title: "cong viec 1",
        icon: <UploadOutlined />,
    },]

    return (
        <div className="sidebar">
            <div className='item-sidebar' >
                {
                    items.map((item) => {
                        return (
                            <a href="#" className="box-item" key={item.key}>
                                {item.icon}
                                <p className="">{item.title}</p>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideBar;