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
        const identifier = setTimeout(() => {
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
        }, 500)
        return () => {
            clearTimeout(identifier)
        }

    }, [])

    // lấy chuỗi trong ()
    function cutString(data) {
        var pattern = /\((.*?)\)/; // Biểu thức chính quy để tìm chuỗi trong ngoặc "()" và lấy nội dung bên trong
        var ketQua = data.match(pattern);
        if (ketQua && ketQua.length > 1) {
            return ketQua[1];
        }
    }

    // lấy chuỗi ngoài ()
    const regex = /(.*)\s\((.*)\)/;

    return (
        <div className="sidebar">
            <div className='item-sidebar' >
                <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px' }}>Lĩnh vực</p>
                {
                    listFields?.map((field) => {
                        // const name = cutString(field.name)
                        const name = field.name.match(regex)[1]
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