import React, { useState, useEffect } from 'react'
import { getKolFields } from '../../services/FieldService';
import { Link } from "react-router-dom";
import './sidebar.css'

const SideBar = () => {

    const [fields, setFields] = useState([])

    useEffect(() => {
        getKolFields().then(res => {
            setFields(res)
        });
    }, [])

    return (
        <div className="sidebar">
            <div className='item-sidebar' >
                <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px' }}>Lĩnh vực</p>
                {
                    fields?.map((field) => {
                        return (
                            <Link to={`/fields/kol/${field.id}`} className="box-item" key={field.id}>
                                <p className="">{field.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default SideBar;