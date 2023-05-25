import React, { useState, useEffect } from "react";

import { getKol, getKols } from "../../services/KolService";
import { getEnt, getEnts } from "../../services/EnterpriseService";
import { getFields } from "../../services/FieldService";

import SubMenu from "./SubMenu";
import SubTab from "./SubTab";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/Footer";

import CampaignContext from "../../context/campaign.context";

import classes from "./Campaign.module.css";
import { Row, Col } from "antd";

const Campaign = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const [user, setUser] = useState({});
  const [idRole, setIdRole] = useState(null);

  const [kols, setKols] = useState([]);
  const [ents, setEnts] = useState([]);
  const [fields, setFields] = useState([]);
  const [profile, setProfile] = useState({});

  const [isQuitCampaign, setIsQuitCampaign] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    getFields().then((res) => setFields(res));
  }, []);

  useEffect(() => {
    document.title = "KOLgo | Chiến dịch";

    const originalTitle = document.title;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        document.title = "Quay lại";
      } else document.title = `${originalTitle}`;
    });

    return () => {
      document.title = "KOLgo";
    };
  }, []);

  useEffect(() => {
    if (user?.role === "KOL") { getKols().then((res) => { setKols(res); }); }
    else if (user?.role === "ENTERPRISE") { getEnts().then((res) => { setEnts(res); }); }
  }, [user]);

  useEffect(() => { getIdRole(); }, [kols, ents]);

  const getIdRole = () => {
    if (user.role === "KOL") { kols?.map((kol) => { if (kol.userId === user.id) { setIdRole(kol.id); } }); }
    else if (user.role === "ENTERPRISE") { ents.map((ent) => { if (ent.userId === user.id) { setIdRole(ent.id); } }); }
  };

  useEffect(() => {
    if (user?.role === "KOL") { getKol(idRole).then(res => { setProfile(res.kol) }) }
    else if (user?.role === "ENTERPRISE") { getEnt(idRole).then(res => { setProfile(res.enterprise); }) }
  }, [idRole])

  const onChangeTabHandler = (data) => {
    setActiveTab(data);
  };

  return (
    <CampaignContext.Provider value={{ user: user, idRole: idRole, fields: fields, setIsQuitCampaign: setIsQuitCampaign, isQuitCampaign: isQuitCampaign, profile: profile }}>
      <Header />
      <div className={classes.campaign}>
        <Row className={classes["campaign-row-1"]}>
          <Col span={6} className={classes["campaign-col-6-left"]}>
            <SubMenu onChangeTabHandler={onChangeTabHandler} />
          </Col>
          <Col span={18} className={classes["campaign-col-18-right"]}>
            <SubTab changeContent={activeTab} />
          </Col>
        </Row>
      </div>
      <Footer />
    </CampaignContext.Provider>
  );
};

export default Campaign;
