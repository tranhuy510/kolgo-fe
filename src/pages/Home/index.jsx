import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/index";
import Content from "../../components/Content/Content";
// import { Helmet } from 'react-helmet';

import "./style.css";

const Home = (props) => {
  useEffect(() => {
    const originalTitle = document.title
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        document.title = 'Trở lại đi 凸(￣ヘ￣)'
      }
      else document.title = `${originalTitle}`
    })
  }, []);

  return (
    <div>
      <SideBar />
      <Content />
    </div>
  );
};

export default Home;
