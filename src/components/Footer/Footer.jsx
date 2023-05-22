import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo_KOLgo-removebg.svg";
import fb from "../../assets/icon/icon-facebook.png";
import yt from "../../assets/icon/icon-youtube.png";
import isg from "../../assets/icon/icon-intagram.png";
import tt from "../../assets/icon/icon-tiktok.png";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <Row>
        <Col span={6}>
          <Link to={"../"} className={classes["logo-wrap"]}>
            <img className={classes.logo} src={logo}></img>
            <p className={classes["logo-text"]}>KOLgo</p>
          </Link>
          <p className={classes.address}>
            254 Nguyễn Văn Linh, P.Nam Dương,
            <br /> Q.Hải Châu, TP.Đà Nẵng
          </p>
        </Col>
        <Col span={6}>
          <h3 className={classes.header}>Về KOLgo</h3>
          <p className={classes.content}>
            Câu chuyện về KOLgo <br /> Công việc
          </p>
        </Col>
        <Col span={6}>
          <h3 className={classes.header}>Giải pháp</h3>
          <p className={classes.content}>
            KOLgo Professional
            <br /> KOLgo Review
            <br />
            KOLgo Commerce
          </p>
        </Col>
        <Col span={6}>
          <h3 className={classes.header}>Tài nguyên</h3>
          <p className={classes.content}>
            Trung tâm hỗ trợ
            <br /> Nhận tư vấn
            <br />
            Blog
            <br />
            Chính sách bảo mật
          </p>
        </Col>
      </Row>
      <hr width="90%" align="left" />
      <Row className={classes["footer-info"]}>
        <Col span={12}>
          <img src={fb}></img>
          <img src={yt}></img>
          <img src={isg}></img>
          <img src={tt}></img>
        </Col>
        <Col span={4}>
          <p>Hotline: 0236.3650403</p>
        </Col>
        <Col span={8}>
          <p>Email: support@C2SE.29.duytan.edu.vn</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
