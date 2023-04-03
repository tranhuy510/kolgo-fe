import React from 'react'
import { useState } from 'react';
import styled from "styled-components";


import ScrollAuto from '../Banner/ScrollAuto'
import PageHot from './PagePagination/PageHOT'
import PageOutStanding from './PagePagination/PageOutstandingKOL'

import './content.css'
import { Pagination } from 'antd';

const Title = styled.h2`
    color: #F0564A;
`

const Content = () => {
    const [currentHotKOL, setCurrentHotKOL] = useState(1);
    const [currentOutstandingKOL, setCurrentOutstandingKOL] = useState(1);
    const [totalHotKOL, setTotalHotKOL] = useState(30);
    const [totalOutstandingKOL, setTotalOutstandingKOL] = useState(30);



    const onChangeHotKOL = (page) => {
        console.log(page);
        setCurrentHotKOL(page);
    };

    const onChangeOutstandingKOL = (page) => {
        console.log(page);
        setCurrentOutstandingKOL(page);
    };

    return (
        <div className='content'>
            <div className='content-top'>
                <ScrollAuto />
            </div>
            <div className='content-middle'>
                <Title>Hot KOL</Title>
                <div className='content-page'>
                    <PageHot current={currentHotKOL} />
                </div>
                <div className='content-pagination'>
                    <Pagination current={currentHotKOL} onChange={onChangeHotKOL} total={totalHotKOL} />
                </div>
            </div>
            <div className='content-bottom'>
                <Title>Outstanding KOL</Title>
                <div className='content-page'>
                    <PageOutStanding current={currentOutstandingKOL} />
                </div>
                <div className='content-pagination'>
                    <Pagination current={currentOutstandingKOL} onChange={onChangeOutstandingKOL} total={totalOutstandingKOL} />
                </div>
            </div>
        </div>
    )
}

export default Content