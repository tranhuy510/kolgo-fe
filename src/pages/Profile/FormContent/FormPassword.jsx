import { Col, Row } from "antd";

import classes from "./Form.module.css";

export default function FormPassword(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Row>
      <Col span={16}>
        <h1>Tài khoản và mật khẩu</h1>
        <form className={classes.form}>
          <Row className={classes.form_control}>
            <Col span={7}>Email:</Col>
            <Col span={17}>
              <input
                placeholder="Email"
                className={classes.input_profile}
                name="email"
                type="email"
                defaultValue={user?.email}
                disabled
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Mật khẩu cũ:</Col>
            <Col span={17}>
              <input
                placeholder="Nhập mật khẩu hiện tại"
                className={classes.input_profile}
                name="oldPasswod"
                type="password"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Mật khẩu mới:</Col>
            <Col span={17}>
              <input
                placeholder="Nhập mật khẩu mới"
                className={classes.input_profile}
                name="newPassword"
                type="password"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Nhập lại mật khẩu:</Col>
            <Col span={17}>
              <input
                placeholder="Nhập lại mật khẩu"
                className={classes.input_profile}
                name="resetPassword"
                type="password"
              />
            </Col>
          </Row>

          <Row>
            <Col offset={4}></Col>
            <Col span={16}>
              <button className={classes.btnSubmit} type="submit">
                Cập nhật
              </button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  );
}
