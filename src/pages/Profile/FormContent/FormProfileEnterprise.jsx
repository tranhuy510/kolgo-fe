import { useEffect, useState } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Select } from "antd";

import classes from "./Form.module.css";
import Message from "../../../components/UI/Message/Message";
import { fetchData, putFormData } from "../../../services/common";

export default function FormProfileEnterprise(props) {
  const [ent, setEnt] = useState({});
  const [city, setCity] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [valueSpeciality, setValueSpeciality] = useState();
  const [valueCity, setValueCity] = useState();
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

  useEffect(() => {
    Promise.all([
      fetchData("ent/profile", true),
      fetchData("cities", false),
      fetchData("fields/ent", false),
    ]).then(([profile, cities, fields]) => {
      setEnt(profile);
      setCity(cities);
      setSpeciality(fields);
    });
  }, []);

  const optionCity = city.map((c) => {
    return {
      value: c.id,
      label: c.name,
    };
  });

  const optionSpeciality = speciality.map((s) => {
    return {
      value: s.id,
      label: s.name,
    };
  });

  const inputChangeHandler = (event) => {
    setEnt((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const changeCityHandler = (value) => {
    setValueCity(value);
    setEnt((prevState) => {
      return {
        ...prevState,
        cityId: value,
      };
    });
  };

  const changeSpecialityHandler = (value) => {
    setValueSpeciality(value);
    setEnt((prevState) => {
      return {
        ...prevState,
        fieldId: value,
      };
    });
  };

  const avatarChangeHandler = (event) => {
    setEnt((prevState) => {
      return {
        ...prevState,
        avatar: event.target.files[0],
      };
    });
  };

  const validateFormData = (formData) => {
    let res = true;
    let errMsg = "";
    if (!formData.firstName) {
      errMsg = "Vui lòng nhập tên của bạn!";
    } else if (!formData.lastName) {
      errMsg = "Vui lòng nhập họ của bạn!";
    } else if (!formData.name) {
      errMsg = "Vui lòng nhập tên doanh nghiệp!";
    } else if (!formData.phone) {
      errMsg = "Vui lòng nhập số điện thoại của bạn!";
    } else if (!formData.taxId) {
      errMsg = "Vui lòng nhập mã số thuế!";
    } else if (!formData.cityId) {
      errMsg = "Vui lòng chọn tỉnh/thành phố địa chỉ!";
    } else if (!formData.fieldId) {
      errMsg = "Vui lòng chọn lĩnh vực hoạt động!";
    } else if (!formData.addressDetails) {
      errMsg = "Vui lòng nhập địa chỉ cụ thể!";
    }
    if (errMsg) {
      createErrorMessage(errMsg);
      res = false;
    }
    return res;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateFormData(ent)) return;

    const formData = new FormData();
    Object.keys(ent).map((key) => formData.append(key, ent[key]));

    putFormData("ent/profile", formData, true).then(
      createSuccessMessage("Cập nhật thành công!")
    );
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Row>
        <Col span={16}>
          <Message
            status={showMessage.status}
            type={showMessage.type}
            content={showMessage.content}
            changeMessage={changeMessage}
          />
          <h1>Thông tin cá nhân</h1>
          <Row className={classes.form_control}>
            <Col span={7}>Tên:</Col>
            <Col span={17}>
              <input
                placeholder="Tên của bạn"
                className={classes.input_profile}
                name="firstName"
                onChange={inputChangeHandler}
                defaultValue={ent.firstName}
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Họ:</Col>
            <Col span={17}>
              <input
                placeholder="Họ của bạn"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={ent.lastName}
                name="lastName"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Tên doanh nghiệp:</Col>
            <Col span={17}>
              <input
                placeholder="Tên doanh nghiệp"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={ent.name}
                name="name"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Số điện thoại:</Col>
            <Col span={17}>
              <input
                placeholder="Số điện thoại"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={ent.phone}
                name="phone"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Mã số thuế:</Col>
            <Col span={17}>
              <input
                placeholder="Mã số thuế"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={ent.taxId}
                name="taxId"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Lĩnh vực:</Col>
            <Col span={17}>
              <Select
                showSearch
                placeholder="Chọn lĩnh vực hoạt động"
                className={classes.select_profile}
                optionFilterProp="children"
                onChange={changeSpecialityHandler}
                value={valueSpeciality ? valueSpeciality : ent.fieldId}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionSpeciality}
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Tỉnh/Thành phố:</Col>
            <Col span={17}>
              <Select
                showSearch
                placeholder="Chọn tỉnh/thành phố địa chỉ"
                className={classes.select_profile}
                optionFilterProp="children"
                onChange={changeCityHandler}
                value={valueCity ? valueCity : ent.cityId}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionCity}
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={7}>Địa chỉ cụ thể:</Col>
            <Col span={17}>
              <input
                placeholder="Địa chỉ cụ thể"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={ent.addressDetails}
                name="addressDetails"
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
        </Col>
        <Col span={8} style={{ marginTop: "30px", textAlign: "center" }}>
          <h3>Ảnh đại diện</h3>
          <Avatar
            size={200}
            src={`http://localhost:8080/api/images/${ent.avatar}`}
          >
            {ent.avatar ? (
              ""
            ) : (
              <UserOutlined style={{ fontSize: 70, lineHeight: "200px" }} />
            )}
          </Avatar>
          <div className={classes.avatarWrapper}>
            <EditOutlined /> Thay đổi
            <input
              type="file"
              accept="image/*"
              onChange={avatarChangeHandler}
            />
          </div>
        </Col>
      </Row>
    </form>
  );
}
