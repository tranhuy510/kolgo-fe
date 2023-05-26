import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { getKols } from "../../../services/KolService";
import classes from '../content.module.css'

const IMG = styled.img`
  width: 100%;
  height: 220px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
`;

const Name = styled.p`
  margin: 0;
  padding-right: 10px;
  font-weight: 500;
  line-height: 30px;
  box-sizing: border-box;
`;

const DivWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
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
          <div key={kol?.id} className={classes["item-kol-detail"]}>
            <IMG src={`http://localhost:8080/api/images/${kol?.avatar}`} />
            <div className={classes['kol-detail']}>
              <div className={classes['kol-name']}>
                <Name>{firstName}</Name>
                <Name>{kol.lastName}</Name>
              </div>
              <div className={classes['kol-info']} >
                <Name>{firstName} {kol.lastName}</Name>
                <p>{kol.postPrice} / Bài viết</p>
                <p>{kol.videoPrice} / Video</p>
                <div className={classes['wrap-kol-link']}>
                  <Link to={`/kols/${kol.id}`} className={classes['kol-link']}>Xem thêm</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </DivWrap>
  );
};

export default PageHOT;
