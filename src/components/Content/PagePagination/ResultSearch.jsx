import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const IMG = styled.img`
  width: 100%;
  height: 220px;
  box-sizing: border-box;
  border-radius: 20px 20px 0 0;
  border: none;
`;

const Name = styled.p`
  margin: 0;
  padding-left: 10px;
  font-weight: 500;
  line-height: 40px;
`;

const linkStyle = {
    width: "220px",
    height: "280px",
    margin: "5px 0",
    boxSizing: "border-box",
    borderRadius: "20px",
    border: "1px solid #ccc",
    textDecoration: "none",
    color: "#000",
};

const DivWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
`;

function arrUpperCase(data) {
    const demo = data?.replace(/^(.)(.*)$/, function (match, p1, p2) {
        return p1.toUpperCase() + p2;
    });
    return demo;
}

const ResultSearch = (props) => {
    console.log(props.resultKolFlter);
    return (
        <DivWrap key={"ResultSearch"}>
            {props.resultKolFlter?.map((kol) => {
                const firstName = arrUpperCase(kol.user.firstName);
                return (
                    <Link key={kol.id} to={`/kols/${kol.id}`} style={linkStyle}>
                        <IMG src={kol?.user.avatar} alt="" />
                        <div style={{ display: "flex" }}>
                            <Name>{firstName}</Name>
                            <Name>{kol.user.lastName}</Name>
                        </div>
                    </Link>
                );
            })}
        </DivWrap>
    )
}

export default ResultSearch