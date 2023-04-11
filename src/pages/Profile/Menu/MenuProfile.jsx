import React from "react";
import {
  UserOutlined,
  HistoryOutlined,
  SettingOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Thông tin cá nhân", "1", <UserOutlined />),
  getItem("Cài đặt tài khoản", "2", <SettingOutlined />, [
    getItem("Email", "sub1"),
    getItem("Tài khoản và mật khẩu", "sub2"),
  ]),
  getItem("Lịch sử hoạt động", "3", <ClockCircleOutlined />),
  getItem("Lịch sử thanh toán", "4", <HistoryOutlined />),
];

const MenuProfile = (props) => {
  const onClick = (e) => {
    console.log("click ", e.key);
    props.onChangeContentHandler(e.key);
  };

  return (
    <Menu
      onSelect={onClick}
      style={{
        width: "100%",
        marginTop: "70px",
      }}
      defaultSelectedKeys={"1"}
      // defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default MenuProfile;
