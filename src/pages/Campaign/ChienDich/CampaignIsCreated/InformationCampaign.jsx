import React, { useState, useContext, useEffect } from 'react'
import { Modal, Descriptions, Image, Badge } from "antd";
import classes from '../../Campaign.module.css'

import { Link } from 'react-router-dom';
import CampaignContext from '../../../../context/campaign.context';
import { spreadDate } from '../../../../services/DateTimeUtil';

const InformationCampaign = (props) => {
    const [statusCampaign, setStatusCampaign] = useState("")
    const userCtx = useContext(CampaignContext);

    useEffect(() => {
        if (props.campaign?.status === "UPCOMING") {
            setStatusCampaign({ status: "processing", name: 'Sắp diễn ra' })
        }
        else if (props.campaign?.status === "IN_PROGRESS") {
            setStatusCampaign({ status: "success", name: 'Đang diễn ra' })
        }
        else if (props.campaign?.status === "COMPLETED") {
            setStatusCampaign({ status: "default", name: 'Đã kết thúc' })
        }
    }, [props.campaign?.status])


    return (
        <Modal
            width={1000}
            title=""
            open={props.open.status}
            onCancel={props.onCancelShowHandler}
            footer={[]}
        >
            <div className={classes['modal-chienDich-thongTin']}>
                <div className={classes['chienDich-thongTin-chiTiet']}>
                    <Descriptions title="CHI TIẾT CHIẾN DỊCH">
                        <Descriptions.Item label="Tên chiến dịch" span={3} className={classes['chiTiet-item-name']}>
                            {props.campaign?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái" span={3}>
                            <Badge status={statusCampaign.status} text={statusCampaign.name} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Người tổ chức" span={3}>
                            {props.campaign?.enterprise?.firstName} {props.campaign?.enterprise?.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian bắt đầu" span={3}>
                            {spreadDate(props.campaign?.startTime)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian kết thúc" span={3}>
                            {spreadDate(props.campaign?.finishTime)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lĩnh vực" span={3}>
                            {props.campaign?.fieldNames?.map((field, index) => (
                                <div key={index}>
                                    <Link to={`/field/${props.campaign?.fieldIds[index]}`}>{field}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="KOL tham gia" span={3}>
                            {props.campaign?.kols.map((kol, index) => (
                                <div key={index}>
                                    <Link key={kol.id} to={`/detail/kol/:${kol.id}`} > {kol.firstName} {kol.lastName}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Doanh nghiệp tham gia" span={3}>
                            {props.campaign?.listEnter.map((item, index) => (
                                <div key={index}>
                                    <Link to={`/detail/enterprise/:${item.enterpriseId}`}>{item.name}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item> */}
                        <Descriptions.Item label="Địa chỉ" span={3}>
                            {props.campaign?.location}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className={classes['chienDich-thongTin-moTa']}>
                    <Descriptions title="MÔ TẢ CHIẾN DỊCH">
                        <Descriptions.Item className={classes['moTa-description']} span={3}>
                            {props.campaign?.description}
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <div className={classes['moTa-list-image']}>
                                {props.campaign?.images?.map((image, index) => (
                                    <div key={index} className={classes['wrap-image']} >
                                        <Image src={`http://localhost:8080/api/images/${image}`} className={classes['list-image-item']} />
                                    </div>
                                ))}
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Chi tiết" span={3}></Descriptions.Item>
                        <Descriptions.Item className={classes['moTa-introduce']} span={3}>
                            <FormatText details={props.campaign?.details} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        </Modal >
    )
}

const FormatText = (props) => {
    const formattedText = props.details?.replace(/\\n/g, '\n').split('\n').map((line, index) => {
        return (
            <React.Fragment key={index}>

                {line}
                <br /><br />
            </React.Fragment>
        );
    });
    return <div>{formattedText}</div>;
};

export default InformationCampaign