import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Button, Modal, Input, Select, Form, Skeleton, Upload, Cascader } from "antd";
import { getEntFields } from '../../../../services/FieldService';
import { getCities } from '../../../../services/CityService';

const ModalUpdate = ({ openUpdate, onCloseUpdateModalHandler, data }) => {

    const [listFields, setListFields] = useState([])
    const [listCities, setListCities] = useState([])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [taxId, setTaxId] = useState("")
    const [fields, setFields] = useState(null)
    const [city, setCity] = useState(null)
    const [addressDetail, setAddressDetail] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useLayoutEffect(() => {
        setFirstName(data.user?.firstName)
        setLastName(data.user?.lastName)
        setName(data?.name)
        setPhone(data?.phone)
        setTaxId(data?.taxId)
        setFields(data.field?.id)
        setCity(data?.address?.city?.id)
        setAddressDetail(data?.address?.details)

        setIsLoading(true)
    }, [data])

    console.log(firstName);
    useEffect(() => {
        getEntFields().then((res) => { setListFields(res) })
        getCities().then((res) => { setListCities(res) })
    }, [])

    const onChangefirstNameHandler = (e) => {
        setFirstName(e.target.value)
    }

    const onChangelastNameHandler = (e) => {
        setLastName(e.target.value)
    }

    const onChangeNameHandler = (e) => {
        setName(e.target.value)
    }

    const onChangePhoneHandler = (e) => {
        setPhone(e.target.value)
    }

    const onChangeTaxIdHandler = (e) => {
        setTaxId(e.target.value)
    }

    const onChangeFieldsHandler = (value) => {
        setFields(value);
    };

    const optionFields = listFields.map((field) => {
        return {
            value: field.id,
            label: field.name,
        };
    });

    const onChangeCityHandler = (value) => {
        setCity(value);
    };

    const optionCities = listCities.map((city) => {
        return {
            value: city.id,
            label: city.name,
        };
    });

    const onChangeAddressDetailHandler = (e) => {
        setAddressDetail(e.target.value);
    };

    const onUpdate = () => {
        console.log(firstName);
        console.log(lastName);
        console.log(name);
        console.log(phone);
        console.log(taxId);
        console.log(fields);
        console.log(city);
        console.log(addressDetail);

        // onUpdateHandler({
        //     firstName: firstName,
        //     lastName: lastName,
        //     name: name,
        //     phone: phone,
        //     taxId: taxId,
        //     fields: fields,
        //     city: city,
        //     addressDetail: addressDetail
        // })
    }

    return (
        <Modal
            width={1000}
            title=""
            open={openUpdate}
            onCancel={onCloseUpdateModalHandler}
            footer={[]}
        >
            {!isLoading && (<Skeleton active />)}
            {isLoading &&
                <Form
                    name="basic"
                    labelCol={{ span: 4, }}
                    wrapperCol={{ span: 19, }}
                    style={{ minWidth: 600, maxWidth: 920, }}
                    initialValues={{ remember: false }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên"
                        name="firstName"
                        rules={[{ required: true, message: 'Không được để trống tên!' }]}
                    >
                        <Input
                            rows={2}
                            placeholder="Nhập tên"
                            onChange={onChangefirstNameHandler}
                            value={firstName}
                        // defaultValue={firstName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Họ"
                        name="lastName"
                        rules={[{ required: true, message: 'Không được để trống họ!' }]}
                    >
                        <Input
                            rows={2}
                            placeholder="Nhập họ"
                            onChange={onChangelastNameHandler}
                            value={lastName}
                            defaultValue={lastName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tên doanh nghệp"
                        name="name"
                        rules={[{ required: true, message: 'Không được để trống tên doanh nghiệp!' }]}
                    >
                        <Input
                            rows={2}
                            placeholder="Nhập tên doanh nghệp"
                            onChange={onChangeNameHandler}
                            value={name}
                            defaultValue={name}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Không được để trống số điện thoại!' }]}
                    >
                        <Input
                            rows={2}
                            placeholder="Nhập số điện thoại"
                            onChange={onChangePhoneHandler}
                            value={phone}
                            defaultValue={phone}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mã số thuế"
                        name="taxId"
                        rules={[{ required: true, message: 'Không được để trống mã số thuế!' }]}
                    >
                        <Input
                            rows={2}
                            placeholder="Nhập mã số thuế"
                            onChange={onChangeTaxIdHandler}
                            value={taxId}
                            defaultValue={taxId}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Lĩnh vực"
                        name="fields"
                        rules={[{ required: true, message: 'Không được để trống lĩnh vực!' }]}
                    >
                        <Cascader
                            options={optionFields}
                            onChange={onChangeFieldsHandler}
                            value={fields}
                            defaultValue={fields}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="city"
                        rules={[{ required: true, message: 'Hãy chọn địa chỉ!' }]}
                    >
                        <Cascader
                            options={optionCities}
                            onChange={onChangeCityHandler}
                            value={city}
                            defaultValue={city}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ cụ thể"
                        name="addressDetail"
                        rules={[{ required: false, message: 'Không được để trống mã số thuế!' }]}
                    >
                        <Input
                            rows={2}
                            placeholder="Nhập địa chỉ cụ thể"
                            onChange={onChangeAddressDetailHandler}
                            value={addressDetail}
                            defaultValue={addressDetail}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 15,
                        }}
                    >
                        <Button type="primary" onClick={onUpdate}>
                            Cập nhập
                        </Button>
                    </Form.Item>
                </Form>}
        </Modal>
    )
}

export default ModalUpdate