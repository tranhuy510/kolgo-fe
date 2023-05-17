import React from "react";
import { useState } from "react";
import styled from "styled-components";

import ScrollAuto from "../Banner/ScrollAuto";
import PageHot from "./PagePagination/PageHOT";
import PageOutStanding from "./PagePagination/PageOutstandingKOL";
import ModalSearch from "./PagePagination/ModalSearch";

import classes from './content.module.css';
import { Pagination } from "antd";

const Title = styled.h2`
  color: #f0564a;
`;

const Content = () => {
  const [currentHotKOL, setCurrentHotKOL] = useState(1);
  const [totalHotKOL, setTotalHotKOL] = useState(10);

  const [currentOutstandingKOL, setCurrentOutstandingKOL] = useState(1);
  const [totalOutstandingKOL, setTotalOutstandingKOL] = useState(10);

  const onChangeHotKOL = (page) => {
    console.log(page);
    setCurrentHotKOL(page);
  };

  const onChangeTotalHotKOL = (total) => {
    setTotalHotKOL(total);
  };

  const onChangeOutstandingKOL = (page) => {
    console.log(page);
    setCurrentOutstandingKOL(page);
  };

  const onChangeTotalOutstandingKOL = (total) => {
    setTotalOutstandingKOL(total);
  };

  return (
    <div className={classes["content"]}>
      <div className={classes["content-top"]}>
        <ScrollAuto />
      </div>
      <div className={classes["content-middle"]}>
        <div className={classes["content-page"]}>
          <ModalSearch />
        </div>
        <Title>Hot KOL</Title>
        <div className={classes["content-page"]}>
          <PageHot
            current={currentHotKOL}
            onChangeTotalHotKOL={onChangeTotalHotKOL}
          />
        </div>
        <div className={classes["content-pagination"]}>
          <Pagination
            current={currentHotKOL}
            onChange={onChangeHotKOL}
            total={totalHotKOL}
          />
        </div>
      </div>
      <div className={classes["content-bottom"]}>
        <Title>Outstanding KOL</Title>
        <div className={classes["content-page"]}>
          <PageOutStanding
            current={currentOutstandingKOL}
            onChangeTotalOutstandingKOL={onChangeTotalOutstandingKOL}
          />
        </div>
        <div className={classes["content-pagination"]}>
          <Pagination
            current={currentOutstandingKOL}
            onChange={onChangeOutstandingKOL}
            total={totalOutstandingKOL}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
