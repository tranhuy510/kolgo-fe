import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #F0564A;
  color: white;
  background: #F0564A;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  width: 154px;
  margin : 10px;

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

export default Button;



