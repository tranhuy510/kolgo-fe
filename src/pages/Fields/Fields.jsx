import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SideBar from "../../components/SideBar/index";
import Header from '../../components/Header';
import PageField from './PageField/PageField';
import { Pagination } from 'antd';
import { getFields } from '../../services/getApi';

import './Fields.css'

const Fields = () => {

    let { id } = useParams()
    id = id.substring(1)

    const [currentKol, setCurrentKol] = useState(1);
    const [totalKol, setTotalKol] = useState(30);
    const [fieldName, setFieldName] = useState([])

    useEffect(() => {
        getFields()
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res)
                }
                return res.json();
            })
            .then(data => {
                setFieldName(data.find((item) => {
                    return item.id == id
                }))
            })
    }, [id])

    const onChangeCurrentKol = (page) => {
        setCurrentKol(page);
    };

    const onChangeTotalKol = (total) => {
        setTotalKol(total)
    }

    const regex = /(.*)\s\((.*)\)/;
    const name = fieldName?.name?.match(regex)[1]

    return (
        <div>
            <Header />
            <SideBar />
            <div className='fields'>
                <h2>Lĩnh vực {name}</h2>
                <div className='content-page'>
                    <PageField id={id} current={currentKol} onChangeTotalKol={onChangeTotalKol} />
                </div>
                <div className='content-pagination'>
                    <Pagination current={currentKol} onChange={onChangeCurrentKol} total={totalKol} />
                </div>
            </div>

        </div>
    )
}

export default Fields