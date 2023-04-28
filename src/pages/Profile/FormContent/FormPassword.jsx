import { useState } from "react";
import { Col, Row } from "antd";

import classes from "./Form.module.css";
import Message from "../../../components/UI/Message/Message";
import { putFormData, updateData } from "../../../services/common";

export default function FormPassword(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();

  const [showMessage, setShowMessage] = useState({
    status: false,
    type: "",
    content: "",
  });

  const changeMessage = () => {
    setShowMessage({
      status: false,
      type: "",
      content: "",
    });
  };

  const createErrorMessage = (msg) => {
    setShowMessage({ status: true, type: "error", content: msg });
  };

  const createSuccessMessage = (msg) => {
    setShowMessage({ status: true, type: "success", content: msg });
  };

  const inputChangeHandler = (event) => {
    setData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const validateFormData = (formData) => {
    let res = true;
    let errMsg = "";
    if (!formData.oldPassword) {
      errMsg = "Vui lòng nhập mật khẩu hiện tại!";
    } else if (!formData.newPassword) {
      errMsg = "Vui lòng nhập mật khẩu mới!";
    } else if (formData.oldPassword === formData.newPassword) {
      errMsg = "Mật khẩu hiện tại và mật khẩu mới phải khác nhau!";
    } else if (!formData.resetPassword) {
      errMsg = "Vui lòng nhập lại mật khẩu mới!";
    } else if (formData.newPassword !== formData.resetPassword) {
      errMsg = "Mật khẩu mới và Nhập lại mật khẩu phải giống nhau!";
    }
    if (errMsg) {
      createErrorMessage(errMsg);
      res = false;
    }
    return res;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateFormData(data)) return;
    console.log(data.newPassword);

    const formData = new FormData();
    formData.append("oldPassword", data.oldPassword);
    formData.append("newPassword", data.newPassword);

    updateData("PUT", "user/password", formData, true).then(
      createSuccessMessage("Cập nhật thành công!")
    );
  };

  return (
    <Row>
      <Col span={16}>
        <Message
          status={showMessage.status}
          type={showMessage.type}
          content={showMessage.content}
          changeMessage={changeMessage}
        />
        <h1>Tài khoản và mật khẩu</h1>
        <form className={classes.form} onSubmit={submitHandler}>
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
            <Col span={7}>Mật khẩu hiện tại:</Col>
            <Col span={17}>
              <input
                placeholder="Nhập mật khẩu hiện tại"
                className={classes.input_profile}
                name="oldPassword"
                type="password"
                onChange={inputChangeHandler}
                autoComplete="new-password"
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
                onChange={inputChangeHandler}
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
                onChange={inputChangeHandler}
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
