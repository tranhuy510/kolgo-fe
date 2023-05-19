import React from 'react'
import { Modal, Descriptions, Image } from "antd";
import classes from './AccountKOL.module.css'

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
                    <Descriptions.Item label="Giới tính" span={3}>
                        {props.data?.gender === "MALE" ? "Nam" : "Nữ"}
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
                    <Descriptions.Item label="Ảnh đại diện" span={3}>
                        <Image src={`http://localhost:8080/api/images/${props.data?.avatar}`}>

                        </Image>
                    </Descriptions.Item>
                    <Descriptions.Item label="Khu vực" span={3}>
                        {props.data?.cityName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ cụ thể" span={3}>
                        {props.data?.details ? props.data?.details : "Chưa có"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Lĩnh vực" span={3}>
                        {props.data?.fieldNames ? props.data?.fieldNames : "Chưa có"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chi phí 1 bài viết" span={3}>
                        {props.data?.postPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chi phí 1 video" span={3}>
                        {props.data?.videoPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Facebook" span={3}>
                        {props.data?.facebookUrl}
                    </Descriptions.Item>
                    <Descriptions.Item label="Instagram" span={3}>
                        {props.data?.instagramUrl}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tiktok" span={3}>
                        {props.data?.tiktokUrl}
                    </Descriptions.Item>
                    <Descriptions.Item label="Youtube" span={3}>
                        {props.data?.youtubeUrl}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </Modal >
    )
}

export default ModalView