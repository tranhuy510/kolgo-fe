import React, { useEffect, useState } from 'react'
import { Button, Modal, Select, Cascader, Row, Col, message } from "antd";

import classes from './AccountEnterprises.module.css'
import { updateEntProfile } from '../../../../services/EnterpriseService';

const ModalUpdate = ({ openUpdate, onCloseUpdateModalHandler, data, fieldList, cityList }) => {
    const [messageApi, contextHolder] = message.useMessage();
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
                cityId: value,
            };
        });
    };

    const onChangeFieldsHandler = (value) => {
        setProfile((prevState) => {
            return {
                ...prevState,
                fieldIds: value,
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
        } else if (!formData.fieldIds) {
            errMsg = "Vui lòng chọn lĩnh vực hoạt động!";
        } else if (!formData.addressDetails) {
            errMsg = "Vui lòng nhập địa chỉ cụ thể!";
        }
        if (errMsg) {
            messageApi.open({
                type: 'warning',
                content: errMsg,
            });
            res = false;
        }
        return res;
    };

    const onUpdate = (event) => {
        event.preventDefault();
        if (!validateFormData(profile)) return;

        updateEntProfile(profile).then(
            messageApi.open({
                type: 'success',
                content: "Cập nhật thành công!",
            })
        )
    }

    return (
        <Modal
            width={800}
            title=""
            open={openUpdate}
            onCancel={onCloseUpdateModalHandler}
            footer={[]}
        >
            {contextHolder}
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
                <Col span={6}>Email:</Col>
                <Col span={18}>
                    <input
                        placeholder="Email"
                        className={classes['modal-update-col-input']}
                        onChange={inputChangeHandler}
                        value={profile.email}
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
                        value={profile.fieldIds}
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
                        value={profile.cityId}
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
        </Modal>
    )
}

export default ModalUpdate