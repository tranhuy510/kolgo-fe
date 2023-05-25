import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFields } from "../../../services/getApi";
import { getEnts, getEnt } from "../../../services/EnterpriseService";
import classes from "./PageEntDetail.module.css";
import InformationHeader from "./InformationHeader/InformationHeader";
import Introduce from "./Introduce/Introduce";
import Activity from "./Activity/Activity";
import Campaign from "./Campaign/Campaign";
import Header from "../../../components/Header";

import { Col, Row } from "antd";
import Footer from "../../../components/Footer/Footer";

const PageEntDetail = () => {
  const [infoEnt, setInfoEnt] = useState();
  const [campaigns, setCampaigns] = useState();
  const [show, setShow] = useState(0);
  const navigate = useNavigate();

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    getEnt(id).then((res) => {
      setInfoEnt(res.enterprise);
      setCampaigns(res.campaigns);
    });
  }, [id]);

  useEffect(() => {
    document.title = `KOLgo | ${infoEnt?.firstName} ${infoEnt?.lastName}`;

    return () => {
      document.title = "KOLgo";
    };
  }, [infoEnt?.id]);

  const onClickShowHandler = (index) => {
    setShow(index);
  };

  return (
    <>
      <Header />
      <div className={classes["main-detail-enterprise"]}>
        <Row className={classes["detail-enterprise-row-1-header"]}>
          <Col span={16}>
            <InformationHeader
              infoEnt={infoEnt}
              onClickShowHandler={onClickShowHandler}
            ></InformationHeader>
          </Col>
        </Row>
        <Row className={classes["detail-enterprise-row-2-middle"]}>
          <Col span={16} className={classes["row-2-col-1"]}>
            {show == 0 && <Introduce infoEnt={infoEnt} />}
            {show == 1 && <Activity />}
            {show == 2 && <Campaign campaigns={campaigns} />}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default PageEntDetail;
