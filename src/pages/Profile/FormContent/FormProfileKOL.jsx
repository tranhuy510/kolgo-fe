import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import {
  getCities,
  getFields,
  getGenders,
  getKolProfile,
} from "../../../services/getApi";

import classes from "./Form.module.css";
import { postKolProfile } from "../../../services/postApi";
import Message from "../../../components/UI/Message/Message";
import ImageGallery from "../../../components/UI/ImageGallery/ImageGallery";

export default function FormProfileKOL(props) {
  const [profile, setProfile] = useState({});
  const [gender, setGender] = useState([]);
  const [city, setCity] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [valueGender, setValueGender] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [valueSpeciality, setValueSpeciality] = useState("");
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState();

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

  const setDefaultProfile = () => {
    getKolProfile()
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
  };

  const setDefaultGender = () => {
    getGenders()
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        setGender(data);
      });
  };

  const setDefaultCity = () => {
    getCities()
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        setCity(data);
      });
  };

  const setDefaultSpeciality = () => {
    getFields()
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        setSpeciality(data);
      });
  };

  useEffect(() => {
    setDefaultProfile();
    setDefaultGender();
    setDefaultCity();
    setDefaultSpeciality();
  }, []);

  const optionGender = gender.map((g) => {
    return {
      value: g.id,
      label: g.name,
    };
  });

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
    setProfile((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const changeGenderHandler = (value) => {
    setValueGender(value);
    setProfile((prevState) => {
      return {
        ...prevState,
        genderId: value,
      };
    });
  };

  const changeCityHandler = (value) => {
    setValueCity(value);
    setProfile((prevState) => {
      return {
        ...prevState,
        cityId: value,
      };
    });
  };

  const changeSpecialityHandler = (value) => {
    setValueSpeciality(value);
    setProfile((prevState) => {
      return {
        ...prevState,
        kolFieldId: value,
      };
    });
  };

  const avatarChangeHandler = (event) => {
    setAvatar(event.target.files);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const newFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      newFiles.push(fileList[i]);
    }
    setImages([...images, ...newFiles]);
  };

  const validateFormData = (formData) => {
    let res = true;
    let errMsg = "";
    if (!formData.firstName) {
      errMsg = "Vui lòng nhập tên của bạn!";
    } else if (!formData.lastName) {
      errMsg = "Vui lòng nhập họ của bạn!";
    } else if (!formData.genderId) {
      errMsg = "Vui lòng chọn giới tính của bạn!";
    } else if (!formData.phoneNumber) {
      errMsg = "Vui lòng nhập số điện thoại của bạn!";
    } else if (!formData.cityId) {
      errMsg = "Vui lòng chọn thành phố làm việc!";
    } else if (!formData.kolFieldId) {
      errMsg = "Vui lòng chọn lĩnh vực hoạt động!";
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

    const formData = new FormData();
    Object.keys(profile).map((key) => formData.append(key, profile[key]));
    formData.append("avatar", avatar);
    images.forEach((image) => formData.append("images", image));

    postKolProfile(formData)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        } else {
          createSuccessMessage("Cập nhật thành công!");
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
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
                value={valueGender ? valueGender : profile?.genderId}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionGender}
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
                defaultValue={profile?.phoneNumber}
                name="phoneNumber"
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
                value={valueCity ? valueCity : profile?.cityId}
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
            <Col span={6}>Lĩnh vực:</Col>
            <Col span={18}>
              <Select
                showSearch
                placeholder="Chọn lĩnh vực hoạt động"
                className={classes.select_profile}
                optionFilterProp="children"
                onChange={changeSpecialityHandler}
                value={valueSpeciality ? valueSpeciality : profile?.kolFieldId}
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
            <Col span={6}>Facebook url:</Col>
            <Col span={18}>
              <input
                placeholder="Link trang Facebook cá nhân"
                onChange={inputChangeHandler}
                className={classes.input_profile}
                defaultValue={profile?.facebookUrl}
                name="linkFb"
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
                name="linkYt"
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
                name="linkInsta"
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
                name="linkTt"
                type="url"
              />
            </Col>
          </Row>

          <Row className={classes.form_control}>
            <Col span={6}>Album ảnh:</Col>
            <Col span={18}>
              {profile.images && <ImageGallery images={profile?.images} />}
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
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
          <Avatar size={200} src={profile?.avatar}>
            {profile?.avatar ? (
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
