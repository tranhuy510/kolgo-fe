import React from 'react'
import { LeftOutlined, LeftCircleOutlined } from '@ant-design/icons'
import styled from "styled-components";

const Button = styled.button`
  font: inherit;
  border: none;
  color: black;
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin : 10px 20px;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #fff;
    border-color: #F0564A;
    color: #F0564A;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;

const ButtonBack = (props) => {
    return (
        <Button onClick={props.onClickBackHandler}>
            <LeftOutlined style={{ width: '20px !important', height: '20px !important' }} />
        </Button>
    )
}

export default ButtonBack