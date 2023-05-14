import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountEnterprises from "./Options/Enterprises/AccountEnterprises";
import AccountKOL from "./Options/Kols/AccountKOL";
import Booking from "./Options/Book/Booking";
import ChienDich from "./Options/Campaign/ChienDich";
import ListCombo from "./Options/Combo/ListCombo";
import OutStanding from "./Options/OutStanding/OutStanding";
import CreateCombo from "./Options/Combo/CreateCombo";
import Fields from "./Options/Fields/Fields"

import { Layout, Menu, Button } from "antd";
import classes from './HomeAdmin.module.css'

const { Sider } = Layout;

const HomeAdmin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("../login");
  }

  return (
    <>
      <Layout>
        <Sider className={classes['admin-menu']} >
          <Menu
            theme="dark"
            selectedKeys={[selectedMenuItem]}
            onClick={handleMenuClick}
            mode="inline"
          >
            <Menu.SubMenu className="submenu" key="sub1" title="Tài Khoản">
              <Menu.Item key="1">Enterprises</Menu.Item>
              <Menu.Item key="2">KOL</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu className="submenu" key="sub2" title="Combo">
              <Menu.Item key="3">Danh Sách Combo</Menu.Item>
              <Menu.Item key="4">Tạo Combo</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="5">Chiến Dịch</Menu.Item>
            <Menu.Item key="6">Booking</Menu.Item>
            <Menu.Item key="7">Nổi Bật</Menu.Item>
            <Menu.Item key="8">Lĩnh vực</Menu.Item>
          </Menu>
          <Button
            onClick={logoutHandler}
            className={classes['btn-logout']}
          >Đăng xuất</Button>
        </Sider>
        <Layout>
          <Layout.Content className={classes["site-layout-content"]}>
            {selectedMenuItem === "1" && <AccountEnterprises />}
            {selectedMenuItem === "2" && <AccountKOL />}
            {selectedMenuItem === "3" && <ListCombo />}
            {selectedMenuItem === "4" && <CreateCombo />}
            {selectedMenuItem === "5" && <ChienDich />}
            {selectedMenuItem === "6" && <Booking />}
            {selectedMenuItem === "7" && <OutStanding />}
            {selectedMenuItem === "8" && <Fields />}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeAdmin;
