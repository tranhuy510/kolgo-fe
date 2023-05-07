import React from "react";
import {
  UserOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import classes from "./MenuProfile.module.css";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const itemKOL = [
  getItem("Thông tin cá nhân", "1", <UserOutlined />),
  getItem("Cài đặt tài khoản", "2", <SettingOutlined />, [
    getItem("Email", "sub1"),
    getItem("Tài khoản và mật khẩu", "sub2"),
  ]),
  getItem("Lịch sử hoạt động", "3", <ClockCircleOutlined />),
  getItem("Lịch sử thanh toán", "4", <HistoryOutlined />),
];

const itemEnt = [
  getItem("Thông tin cá nhân", "1", <UserOutlined />),
  getItem("Cài đặt tài khoản", "2", <SettingOutlined />, [
    getItem("Email", "sub1"),
    getItem("Tài khoản và mật khẩu", "sub2"),
  ]),
  getItem("Lịch sử thanh toán", "3", <HistoryOutlined />),
];
const MenuProfile = (props) => {
  const onClick = (e) => {
    console.log("click ", e);
    props.onChangeContentHandler(e.key);
  };

  return (
    <Menu
      className={classes.menu}
      onSelect={onClick}
      defaultSelectedKeys={"1"}
      mode="inline"
      items={props.user.role === "KOL" ? itemKOL : itemEnt}
    />
  );
};

export default MenuProfile;
