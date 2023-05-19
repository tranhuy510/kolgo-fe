import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getKols } from "../../../services/KolService";
import classes from '../content.module.css'

const IMG = styled.img`
  width: 100%;
  height: 220px;
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
  border: none;
`;

const Name = styled.p`
  margin: 0;
  padding: 0 10px;
  font-weight: 500;
  line-height: 40px;
`;

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

  useLayoutEffect(() => {
    changeRender()
  }, [props.current]);

  function arrUpperCase(data) {
    const demo = data.replace(/^(.)(.*)$/, function (match, p1, p2) {
      return p1.toUpperCase() + p2;
    });
    return demo;
  }

  const changeRender = () => {
    return listKolHot?.slice((props.current - 1) * 10, (((props.current - 1) * 10) + 10));
  }

  return (
    <DivWrap key={"outstandingKol"}>
      {changeRender()?.map((kol) => {
        const firstName = arrUpperCase(kol.firstName);
        return (
          <Link key={kol.id} to={`/kols/${kol.id}`} className={classes["link-kol-detail"]}>
            <IMG src={`http://localhost:8080/api/images/images/${kol?.avatar}`} />
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
