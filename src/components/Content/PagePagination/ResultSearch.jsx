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
    width: "180px",
    height: "270px",
    margin: "5px 0",
    boxSizing: "border-box",
    borderRadius: "20px",
    border: "1px solid #ccc",
    textDecoration: "none",
    color: "#000",
    cursor: 'pointer',
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
    console.log(props.resultKolFlter.length > 0 ? "true" : "false");
    return (
        <>
            {(props.resultKolFlter && props.resultKolFlter.length > 0)
                ? <DivWrap key={"ResultSearch"}>
                    {props.resultKolFlter?.map((kol) => {
                        const firstName = arrUpperCase(kol?.firstName);
                        return (
                            <Link key={kol.id} to={`/kols/${kol.id}`} style={linkStyle}>
                                <IMG src={`http://localhost:8080/api/images/${kol?.avatar}`} />
                                <div style={{ display: "flex" }}>
                                    <Name>{firstName}</Name>
                                    <Name>{kol?.lastName}</Name>
                                </div>
                            </Link>
                        );
                    })}
                </DivWrap>
                : <>Không có kết quả tìm kiếm</>}
        </>


    )
}

export default ResultSearch