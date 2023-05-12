import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SideBar from "../../components/SideBar/index";
import Header from '../../components/Header';
import PageField from './PageField/PageField';
import { Pagination } from 'antd';

import './Fields.css'
import {  getKolsByFieldIds } from '../../services/KolService';

const Fields = () => {

    let { id } = useParams()
    // console.log(id);

    const [currentKol, setCurrentKol] = useState(1);
    const [totalKol, setTotalKol] = useState(30);
    const [field, setField] = useState();

    useEffect(() => {
        getKolsByFieldIds(id)
            .then(res => {
                setField(res)
                // console.log(res);
            })
    }, [id])

    const onChangeCurrentKol = (page) => {
        setCurrentKol(page);
    };

    const onChangeTotalKol = (total) => {
        setTotalKol(total)
    }

    return (
        <div>
            <Header />
            <SideBar />
            <div className='fields'>
                <h2>Lĩnh vực {field?.name}</h2>
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