import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SideBar from "../../components/SideBar/index";
import Header from '../../components/Header';
import PageField from './PageField/PageField';
import { Pagination } from 'antd';

import './Fields.css'

const Fields = () => {

    let { id } = useParams()
    id = id.substring(1)

    const [currentKol, setCurrentKol] = useState(1);
    const [totalKol, setTotalKol] = useState(30);

    const onChangeCurrentKol = (page) => {
        console.log(page);
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
                <h2>fields</h2>
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