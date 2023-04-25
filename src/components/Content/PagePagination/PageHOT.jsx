import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getKols } from '../../../services/getApi';
import { UserOutlined } from '@ant-design/icons'

const IMG = styled.img`
    width: 220px;
    height: 220px;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
`

const Name = styled.p`
    margin: 0;
    padding-left: 10px;
    font-weight: 500;
    line-height: 40px;
`

const linkStyle = {
    width: '220px',
    height: '280px',
    margin: '5px 0',
    boxSizing: 'border-box',
    borderRadius: '20px',
    border: '1px solid #ccc',
    textDecoration: 'none',
    color: '#000'
}

const DivWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
`

const PageHOT = (props) => {

    const [listKolHot, setListKolHot] = useState([])

    useLayoutEffect(() => {
        props.onChangeTotalHotKOL(listKolHot.length);
    }, [listKolHot])

    useEffect(() => {
        const identifier = setTimeout(() => {
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
        }, 500)
        return () => {
            clearTimeout(identifier)
        }

    }, [])

    function arrUpperCase(data) {
        const demo = data.replace(/^(.)(.*)$/, function (match, p1, p2) {
            return p1.toUpperCase() + p2;
        })
        return demo;
    };

    return (
        <DivWrap key={'hotKol'}>
            {listKolHot?.map((item) => {
                const firstName = arrUpperCase(item.firstName)
                return (
                    <Link key={item.kolId} to={`/detail/kol/:${item.kolId}`} style={linkStyle}>
                        <IMG src={item?.avata} alt="" />
                        <div style={{ display: 'flex' }}>
                            <Name>{firstName}</Name>
                            <Name>{item.lastName}</Name>
                        </div>
                    </Link>
                )
            })}
        </DivWrap>
    )
}

export default PageHOT