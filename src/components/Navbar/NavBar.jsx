import React, { useState, useEffect } from "react";

import DidLogin from "../BtnLogin/DidLogin";

import {
  UserOutlined,
  ToolOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

import { getKols } from "../../services/KolService";
import { getEnts } from "../../services/EnterpriseService";

const NavBar = (props) => {
  const user = JSON.parse(localStorage.getItem("user"))

  const [kol, setKol] = useState([])
  const [ent, setEnt] = useState([])

  useEffect(() => {
    if (user.role === "KOL") {
      getKols().then((res) => setKol(res.find((kol) => kol.userId === user.id)))
    }
    if (user.role === "ENTERPRISE") {
      getEnts().then((res) => setEnt(res.find((ent) => ent.userId === user.id)))
    }
  }, [])

  const items = [
    {
      label: (
        (user && user.role === "KOL") ?
          <Link style={{ fontSize: "20px" }} to={`kols/${kol.id}`}>
            <PlusCircleOutlined /> Trang của tôi
          </Link> :
          <Link style={{ fontSize: "20px" }} to={`ents/${ent.id}`}>
            <PlusCircleOutlined /> Trang của tôi
          </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link style={{ fontSize: "20px" }} to="/setting">
          <UserOutlined /> Hồ sơ
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
