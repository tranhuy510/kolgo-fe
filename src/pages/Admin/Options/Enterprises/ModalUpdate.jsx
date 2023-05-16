import React, { useEffect, useState } from 'react'
import { Button, Modal, Select, Cascader, Row, Col } from "antd";

import classes from './AccountEnterprises.module.css'

const ModalUpdate = ({ openUpdate, onCloseUpdateModalHandler, data, fieldList, cityList }) => {

    const [profile, setProfile] = useState({});

    useEffect(() => {
        setProfile(data)
    }, [data])

    const optionFields = fieldList.map((field) => {
        return {
            value: field.id,
            label: field.name,
        };
    });

    const optionCities = cityList.map((city) => {
        return {
            value: city.id,
            label: city.name,
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

    const onChangeCityHandler = (value) => {
        setProfile((prevState) => {
            return {
                ...prevState,
                city: value[0],
            };
        });
    };

    const onChangeFieldsHandler = (value) => {
        setProfile((prevState) => {
            return {
                ...prevState,
                fields: value,
            };
        });
    };

    const onUpdate = (event) => {
        event.preventDefault();
        console.log(profile);
    }

    return (
        <Modal
            width={800}
            title=""
            open={openUpdate}
            onCancel={onCloseUpdateModalHandler}
            footer={[]}
        >
            <h1>Thông tin chi tiết</h1>
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Tên:</Col>
                <Col span={18}>
                    <input
                        placeholder="Tên của bạn"
                        className={classes['modal-update-col-input']}
                        value={profile.firstName}
                        name="firstName"
                        onChange={inputChangeHandler}
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Họ:</Col>
                <Col span={18}>
                    <input
                        placeholder="Họ của bạn"
                        className={classes['modal-update-col-input']}
                        onChange={inputChangeHandler}
                        value={profile.lastName}
                        name="lastName"
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Tên doanh nghiệp:</Col>
                <Col span={18}>
                    <input
                        placeholder="Tên doanh nghiệp"
                        className={classes['modal-update-col-input']}
                        onChange={inputChangeHandler}
                        value={profile.name}
                        name="name"
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Số điện thoại:</Col>
                <Col span={18}>
                    <input
                        placeholder="Số điện thoại"
                        className={classes['modal-update-col-input']}
                        onChange={inputChangeHandler}
                        value={profile.phone}
                        name="phone"
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Mã số thuế:</Col>
                <Col span={18}>
                    <input
                        placeholder="Mã số thuế"
                        className={classes['modal-update-col-input']}
                        onChange={inputChangeHandler}
                        value={profile.taxId}
                        name="taxId"
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Lĩnh vực:</Col>
                <Col span={18}>
                    <Select
                        mode="tags"
                        style={{
                            width: "100%",
                        }}
                        placeholder="Chọn lĩnh Vực"
                        onChange={onChangeFieldsHandler}
                        value={profile.fields}
                        options={optionFields}
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Tỉnh/Thành phố:</Col>
                <Col span={18}>
                    <Cascader
                        style={{
                            width: "100%",
                        }}
                        options={optionCities}
                        onChange={onChangeCityHandler}
                        value={profile.city}
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Địa chỉ cụ thể:</Col>
                <Col span={18}>
                    <input
                        className={classes['modal-update-col-input']}
                        placeholder="Địa chỉ cụ thể"
                        onChange={inputChangeHandler}
                        value={profile.addressDetails}
                        name="addressDetails"
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col offset={6}></Col>
                <Col span={18}>
                    <Button onClick={onUpdate}>
                        Cập nhật
                    </Button>
                </Col>
            </Row>

            {/* <Col span={8} style={{ marginTop: "30px", textAlign: "center" }}>
                    <h3>Ảnh đại diện</h3>
                    <Avatar
                        size={200}
                        src={`http://localhost:8080/api/images/${user?.avatar}`}
                    >
                        {user?.avatar ? (
                            ""
                        ) : (
                            <UserOutlined style={{ fontSize: 60, lineHeight: "200px" }} />
                        )}
                    </Avatar>
                    <div className={classes.avatarWrapper}>
                        <EditOutlined /> Thay đổi
                        <input
                            type="file"
                            accept="image/*"
                        //   onChange={avatarChangeHandler}
                        />
                    </div>
                </Col> */}


        </Modal>
    )
}

export default ModalUpdate