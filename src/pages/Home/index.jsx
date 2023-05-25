import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/index";
import Content from "../../components/Content/Content";
import Header from "../../components/Header";
import "./style.css";
import Footer from "../../components/Footer/Footer";

const Home = (props) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        document.title = "Quay lại";
      } else document.title = `${originalTitle}`;
    });
  }, []);

  return (
    <div>
      <Header />
      <SideBar />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
