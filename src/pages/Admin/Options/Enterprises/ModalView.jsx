import React from 'react'
import { Modal, Descriptions, Image } from "antd";
import classes from './AccountEnterprises.module.css'

const ModalView = (props) => {
    return (
        <Modal
            width={1000}
            title=""
            open={props.openView}
            onCancel={props.onCloseViewHandler}
            footer={[]}
        >
            <div className={classes['admin-modal-view']}>
                <Descriptions title="Thông tin chi tiết">
                    <Descriptions.Item label="Tên" span={3} className={classes['view-item-name']}>
                        {props.data?.firstName} {props.data?.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vai trò" span={3}>
                        {props.data?.role}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>
                        {props.data?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại" span={3}>
                        {props.data?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã số thuế" span={3}>
                        {props.data?.taxId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên doanh nghiệp" span={3}>
                        {props.data?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ảnh" span={3}>
                        <Image src={`http://localhost:8080/api/images/${props.data?.avatar}`}>
                            {/* {props.data?.avatar ? "" : props.data?.firstName.charAt(0)?.toUpperCase()} */}
                        </Image>
                    </Descriptions.Item>
                    <Descriptions.Item label="Lĩnh vực" span={3}>
                        {props.data?.fieldName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Khu vực" span={3}>
                        {props.data?.cityName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ cụ thể" span={3}>
                        {props.data?.addressDetails}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </Modal >
    )
}

export default ModalView