import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from "styled-components";

import { getKols } from '../../../services/authentication';

const IMG = styled.img`
    width: 220px;
    height: 220px;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
`

const Name = styled.p`
    margin: 0;
    padding: 0 10px;
    font-weight: 500;
    line-height: 40px;
`

const CardKOL = styled.div`
    width: 220px;
    height: 280px;
    margin: 5px 0;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #ccc
`

const DivWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
`

const PageOutstandingKOL = (props) => {

    const [listKolHot, setListKolHot] = useState([])

    useLayoutEffect(() => {
        props.onChangeTotalHotKOL(listKolHot.length);
    }, [listKolHot])

    useEffect(() => {
        getKols()
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res)
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setListKolHot(data)
            })
    }, [])

    const onComeKolDetail = () => {
        window.location.replace('http://localhost:3000/detail')
    }


    return (
        <DivWrap>
            {listKolHot?.map((item) => {
                return (
                    <CardKOL key={item.id} onClick={onComeKolDetail}>
                        <IMG src={item?.ava} alt="" />
                        <div style={{ display: 'flex' }}>
                            <Name>{item.firstName}</Name>
                            <Name>{item.lastName}</Name>
                        </div>
                    </CardKOL>
                )
            })}
        </DivWrap>
    )
}

export default PageOutstandingKOL