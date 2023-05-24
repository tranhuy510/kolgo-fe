import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const DivWrap = styled.p`
    text-align: center;
    padding: 5px 10px;
    color: #fff;
    background-color: #F0564A;
    border: 1px solid #F0564A;
    border-radius: 10px;
    margin : 0 10px;

    &:hover {
        color: #000;
        background-color: #fff;
        cursor: pointer;
    }
`

const ListFields = ({ fieldNames, fieldIds }) => {

    return (
        <div className='modal-fields-list'>
            {fieldIds?.map((field, index) => {
                return <Link to={`/field/${field}`}>
                    <DivWrap>{fieldNames[index]}</DivWrap>
                </Link>
            })}

        </div>
    )
}

export default ListFields