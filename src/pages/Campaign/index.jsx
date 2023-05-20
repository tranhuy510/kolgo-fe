import React, { useState, useEffect } from "react";

import SubMenu from "./SubMenu";
import SubTab from "./SubTab";
import CampaignContext from "../../context/campaign.context";
import Header from '../../components/Header/index'
import { getEnts, getKols } from "../../services/getApi";

import classes from "./Campaign.module.css";
import { Row, Col } from "antd";

const Campaign = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState({})
  const [idRole, setIdRole] = useState(null)
  const [kols, setKols] = useState([])
  const [ents, setEnts] = useState([])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  useEffect(() => {
    document.title = 'KOLgo | Chiến dịch';

    const originalTitle = document.title
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        document.title = 'Go back'
      }
      else document.title = `${originalTitle}`
    })

    return () => {
      document.title = 'KOLgo';
    };
  }, []);

  useEffect(() => {
    if (user.role === "KOL") {
      getKols().then(res => { return res.json() }).then(data => { setKols(data) })
    }
    if (user.role === "ENTERPRISE") {
      getEnts().then(res => { return res.json() }).then(data => { setEnts(data) })
    }
  }, [user])

  useEffect(() => {
    getIdRole();
  }, [kols, ents])

  const getIdRole = () => {
    if (user.role === 'KOL') {
      kols.map((kol) => {
        if (kol.id === user.id) {
          setIdRole(kol.id)
        }
      })
    }
    if (user.role === 'ENTERPRISE') {
      ents.map((ent) => {
        if (ent.id === user.id) {
          setIdRole(ent.id)
        }
      })
    }
  }

  const onChangeTabHandler = (data) => {
    setActiveTab(data);
  };

  return (
    <CampaignContext.Provider value={{ user: user, idRole: idRole }}>
      <Header />
      <div className={classes.campaign}>
        <Row className={classes['campaign-row-1']}>
          <Col span={6} className={classes['campaign-col-6-left']}>
            <SubMenu
              onChangeTabHandler={onChangeTabHandler}
            />
          </Col>
          <Col span={18} className={classes['campaign-col-18-right']}>
            <SubTab changeContent={activeTab} />
          </Col>
        </Row>
      </div>
    </CampaignContext.Provider >
  );
};

export default Campaign;
