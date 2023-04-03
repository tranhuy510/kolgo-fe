import React from "react";
import SideBar from "../../components/SideBar/index";
import Content from "../../components/Content/Content";

import Card from "../../components/UI/Card/Card";
import "./style.css";

const Home = (props) => {
  return (
    <div>
      <SideBar />
      <Content />
    </div>
  );
};

export default Home;
