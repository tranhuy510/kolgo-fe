import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Button, Modal, Select, Cascader, Row, Col } from "antd";

import classes from './AccountKOL.module.css'

import { getEntFields } from '../../../../services/FieldService';
import { getCities } from '../../../../services/CityService';

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
        <>
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
                    <Col span={6}>Giới tính :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Giới tính"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.gender === "MALE" ? "Nam" : "Nữ"}
                            name="gender"
                        />
                    </Col>
                </Row>

                <Row style={{ margin: '20px 10px' }}>
                    <Col span={6}>Vai trò :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Vai trò"
                            className={classes['modal-update-col-input']}
                            value={profile.role}
                        />
                    </Col>
                </Row>

                <Row style={{ margin: '20px 10px' }}>
                    <Col span={6}>Email :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Email"
                            className={classes['modal-update-col-input']}
                            value={profile.email}
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
                    <Col span={6}>Giá 1 video:</Col>
                    <Col span={18}>
                        <input
                            placeholder="Giá 1 video"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.videoPrice}
                            name="videoPrice"
                        />
                    </Col>
                </Row>

                <Row style={{ margin: '20px 10px' }}>
                    <Col span={6}>Giá 1 bài viết :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Giá 1 bài viết"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.postPrice}
                            name="postPrice"
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
                    <Col span={6}>Link Facebook:</Col>
                    <Col span={18}>
                        <input
                            placeholder="Mã số thuế"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.facebookUrl}
                            name="facebookUrl"
                        />
                    </Col>
                </Row>

                <Row style={{ margin: '20px 10px' }}>
                    <Col span={6}>Link Instagram :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Mã số thuế"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.instagramUrl}
                            name="instagramUrl"
                        />
                    </Col>
                </Row>

                <Row style={{ margin: '20px 10px' }}>
                    <Col span={6}>Link Tiktok :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Mã số thuế"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.tiktokUrl}
                            name="tiktokUrl"
                        />
                    </Col>
                </Row>

                <Row style={{ margin: '20px 10px' }}>
                    <Col span={6}>Link Youtube :</Col>
                    <Col span={18}>
                        <input
                            placeholder="Mã số thuế"
                            className={classes['modal-update-col-input']}
                            onChange={inputChangeHandler}
                            value={profile.youtubeUrl}
                            name="youtubeUrl"
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
            </Modal>
        </>

    )
}

export default ModalUpdate