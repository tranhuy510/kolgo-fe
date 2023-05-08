import { BellOutlined } from "@ant-design/icons";

import classes from "./Notification.module.css";
import { Col, Row } from "antd";
import { useState } from "react";
import NotiItem from "./NotiItem";

const DUMMY_NOTI = [
  {
    avatar: "like.jpg",
    name: "Doanh nghiệp A",
    action: "book",
    date: "2023-05-09",
    read: false,
  },
  {
    avatar: "tuyệt vọng chết mẹ.jpg",
    name: "Doanh nghiệp B",
    action: "campain",
    date: "2023-05-08",
    read: false,
  },
  {
    avatar: "tuyệt vọng chết mẹ.jpg",
    name: "Doanh nghiệp A",
    action: "campain",
    date: "2023-05-04",
    read: false,
  },
  {
    avatar: "tuyệt vọng chết mẹ.jpg",
    name: "Doanh nghiệp A",
    action: "campain",
    date: "2023-05-01",
    read: true,
  },
  {
    avatar: "tuyệt vọng chết mẹ.jpg",
    name: "Doanh nghiệp A",
    action: "campain",
    date: "2023-04-30",
    read: true,
  },
  {
    avatar: "tuyệt vọng chết mẹ.jpg",
    name: "Doanh nghiệp A",
    action: "campain",
    date: "2023-04-29",
    read: true,
  },
];

export default function Notification() {
  const [notiActive, setNotiActive] = useState(false);
  const [tab, setTab] = useState(true);

  const handlerActive = () => {
    setNotiActive(!notiActive);
  };
  const changeTab = () => {
    setTab(!tab);
  };
  return (
    <div
      className={`${classes["noti-button"]} ${
        notiActive ? classes["active"] : ""
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
          {!DUMMY_NOTI && (
            <p className={classes["noti-mgs"]}>Không có thông báo</p>
          )}
          <ul>
            {DUMMY_NOTI.map((item) => (
              <NotiItem item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
