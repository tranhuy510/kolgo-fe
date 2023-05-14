import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getKols } from "../../../services/KolService";

const IMG = styled.img`
  width: 100%;
  height: 220px;
  box-sizing: border-box;
  border-radius: 20px 20px 0 0;
  border: none;
`;

const Name = styled.p`
  margin: 0;
  padding: 0 10px;
  font-weight: 500;
  line-height: 40px;
`;

const CardKOL = styled.div`
  width: 220px;
  height: 280px;
  margin: 5px 0;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #ccc;
`;
const linkStyle = {
  width: '240px',
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
`;

const PageOutstandingKOL = (props) => {
  const [listKolHot, setListKolHot] = useState([]);

  useLayoutEffect(() => {
    props.onChangeTotalOutstandingKOL(listKolHot.length);
  }, [listKolHot]);

  useEffect(() => {
    getKols().then((res) => setListKolHot(res));
  }, []);

  function arrUpperCase(data) {
    const demo = data.replace(/^(.)(.*)$/, function (match, p1, p2) {
      return p1.toUpperCase() + p2;
    });
    return demo;
  }

  return (
    <DivWrap key={"outstandingKol"}>
      {listKolHot?.map((kol) => {
        const firstName = arrUpperCase(kol.firstName);
        return (
          <Link key={kol.id} to={`/kols/${kol.id}`} style={linkStyle}>
            <IMG src={kol?.avatar} alt="" />
            <div style={{ display: "flex" }}>
              <Name>{firstName}</Name>
              <Name>{kol.lastName}</Name>
            </div>
          </Link>
        );
      })}
    </DivWrap>
  );
};

export default PageOutstandingKOL;
