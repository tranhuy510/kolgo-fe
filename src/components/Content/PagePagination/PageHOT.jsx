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

const PageHOT = (props) => {
  const [hotKols, setHotKols] = useState([]);

  useLayoutEffect(() => {
    props.onChangeTotalHotKOL(hotKols.length);
  }, [hotKols]);

  useEffect(() => {
    getKols().then((res) => {
      setHotKols(res)
    });
  }, []);

  useLayoutEffect(() => {
    changeRender()
  }, [props.current]);

  function arrUpperCase(data) {
    const demo = data?.replace(/^(.)(.*)$/, function (match, p1, p2) {
      return p1.toUpperCase() + p2;
    });
    return demo;
  }

  const changeRender = () => {
    return hotKols?.slice((props.current - 1) * 10, (((props.current - 1) * 10) + 10));
  }

  return (
    <DivWrap key={"hotKol"}>
      {changeRender()?.map((kol) => {
        const firstName = arrUpperCase(kol.firstName);
        return (
          <Link key={kol?.id} to={`/kols/${kol.id}`} style={linkStyle}>
            <IMG src={`http://localhost:8080/api/images/${kol?.avatar}`} />
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

export default PageHOT;
