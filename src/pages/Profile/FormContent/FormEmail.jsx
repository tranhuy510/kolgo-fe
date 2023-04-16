import { Col, Row } from "antd";

import classes from "./Form.module.css";

export default function FormEmail(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Row>
      <Col span={16}>
        <h1>Email</h1>
        <form className={classes.form}>
          <Row className={classes.form_control}>
            <Col span={4}>Email:</Col>
            <Col span={20}>
              <input
                placeholder="Nhập Email của bạn"
                className={classes.input_profile}
                name="email"
                type="email"
                defaultValue={user?.email}
              />
            </Col>
          </Row>

          <Row>
            <Col offset={4}></Col>
            <Col span={16}>
              <button className={classes.btnSubmit} type="submit">
                Thay đổi Email
              </button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  );
}
