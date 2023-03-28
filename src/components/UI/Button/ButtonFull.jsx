import React from 'react'
import styled from "styled-components";

export const ButtonFull = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #F0564A;
  color: white;
  background: #F0564A;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  height: 50px;
  line-height: 34px;
  font-size: 20px;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #fff;
    border-color: #F0564A;
    color: #F0564A;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
    cursor: pointer;
  }
`;
export default ButtonFull