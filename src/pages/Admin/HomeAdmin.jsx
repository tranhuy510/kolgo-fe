import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Header from "../../components/Header/index";
import AccountEnterprises from "./Options/AccountEnterprises";
import AccountKOL from "./Options/AccountKOL";
import Booking from "./Options/Booking";
import ChienDich from "./Options/ChienDich";
import ListCombo from "./Options/ListCombo";
import OutStanding from "./Options/OutStanding";
import CreateCombo from "./Options/CreateCombo";
// import "./HomeAdmin.css";

const { Sider } = Layout;

const HomeAdmin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  return (
    <>
      <Header />
      <Layout>
        <Sider>
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
          </Menu>
        </Sider>
        <Layout>
          <Layout.Content className="site-layout-content">
            {selectedMenuItem === "1" && <AccountEnterprises />}
            {selectedMenuItem === "2" && <AccountKOL />}
            {selectedMenuItem === "3" && <ListCombo />}
            {selectedMenuItem === "4" && <CreateCombo />}
            {selectedMenuItem === "5" && <ChienDich />}
            {selectedMenuItem === "6" && <Booking />}
            {selectedMenuItem === "7" && <OutStanding />}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeAdmin;
