import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Input, Select, Image, DatePicker, Upload, message, Col, Row } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import classes from '../../Campaign.module.css';
import CampaignContext from '../../../../context/campaign.context';

import { spreadDate, formatDate, convertStringToDateTime } from '../../../../services/DateTimeUtil';
import ImageSlider from '../../../../components/UI/ImageSlider/ImageSlider'
import { updateCampaign } from "../../../../services/CampaignService";
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYYMMDDHHmmss';


const ModalUpdateCampaign = ({ campaign, open, onCancelShowHandler }) => {
    const userCtx = useContext(CampaignContext);
    const [messageApi, contextHolder] = message.useMessage();

    const [campaignUpdate, setCampaignUpdate] = useState({
        name: "",
        timestamp: "",
        startTime: "",
        finishTime: "",
        location: "",
        description: "",
        details: "",
    });
    const [images, setImages] = useState([]);
    const [fieldIds, setFieldIds] = useState([]);
    const [dateCampaign, setDateCampaign] = useState();

    useEffect(() => {
        setCampaignUpdate({
            name: campaign.name,
            timestamp: campaign.timestamp,
            startTime: campaign.startTime,
            finishTime: campaign.finishTime,
            location: campaign.location,
            description: campaign.description,
            details: campaign.details,
        })
        setFieldIds(campaign.fieldIds)
        setImages(campaign.images)
        setDateCampaign({
            start: dayjs(campaign?.startTime, dateFormat),
            finish: dayjs(campaign?.finishTime, dateFormat),
        })
    }, [campaign])

    const inputChangeHandler = (event) => {
        setCampaignUpdate((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const onChangeFieldIdsHandler = (value) => {
        setFieldIds(value);
    };

    const handleFileChange = (event) => {
        setImages((prev) => {
            return [...prev, ...event.target.files];
        });
    };

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
        updateCampaign(campaign.id, campaignUpdate, images, fieldIds)
            .then(res => {
                if (res.error) {
                    messageApi.open({
                        type: 'error',
                        content: 'Cập nhập thất bại',
                    });
                }
                else
                    messageApi.open({
                        type: 'success',
                        content: 'Cập nhập thành công',
                    });
            })
    };

    return (
        <Modal
            width={1000}
            title=""
            open={open.status}
            onCancel={onCancelShowHandler}
            footer={[]}
        >
            {contextHolder}
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
                        onChange={onChangeFieldIdsHandler}
                        value={fieldIds}
                        options={optionFields}
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

            {/* Thời gian */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Thay đổi thời gian:</Col>
                <Col span={18}>
                    <RangePicker
                        style={{
                            width: "100%",
                        }}
                        onChange={onChangeDateHandler}
                        showTime
                        value={[dateCampaign?.start, dateCampaign?.finish]}
                        format={dateFormat}
                    />
                </Col>
            </Row>

            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Người tạo:</Col>
                <Col span={18}>
                    {campaign?.enterprise?.firstName} {campaign?.enterprise?.lastName}
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
                        value={campaignUpdate?.location}
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
                        value={campaignUpdate?.description}
                        onChange={inputChangeHandler}
                        name="description"
                    />
                </Col>
            </Row>


            {/* Chi tiet */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Chi tiết:</Col>
                <Col span={18}>
                    <FormatText details={campaignUpdate?.details} inputChangeHandler={inputChangeHandler} />
                </Col>
            </Row>

            {/* Ảnh */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Ảnh:</Col>
                <Col span={18}>
                    <div className={classes['moTa-list-image']}>
                        {campaign.images && campaign?.images?.map((image, index) => (
                            <div key={index} className={classes['wrap-image']} >
                                <Image src={`http://localhost:8080/api/images/${image}`} className={classes['list-image-item']} />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Thêm ảnh */}
            <Row style={{ margin: '20px 10px' }}>
                <Col span={6}>Thêm ảnh:</Col>
                <input
                    className={classes['input-image']}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                />
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