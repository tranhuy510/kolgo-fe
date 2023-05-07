import React, { useState, useEffect } from "react";

import HomeChienDich from "./ChienDich/HomeChienDich";
import SubMenu from "./SubMenu";
import SubTab from "./SubTab";
import CampaignContext from "../../context/campaign.context";
import { getEnts, getKols } from "../../services/getApi";

import classes from "./Campaign.module.css";
import "./index.css";
import { Row, Col } from "antd";



const Campaign = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState({})
  const [idRole, setIdRole] = useState('')
  const [kols, setKols] = useState([])
  const [ents, setEnts] = useState([])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (user) {
        if (user.role === "KOL") {
          getKols()
            .then(res => {
              return res.json()
            })
            .then(data => {
              setKols(data)
            })
        }
        if (user.role === "ENTERPRISE") {
          getEnts()
            .then(res => {
              return res.json()
            })
            .then(data => {
              setEnts(data)
            })
        }
      }
    }, 500)
    return () => {
      clearTimeout(identifier)
    }
  }, [user])

  useEffect(() => {
    const identifier = setTimeout(() => {
      getIdRole();
    }, 1000)
    return () => {
      clearTimeout(identifier)
    }
  }, [kols, ents])

  const getIdRole = () => {
    if (user.role === 'KOL') {
      kols.map((item) => {
        if (item.userId === user.id) {
          setIdRole(item.kolId)
        }
      })
    }
    if (user.role === 'ENTERPRISE') {
      ents.map((item) => {
        if (item.userId === user.id) {
          setIdRole(item.enterpriseId)
        }
      })
    }
  }

  const onChangeTabHandler = (data) => {
    setActiveTab(data);
  };

  return (
    <CampaignContext.Provider value={{ user: user, idRole: idRole }}>
      <div className={classes.campaign}>
        {/* auth: Chan */}
        {/* <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Chiến Dịch
          </button>
          <button
            className={`tab-button ${activeTab === 2 ? "active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Combo
          </button>
        </div>
        {activeTab === 1 && (
          <div>
            <HomeChienDich />
          </div>
        )}
        {activeTab === 2 && <div>Content 2</div>} */}

        {/* auth: Thang */}
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
