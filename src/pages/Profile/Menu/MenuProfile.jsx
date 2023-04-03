import React from "react";
import {
  UserOutlined,
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
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
  getItem("Thông tin cá nhân", "sub1", <UserOutlined />),
  getItem("Cài đặt tài khoản", "sub2", <SettingOutlined />, [
    getItem("Email", "1"),
    getItem("Tài khoản và mật khẩu", "2"),
    getItem("Option 7", "6"),
    getItem("Option 8", "7"),
  ]),
  {
    type: "divider",
  },
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "8"),
    getItem("Option 10", "9"),
    getItem("Option 11", "10"),
    getItem("Option 12", "11"),
  ]),
  getItem(
    "Group",
    "grp",
    null,
    [getItem("Option 13", "12"), getItem("Option 14", "13")],
    "group"
  ),
];

const MenuProfile = (props) => {
  const onClick = (e) => {
    console.log("click ", e);
    props.onChangeContentHandler(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default MenuProfile;
