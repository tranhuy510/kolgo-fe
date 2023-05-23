import { EditOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Select } from "antd";
import { useEffect, useState } from "react";

import classes from "./Form.module.css";
import Message from "../../../components/UI/Message/Message";
import ImageSlider from "../../../components/UI/ImageSlider/ImageSlider";
import {
  updateKolImages,
  updateKolProfile,
} from "../../../services/KolService";
import { updateUserAvatar } from "../../../services/UserService";
import { GenderOptions } from "../../../utils/Enums";
import { getKolProfile } from "../../../services/KolService";
import { getCities } from "../../../services/CityService";
import { getKolFields } from "../../../services/FieldService";

export default function FormProfileKOL(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [profile, setProfile] = useState({});
  const [cities, setCities] = useState([]);
  const [fields, setFields] = useState([]);
  const [genderName, setGenderName] = useState("");
  const [cityName, setCityName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [images, setImages] = useState([]);

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
    Promise.all([getKolProfile(), getCities(), getKolFields()]).then(
      ([profile, cities, fields]) => {
        setProfile(profile);
        setImages(profile.images);
        setCities(cities);
        setFields(fields);
      }
    );
  }, []);

  const optionCity = cities.map((c) => {
    return {
      value: c.id,
      label: c.name,
    };
  });

  const optionFields = fields.map((s) => {
    return {
      value: s.id,
      label: s.name,
    };
  });

  const inputChangeHandler = (event) => {
    setProfile((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const changeGenderHandler = (value) => {
    setGenderName(value);
    setProfile((prevState) => {
      return {
        ...prevState,
        gender: value,
      };
    });
  };

  const changeCityHandler = (value) => {
    setCityName(value);
    setProfile((prevState) => {
      return {
        ...prevState,
        cityId: value,
      };
    });
  };

  const changeFieldHandler = (value) => {
    setFieldName(value);
    setProfile((prevState) => {
      return {
        ...prevState,
        fieldIds: value,
      };
    });
  };

  const avatarChangeHandler = (event) => {
    updateUserAvatar(event.target.files[0]).then((res) => {
      setUser((prev) => ({ ...prev, avatar: res.avatar }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, avatar: res.avatar })
      );
      window.dispatchEvent(new Event("storage"));
    });
  };

  const handleFileChange = (event) => {
    updateKolImages(event.target.files).then((res) => {
      setImages(res);
    });
  };

  const validateFormData = (formData) => {
    let res = true;
    let errMsg = "";
    if (!formData.firstName) {
      errMsg = "Vui lòng nhập tên của bạn!";
    } else if (!formData.lastName) {
      errMsg = "Vui lòng nhập họ của bạn!";
    } else if (!formData.gender) {
      errMsg = "Vui lòng chọn giới tính của bạn!";
    } else if (!formData.phone) {
      errMsg = "Vui lòng nhập số điện thoại của bạn!";
    } else if (!formData.cityId) {
      errMsg = "Vui lòng chọn thành phố làm việc!";
    } else if (!formData.fieldIds) {
      errMsg = "Vui lòng chọn lĩnh vực hoạt động!";
    } else if (!formData.postPrice) {
      errMsg = "Vui lòng nhập giá của 1 bài đăng!";
    } else if (!formData.videoPrice) {
      errMsg = "Vui lòng nhập giá của 1 video!";
    } else if (!formData.introduction) {
      errMsg = "Vui lòng nhập giới thiệu bản thân!";
    }
    if (errMsg) {
      createErrorMessage(errMsg);
      res = false;
    }
    return res;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateFormData(profile)) return;
    updateKolProfile(profile).then(
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
            <Col span={6}>Tên:</Col>
            <Col span={18}>
              <input
                placeholder="Tên của bạn"
                className={classes.input_profile}
                name="firstName"
                onChange={inputChangeHandler}
                defaultValue={profile?.firstName}
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Họ:</Col>
            <Col span={18}>
              <input
                placeholder="Họ của bạn"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.lastName}
                name="lastName"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Giới tính:</Col>
            <Col span={18}>
              <Select
                showSearch
                className={classes.select_profile}
                placeholder="Chọn giới tính của bạn"
                optionFilterProp="children"
                onChange={changeGenderHandler}
                value={genderName ? genderName : profile?.gender}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={GenderOptions}
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Số điện thoại:</Col>
            <Col span={18}>
              <input
                placeholder="Số điện thoại"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.phone}
                name="phone"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Tỉnh/Thành phố:</Col>
            <Col span={18}>
              <Select
                showSearch
                placeholder="Chọn tỉnh/thành phố làm việc"
                className={classes.select_profile}
                optionFilterProp="children"
                onChange={changeCityHandler}
                value={cityName ? cityName : profile?.cityId}
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
            <Col span={6}>Địa chỉ cụ thể:</Col>
            <Col span={18}>
              <input
                placeholder="Địa chỉ cụ thể"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.addressDetails}
                name="addressDetails"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Lĩnh vực:</Col>
            <Col span={18}>
              <Select
                showSearch
                mode="multiple"
                allowClear
                placeholder="Chọn lĩnh vực hoạt động"
                className={classes.select_profile}
                optionFilterProp="children"
                onChange={changeFieldHandler}
                value={fieldName ? fieldName : profile?.fieldIds}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionFields}
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Facebook url:</Col>
            <Col span={18}>
              <input
                placeholder="Link trang Facebook cá nhân"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.facebookUrl}
                name="facebookUrl"
                type="url"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Youtube url:</Col>
            <Col span={18}>
              <input
                placeholder="Link kênh Youtube cá nhân"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.youtubeUrl}
                name="youtubeUrl"
                type="url"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Instagram url:</Col>
            <Col span={18}>
              <input
                placeholder="Link trang Instagram cá nhân"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.instagramUrl}
                name="instagramUrl"
                type="url"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>TikTok url:</Col>
            <Col span={18}>
              <input
                placeholder="Link trang TikTok cá nhân"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.tiktokUrl}
                name="tiktokUrl"
                type="url"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Giá bài đăng:</Col>
            <Col span={18}>
              <input
                placeholder="Giá của 1 bài đăng"
                onChange={inputChangeHandler}
                type="number"
                className={classes.input_profile}
                defaultValue={profile?.postPrice}
                name="postPrice"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Giá video:</Col>
            <Col span={18}>
              <input
                placeholder="Giá của 1 video"
                onChange={inputChangeHandler}
                type="number"
                className={classes.input_profile}
                defaultValue={profile?.videoPrice}
                name="videoPrice"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Mô tả:</Col>
            <Col span={18}>
              <textarea
                placeholder="Giới thiệu về bản thân"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.introduction}
                name="introduction"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Album ảnh:</Col>
            <Col span={18}>
              {images && <ImageSlider images={images} />}
              <div className={classes.albumWrapper}>
                <PlusOutlined /> Thêm ảnh mới
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
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
            src={`http://localhost:8080/api/images/${user.avatar}`}
          >
            {user.avatar ? (
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
