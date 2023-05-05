import React from "react";

import DidLogin from "../BtnLogin/DidLogin";

import {
  UserOutlined,
  ToolOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const items = [
    {
      label: (
        <Link style={{ fontSize: "20px" }} to="https://www.antgroup.com">
          <PlusCircleOutlined /> Load money
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link style={{ fontSize: "20px" }} to="/setting">
          <UserOutlined /> Your profile
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link style={{ fontSize: "20px" }} href="https://www.aliyun.com">
          <ToolOutlined /> Setting account
        </Link>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <DidLogin logOutHandler={props.logOutHandler} />,
      key: "4",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>{props.children}</Space>
      </a>
    </Dropdown>
  );
};

export default NavBar;
