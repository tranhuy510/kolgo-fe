import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getFieldsId, getKols } from '../../../services/getApi';

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

const PageField = (props) => {

    const [listField, setListField] = useState([])

    useLayoutEffect(() => {
        props.onChangeTotalKol(listField.length);
    }, [listField])

    useEffect(() => {
        getFieldsId(props.id)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res)
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setListField(data)
            })
    }, [props.id])


    function arrUpperCase(data) {
        const demo = data.replace(/^(.)(.*)$/, function (match, p1, p2) {
            return p1.toUpperCase() + p2;
        })
        return demo;
    };

    return (
        <DivWrap key={'fieldPage'} className='page-field'>
            {listField?.map((item) => {
                const firstName = arrUpperCase(item.firstName)
                return (
                    <Link key={item.kolId} to={`/detail/:${item.kolId}`} style={linkStyle}>
                        <IMG src={item?.ava} />
                        <div style={{ display: 'flex' }}>
                            <Name>{firstName}</Name>
                            <Name>{item.lastName}</Name>
                        </div>
                    </Link>
                )
            })}
        </DivWrap >
    )
}

export default PageField