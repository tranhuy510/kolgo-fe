import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Input, Select, Form, DatePicker, Upload, Cascader } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import classes from '../../Campaign.module.css';
import CampaignContext from '../../../../context/campaign.context';
import { getCities, getFields } from '../../../../services/getApi';
import UploadFile from "../UploadFile";

const { RangePicker } = DatePicker;
const { TextArea } = Input;


const ModalUpdateCampaign = ({ data, open, onCancelShowHandler }) => {
    const userCtx = useContext(CampaignContext);
    const [openChild, setOpenChild] = useState(false);

    const [nameCampaign, setNameCampaign] = useState(data.tenchiendich);
    const [avataMain, setAvataMain] = useState(data.anh)
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
    const [author, setAuthor] = useState(userCtx.user.userId)
    const [address, setAddress] = useState("")
    const [mota, setMota] = useState(data.mota);
    const [introduce, setIntroduce] = useState(data.introduce);
    const [listImages, setListImages] = useState([])

    const [cities, setCities] = useState([]);
    const [fields, setFileds] = useState([]);
    // const [componentDisabled, setComponentDisabled] = useState(true);

    useEffect(() => {
        getCities()
            .then(res => res.json())
            .then(data => setCities(data))

        getFields()
            .then(res => res.json())
            .then(data => setFileds(data))
    }, [])

    const openModalChild = () => {
        setOpenChild(true);
    };
    const closeModalChild = () => {
        setOpenChild(false);
    };

    const onUpdateCampaignHandler = () => {

        console.log(nameCampaign);
        console.log(avataMain);
        console.log(listFields);
        console.log(startDate);
        console.log(endDate);
        console.log(userCtx.user.id);
        console.log(address);
        console.log(mota);
        console.log(introduce);
        console.log(listImages);

    };

    const onChangeNameCampaignHandler = (e) => {
        setNameCampaign(e.target.value);
    };

    const onChangeAvataMainHandler = (data) => {
        setAvataMain(data);
    };

    const onChangeFieldsHandler = (value) => {
        setListFields(value);
    };

    const onChangeDateHandler = (value) => {
        setStartDate({
            day: value[0].$D,
            month: value[0].$M,
            year: value[0].$y,
            hours: 0,
            minute: 0,
            second: 0,
        })
        setEndDate({
            day: value[1].$D,
            month: value[1].$M,
            year: value[1].$y,
            hours: 23,
            minute: 0,
            second: 0,
        })
    }

    const onChangeAddressHandler = (value) => {
        setAddress(value)
    }

    const onChangeAuthorHandler = (value) => {
        setAuthor(userCtx.user.userId)
    }

    const onChangeMotaHandler = (e) => {
        setMota(e.target.value)
    }

    const onChangeIntroduceHandler = (e) => {
        setIntroduce(e.target.value)
    }

    const onChangeImagesHandler = (value) => {
        setListImages(value.fileList.map((item) => {
            return item.name
        }))
    }

    const optionFields = fields.map((c) => {
        return {
            value: c.id,
            label: c.name,
        };
    });

    const optionCities = cities.map((c) => {
        return {
            value: c.id,
            label: c.name,
        };
    });

    return (
        <Modal
            width={1000}
            title=""
            open={open.status}
            onCancel={onCancelShowHandler}
            footer={[

            ]}
        >
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
                        defaultValue={nameCampaign}
                    />
                </Form.Item>

                {/* Ảnh đại diện chiến dịch */}
                <Form.Item
                    label="Ảnh đại diện chiến dịch"
                    name="avataMain"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn ảnh đại diện cho chiến dịch!',
                        },
                    ]}
                >
                    <UploadFile
                        onChangeAvataMainHandler={onChangeAvataMainHandler}
                        defaultValue={avataMain}
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
                        onChange={onChangeFieldsHandler}
                        options={optionFields}
                        value={listFields}
                        defaultValue={data.linhvuc}
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
                    />
                </Form.Item>

                {/* người tạo */}
                <Form.Item
                    label="Người tạo"
                    name="author"
                >
                    {userCtx.user.firstName} {userCtx.user.lastName}
                </Form.Item>

                {/* địa chỉ */}
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn địa chỉ!',
                        },
                    ]}
                >
                    <Cascader
                        options={optionCities}
                        onChange={onChangeAddressHandler}
                        value={address}
                        defaultValue={data.address}
                    />
                </Form.Item>

                {/* mode: bật - cho kol/ent tham gia | tắt - ko cho tham gia */}
                {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

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
                        value={mota}
                        onChange={onChangeMotaHandler}
                        defaultValue={mota}
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
                        value={introduce}
                        onChange={onChangeIntroduceHandler}
                        defaultValue={introduce}
                    />
                </Form.Item>

                {/* Thêm ảnh */}
                <Form.Item
                    label="Thêm ảnh"
                    valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    rules={[
                        {
                            required: false,
                            message: 'Please choose your image!',
                        },
                    ]}
                >
                    <Upload listType="picture-card" value={listImages} onChange={onChangeImagesHandler}>
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
                    <Button type="primary" onClick={onUpdateCampaignHandler}>
                        Cập nhập
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalUpdateCampaign