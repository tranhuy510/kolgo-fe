import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme, Col, Row } from "antd";
import MenuProfile from "./Menu/MenuProfile";
import SubContext from "./SubContext/SubContext";
import "./profile.css";

const Profile = () => {
  const [changeContent, setChangeContent] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const onChangeContentHandler = (data) => {
    setChangeContent(data);
    console.log(data);
  };

  console.log(user);

  return (
    <>
      <div
        className="profile"
        style={{ padding: "65px 50px", backgroundColor: "#fff" }}
      >
        <Row>
          <Col span={6}>
            <MenuProfile
              user={user}
              onChangeContentHandler={onChangeContentHandler}
            />
          </Col>
          <Col span={18}>
            <SubContext user={user} changeContent={changeContent} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
