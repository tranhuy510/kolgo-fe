import React, { useState, useEffect } from 'react'
import { getFields } from '../../services/getApi';
import { Link } from "react-router-dom";
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

    const [listFields, setListFields] = useState([])

    useEffect(() => {
        getFields()
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res)
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setListFields(data)
            })
    }, [])

    function cutString(data) {
        var pattern = /\((.*?)\)/; // Biểu thức chính quy để tìm chuỗi trong ngoặc "()" và lấy nội dung bên trong
        var ketQua = data.match(pattern);
        if (ketQua && ketQua.length > 1) {
            return ketQua[1];
        }
    }

    return (
        <div className="sidebar">
            <div className='item-sidebar' >
                <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px' }}>Field of work</p>
                {
                    listFields?.map((field) => {
                        const name = cutString(field.name)
                        return (
                            <Link to={`/fields/kol/:${field.id}`} className="box-item" key={field.id}>
                                <p className="">{name}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default SideBar;