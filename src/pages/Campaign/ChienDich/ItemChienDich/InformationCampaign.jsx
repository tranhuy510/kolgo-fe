import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal, Descriptions, Image, Badge } from "antd";
import classes from '../../Campaign.module.css'

import { Link } from 'react-router-dom';
import Modals from '../../../../components/UI/Modal/Modals';
import CampaignContext from '../../../../context/campaign.context';
import { spreadDate } from '../../../../services/DateTimeUtil';
import { deleteCampaign, updateCampaignKolJoin, updateCampaignKolQuit } from '../../../../services/CampaignService';

const InformationCampaign = (props) => {
    const [campaign, setCampaign] = useState()
    const [statusCampaign, setStatusCampaign] = useState("")
    const [noti, setNoti] = useState({
        status: false,
        title: '',
        content: '',
    });
    const [joined, setJoined] = useState(false)
    const userCtx = useContext(CampaignContext);

    useEffect(() => {
        setCampaign(props.campaign)
    }, [props.campaign])

    useEffect(() => {
        if (userCtx.user) {
            if (userCtx.user?.role === 'KOL') {
                const find = campaign?.kols.find(kol => kol.id === userCtx.idRole)
                if (find) { setJoined("JOINED") }
                else setJoined("NOTJOIN")
            }
            if (userCtx.user?.role === 'ENTERPRISE') {
                if (campaign?.enterprise.userId === userCtx.user.id) { setJoined("CREATED") }
                else setJoined("GUEST")
            }
        }
        else setJoined("GUEST")
    }, [userCtx.user, campaign?.kols])

    useEffect(() => {
        if (campaign?.status === "UPCOMING") {
            setStatusCampaign({ status: "processing", name: 'Sắp diễn ra' })
        }
        else if (campaign?.status === "IN_PROGRESS") {
            setStatusCampaign({ status: "success", name: 'Đang diễn ra' })
        }
        else if (campaign?.status === "COMPLETED") {
            setStatusCampaign({ status: "default", name: 'Đã kết thúc' })
        }
    }, [campaign?.status])

    const changeNotificationHandler = () => {
        setNoti({ status: false })
    }

    const createSuccessNoti = (content) => {
        setNoti({ status: true, title: 'success', content: content })
    }

    const onQuitCampaignHandler = () => {
        updateCampaignKolQuit(campaign.id)
            .then((res) => {
                userCtx.setIsQuitCampaign(!userCtx.isQuitCampaign);
                createSuccessNoti('Bạn đã hủy tham gia chiến dịch!');
                setCampaign(res);
            })
    }

    const onJoinCampaignHandler = () => {
        updateCampaignKolJoin(campaign.id)
            .then((res) => {
                createSuccessNoti('Tham gia thành công!'); setCampaign(res);
            })
    };

    return (
        <Modal
            width={1000}
            title=""
            open={props.openModal}
            onCancel={props.onCloseModalhandler}
            footer={[]}
        >
            <div className={classes['modal-chienDich-thongTin']}>
                {noti.status &&
                    <Modals status={noti.status} title={noti.title} content={noti.content} changeNotification={changeNotificationHandler} />
                }
                <div className={classes['chienDich-thongTin-chiTiet']}>
                    <Descriptions title="CHI TIẾT CHIẾN DỊCH">
                        <Descriptions.Item label="Tên chiến dịch" span={3} className={classes['chiTiet-item-name']}>
                            {campaign?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái" span={3}>
                            <Badge status={statusCampaign.status} text={statusCampaign.name} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Người tổ chức" span={3}>
                            {campaign?.enterprise?.firstName} {campaign?.enterprise?.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian bắt đầu" span={3}>
                            {spreadDate(campaign?.startTime)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian kết thúc" span={3}>
                            {spreadDate(campaign?.finishTime)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lĩnh vực" span={3}>
                            {campaign?.fieldNames?.map((field, index) => (
                                <div key={index}>
                                    <Link to={`/field/${campaign?.fieldIds[index]}`}>{field}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="KOL tham gia" span={3}>
                            {campaign?.kols.map((kol, index) => (
                                <div key={index}>
                                    <Link key={kol.id} to={`/detail/kol/:${kol.id}`} > {kol.firstName} {kol.lastName}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Doanh nghiệp tham gia" span={3}>
                            {props.campaign.listEnter.map((item, index) => (
                                <div key={index}>
                                    <Link to={`/detail/enterprise/:${item.enterpriseId}`}>{item.name}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item> */}
                        <Descriptions.Item label="Địa chỉ" span={3}>
                            {campaign?.location}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className={classes['chienDich-thongTin-moTa']}>
                    <Descriptions title="MÔ TẢ CHIẾN DỊCH">
                        <Descriptions.Item className={classes['moTa-description']} span={3}>
                            {campaign?.description}
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <div className={classes['moTa-list-image']}>
                                {campaign?.images?.map((image, index) => (
                                    <div key={index} className={classes['wrap-image']}>
                                        <Image src={`http://localhost:8080/api/images/${image}`} className={classes['list-image-item']} />
                                    </div>
                                ))}
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Chi tiết" span={3}></Descriptions.Item>
                        <Descriptions.Item className={classes['moTa-introduce']} span={3}>
                            <FormatText details={campaign?.details} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            < div className={classes["bottom-infor-btn"]} >
                {joined !== "GUEST" && joined === "JOINED" && <Button className={classes["btn-tham-gia"]} onClick={onQuitCampaignHandler}>Hủy tham gia</Button>}
                {joined !== "GUEST" && joined === "NOTJOIN" && <Button className={classes["btn-tham-gia"]} onClick={onJoinCampaignHandler}>Tham gia</Button>}
            </ div>
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