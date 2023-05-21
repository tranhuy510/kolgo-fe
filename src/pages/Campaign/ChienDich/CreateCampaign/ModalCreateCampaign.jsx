import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Select, Form, DatePicker, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import classes from '../../Campaign.module.css';

import { getFields } from '../../../../services/getApi'
import CampaignContext from "../../../../context/campaign.context";
import { formatDate } from "../../../../services/DateTimeUtil";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ModalCreateCampaign = (props) => {
    const campaignCtx = useContext(CampaignContext);

    const [campaign, setCampaign] = useState({
        name: '',
        fieldIds: [],
        timestamp: '',
        startTime: '',
        finishTime: '',
        location: '',
        description: '',
        details: '',
        images: [],
        enterprise: campaignCtx.profile
    })

    const [nameCampaign, setNameCampaign] = useState("");
    const [listFields, setListFields] = useState([]);
    const [startDate, setStartDate] = useState({
        day: null,
        month: null,
        year: null,
        hours: null,
        minute: null,
        second: null,
    });
    const [endDate, setEndDate] = useState({
        day: null,
        month: null,
        year: null,
        hours: null,
        minute: null,
        second: null,
    });

    const [fields, setFileds] = useState([]);

    useEffect(() => {
        getFields()
            .then(res => res.json())
            .then(data => setFileds(data))
    }, [])

    const onCreateCampaignHandler = () => {

        console.log(campaign);

    };

    const onChangeNameCampaignHandler = (e) => {
        setCampaign(prev => { return { ...prev, name: e.target.value } })
    };

    const onChangefieldIdsHandler = (value) => {
        setCampaign(prev => { return { ...prev, fieldIds: value } })
    };

    const onChangeDateHandler = (value) => {
        setCampaign(prev => { return { ...prev, startTime: formatDate(new Date(value[0])) } })
        // setStartDate(value[0])

        // setEndDate(value[1])
        setCampaign(prev => { return { ...prev, finishTime: formatDate(new Date(value[1])) } })
    }

    const onChangeLocationHandler = (e) => {
        setCampaign(prev => { return { ...prev, location: e.target.value } })
    }

    const onChangeDescriptionHandler = (e) => {
        setCampaign(prev => { return { ...prev, description: e.target.value } })
    }

    const onChangeDetailsHandler = (e) => {
        setCampaign(prev => { return { ...prev, details: e.target.value } })

    }

    const onChangeImagesHandler = (value) => {
        setCampaign(prev => {
            return {
                ...prev, images: value.fileList.map((item) => {
                    return item.name
                })
            }
        })
    }

    const optionFields = fields.map((c) => {
        return {
            value: c.id,
            label: c.name,
        };
    });

    return (
        <div className={classes['campaign-modal-create-campaign']}>
            <Form
                name="basic"
                labelCol={{ span: 5, }}
                wrapperCol={{ span: 19, }}
                style={{ minWidth: 600, maxWidth: 920, }}
                initialValues={{ remember: true, }}
                autoComplete="off"
            >
                {/* tên chiến dịch */}
                <Form.Item
                    label="Tên chiến dịch"
                    name="nameCampaign"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống tên chiến dịch!',
                        },
                    ]}
                >
                    <Input
                        rows={2}
                        placeholder="Nhập tên chiến dịch"
                        onChange={onChangeNameCampaignHandler}
                        value={nameCampaign}
                    />
                </Form.Item>

                {/* Lĩnh vực */}
                <Form.Item
                    label="Lĩnh vực"
                    name="listFields"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống lĩnh vực!',
                        },
                    ]}
                >
                    <Select
                        mode="tags"
                        style={{
                            width: "100%",
                        }}
                        placeholder="Chọn lĩnh Vực"
                        onChange={onChangefieldIdsHandler}
                        options={optionFields}
                        value={listFields}
                    />
                </Form.Item>

                {/* Thời gian */}
                <Form.Item
                    label="Thời gian"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn thời gian!',
                        },
                    ]}
                >
                    <RangePicker
                        style={{
                            width: "100%",
                        }}
                        onChange={onChangeDateHandler}
                        showTime
                    />
                </Form.Item>

                {/* người tạo */}
                <Form.Item
                    label="Người tạo"
                    name="author"
                >
                    {campaignCtx.user.firstName} {campaignCtx.user.lastName}
                </Form.Item>

                {/* địa chỉ */}
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập địa chỉ!',
                        },
                    ]}
                >
                    <Input
                        rows={2}
                        placeholder="Nhập địa chỉ"
                        onChange={onChangeLocationHandler}
                        value={campaign.location}
                    />
                </Form.Item>

                {/* Mô tả */}
                <Form.Item
                    label="Mô tả chiến dịch"
                    name="mota"
                    rules={[
                        {
                            required: false,
                            message: 'Hãy nhập mô tả!',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Nhập mô tả chiến dịch"
                        value={campaign.description}
                        onChange={onChangeDescriptionHandler}
                    />
                </Form.Item>

                {/* Chi tiet */}
                <Form.Item
                    label="Thông tin chi tiết"
                    name="introduce"
                    rules={[
                        {
                            required: false,
                            message: 'Hãy nhập thông tin chi tiết!',
                        },
                    ]}
                >
                    <TextArea
                        rows={10}
                        placeholder="Nhập chi tiết"
                        value={campaign.details}
                        onChange={onChangeDetailsHandler}
                    />
                </Form.Item>

                {/* Thêm ảnh */}
                <Form.Item
                    label="Thêm ảnh"
                    valuePropName="fileList"
                    rules={[
                        {
                            required: false,
                            message: 'Please choose your image!',
                        },
                    ]}
                >
                    <Upload listType="picture-card" value={campaign.images} onChange={onChangeImagesHandler}>
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Thêm ảnh
                            </div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 15,
                    }}
                >
                    <Button type="primary" onClick={onCreateCampaignHandler}>
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ModalCreateCampaign;
