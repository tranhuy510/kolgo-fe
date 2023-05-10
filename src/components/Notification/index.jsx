import { BellOutlined } from "@ant-design/icons";

import classes from "./Notification.module.css";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import NotiItem from "./NotiItem";
import { useContext } from "react";
import { MessageContext } from "../../context/Message.context";

export default function Notification() {
  const { notifications } = useContext(MessageContext);
  const [notiActive, setNotiActive] = useState(false);
  const [tab, setTab] = useState(true);

  useEffect(() => {
    console.log(notifications);
  }, [notifications])

  const handlerActive = () => {
    setNotiActive(!notiActive);
  };
  const changeTab = () => {
    setTab(!tab);
  };
  return (
    <div
      className={`${classes["noti-button"]} ${notiActive ? classes["active"] : ""
        }`}
      onClick={handlerActive}
    >
      <BellOutlined className={classes["icon-noti"]} />
      {!notiActive && <span className={classes["noti-badge"]}></span>}
      {notiActive && (
        <div className={classes["noti-list"]}>
          <h4>Thông báo</h4>
          <Row>
            <Col offset={2}></Col>
            <Col
              span={8}
              className={`${classes["noti-tab"]} ${tab && classes["active"]}`}
              onClick={changeTab}
            >
              Tất cả
            </Col>
            <Col offset={4}></Col>
            <Col
              span={8}
              className={`${classes["noti-tab"]} ${!tab && classes["active"]}`}
              onClick={changeTab}
            >
              Chưa đọc
            </Col>
          </Row>
          {notifications?.length === 0 && (
            <p className={classes["noti-mgs"]}>Không có thông báo</p>
          )}
          <ul>
            {notifications?.length > 0 && notifications.map((noti) => (
              <NotiItem noti={noti} key={noti?.id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
