import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Input, Select, Form, DatePicker, Upload, Cascader, Col, Row } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import classes from '../../Campaign.module.css';
import CampaignContext from '../../../../context/campaign.context';

import { spreadDate, formatDate } from '../../../../services/DateTimeUtil';
import ImageSlider from '../../../../components/UI/ImageSlider/ImageSlider'
import { updateCampaign } from "../../../../services/CampaignService";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD/HH/MM/SS';

const ModalUpdateCampaign = ({ campaign, open, onCancelShowHandler }) => {
    const userCtx = useContext(CampaignContext);

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

    const [campaignUpdate, setCampaignUpdate] = useState({});

    useEffect(() => {
        setCampaignUpdate(campaign)
    }, [campaign])

    const inputChangeHandler = (event) => {
        setCampaignUpdate((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const onChangeFieldsHandler = (value) => {
        setCampaignUpdate((prev) => {
            return { ...prev, fieldIds: value }
        });
    };

    const onChangeImagesHandler = (value) => {
        console.log(value.fileList.map((item) => {
            return item.name
        }));
        setCampaignUpdate((prev) => {
            return {
                ...prev, images: value.fileList.map((item) => {
                    return item.name
                })
            }
        }
        )
    }

    const onChangeDateHandler = (value) => {
        setCampaignUpdate(prev => { return { ...prev, startTime: formatDate(new Date(value[0])) } })
        // setStartDate(value[0])

        // setEndDate(value[1])
        setCampaignUpdate(prev => { return { ...prev, finishTime: formatDate(new Date(value[1])) } })
    }

    const optionFields = userCtx.fields.map((c) => {
        return {
            value: c.id,
            label: c.name,
        };
    });

    const onUpdateCampaignHandler = () => {
        console.log(campaignUpdate);
        updateCampaign(campaignUpdate.id, campaignUpdate)
            .then(res => { console.log(res); })
    };

    return (
        <Modal
            width={1000}
            title=""
            open={open.status}
            onCancel={onCancelShowHandler}
            footer={[]}
        >
            {/* tên chiến dịch */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Tên:</Col>
                <Col span={18}>
                    <Input
                        placeholder="Tên chiến dịch"
                        className={classes['modal-update-col-input']}
                        value={campaignUpdate.name}
                        name="name"
                        onChange={inputChangeHandler}
                    />
                </Col>
            </Row>

            {/* Lĩnh vực */}
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
                        value={campaignUpdate.fieldIds}
                        options={optionFields}
                    />
                </Col>
            </Row>

            {/* Thời gian */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Thời gian:</Col>
                <Col span={18}>
                    <RangePicker
                        style={{
                            width: "100%",
                        }}
                        // onChange={onChangeDateHandler}
                        showTime
                        // value={[spreadDate(campaignUpdate?.startTime), spreadDate(campaignUpdate?.finishTime)]}
                        value={[campaignUpdate?.startTime, campaignUpdate?.finishTime]}
                        format={dateFormat}
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Ngày tạo:</Col>
                <Col span={18}>
                    {spreadDate(campaignUpdate?.timestamp)}
                </Col>
            </Row>
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Ngày bắt đầu:</Col>
                <Col span={18}>
                    {spreadDate(campaignUpdate?.startTime)}
                </Col>
            </Row>
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Ngày kết thúc:</Col>
                <Col span={18}>
                    {spreadDate(campaignUpdate?.finishTime)}
                </Col>
            </Row>


            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Người tạo:</Col>
                <Col span={18}>
                    {campaignUpdate?.enterprise?.firstName} {campaignUpdate?.enterprise?.lastName}
                </Col>
            </Row>

            {/* địa chỉ */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Địa chỉ:</Col>
                <Col span={18}>
                    <Input
                        rows={2}
                        placeholder="Nhập địa chỉ"
                        onChange={inputChangeHandler}
                        value={campaign.location}
                        name="location"
                    />
                </Col>
            </Row>

            {/* Mô tả */}

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Mô tả:</Col>
                <Col span={18}>
                    <TextArea
                        rows={4}
                        placeholder="Nhập mô tả chiến dịch"
                        value={campaign.description}
                        onChange={inputChangeHandler}
                        name="description"
                    />
                </Col>
            </Row>


            {/* Chi tiet */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Chi tiết:</Col>
                <Col span={18}>
                    <FormatText details={campaign.details} inputChangeHandler={inputChangeHandler} />
                </Col>
            </Row>

            {/* Ảnh */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Ảnh:</Col>
                <Col span={18}>

                </Col>
            </Row>

            {/* Thêm ảnh */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Ảnh:</Col>
                <Col span={18}>
                    {campaignUpdate.images && <ImageSlider images={campaignUpdate.images} />}
                    <Upload listType="picture-card" value={campaignUpdate.images} onChange={onChangeImagesHandler}>
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
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col offset={6}></Col>
                <Col span={18}>
                    <Button onClick={onUpdateCampaignHandler} type="primary">
                        Cập nhật
                    </Button>
                </Col>
            </Row>
        </Modal >
    )
}

const FormatText = (props) => {
    const formattedText = props.details?.replace(/\\n/g, '\n')

    return <TextArea
        rows={10}
        placeholder="Nhập chi tiết"
        value={formattedText}
        onChange={props.inputChangeHandler}
        name="details">{formattedText}</TextArea>;
};

export default ModalUpdateCampaign