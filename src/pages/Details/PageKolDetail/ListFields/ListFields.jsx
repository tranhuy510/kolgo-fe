import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const DivWrap = styled.div`
    text-align: center;
    padding: 5px 10px;
    color: #fff;
    background-color: #F0564A;
    border: 1px solid #F0564A;
    border-radius: 10px;

    &:hover {
        color: #000;
        background-color: #fff;
        cursor: pointer;
    }
`

const ListFields = ({ fields }) => {

    const capitalizeName = (name) => {
        const regex = /(.*)\s\((.*)\)/;
        return name.match(regex)[1];
    }

    return (
        <div style={{ fontSize: '18px', lineHeight: '36px', fontWeight: '400' }}>
            {fields?.length > 0 && fields?.map(field => (
                <Link to={`/kols?fieldIds=${field?.id}`}>
                    <DivWrap>
                        {capitalizeName(field?.name)}
                    </DivWrap>
                </Link>
            ))}
        </div>
    )
}

export default ListFields