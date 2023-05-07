import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal, Descriptions, Image, Badge } from "antd";
import classes from '../../Campaign.module.css'
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import Modals from '../../../../components/UI/Modal/Modals';
import CampaignContext from '../../../../context/campaign.context';


const ThongTinChienDich = (props) => {
    const [noti, setNoti] = useState({
        status: false,
        title: '',
        content: '',
    });
    const [joined, setJoined] = useState(false)
    const userCtx = useContext(CampaignContext);

    const changeNotificationHandler = () => {
        setNoti({ status: false })
    }

    const createSuccessNoti = () => {
        setNoti({ status: true, title: 'success', content: 'Bạn đã hủy chiến dịch thành công' })
    }

    const cancelJoinHandler = () => {
        createSuccessNoti();
    }

    const regex = /(.*)\s\((.*)\)/;

    useEffect(() => {
        if (userCtx.user?.role === 'KOL') {
            setJoined(props.data.listKOL.find(item => item.kolId === userCtx.idRole))
        }
        if (userCtx.user?.role === 'ENTERPRISE') {
            setJoined(props.data.listEnter.find(item => item.kolId === userCtx.enterpriseId))
        }
    }, [userCtx])


    return (
        <Modal
            width={1000}
            title=""
            open={props.openThongTin}
            onCancel={props.handleCancelThongTin}
            footer={[

            ]}
        >
            <div className={classes['modal-chienDich-thongTin']}>
                {noti.status &&
                    <Modals status={noti.status} title={noti.title} content={noti.content} changeNotification={changeNotificationHandler} />
                }
                <div className={classes['chienDich-thongTin-chiTiet']}>
                    {/* <span className={classes["chienDich-item-title"]}>CHI TIẾT CHIẾN DỊCH</span> */}
                    <Descriptions title="CHI TIẾT CHIẾN DỊCH">
                        <Descriptions.Item label="Tên chiến dịch" span={3} className={classes['chiTiet-item-name']}>
                            {props.data.tenchiendich}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái" span={3}>
                            <Badge status={props.data.trangthai?.status} text={props.data.trangthai?.name} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Người tổ chức" span={3}>
                            {props.data.author.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian" span={3}>
                            {`${format(
                                new Date(props.data.batdau),
                                "dd/MM/yyyy"
                            )} - ${format(
                                new Date(props.data.ketthuc),
                                "dd/MM/yyyy"
                            )}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lĩnh vực" span={3}>
                            {props.data.linhvuc.map((item) => (
                                <div key={item.id}>
                                    <Link to={`/fields/kol/:${item.id}`}>{item.name.match(regex)[1]}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="KOL tham gia" span={3}>
                            {props.data.listKOL.map((item, index) => (
                                <div key={index}>
                                    <Link key={item.kolId} to={`/detail/kol/:${item.kolId}`} > {item.name}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="Doanh nghiệp tham gia" span={3}>
                            {props.data.listEnter.map((item, index) => (
                                <div key={index}>
                                    <Link to={`/detail/enterprise/:${item.enterpriseId}`}>{item.name}</Link> ,
                                </div>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={3}>
                            {props.data.address}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className={classes['chienDich-thongTin-moTa']}>
                    {/* <span className={classes["chienDich-item-title"]}>MÔ TẢ CHIẾN DỊCH</span> */}
                    <Descriptions title="MÔ TẢ CHIẾN DỊCH">
                        <Descriptions.Item className={classes['moTa-description']} span={3}>
                            {props.data?.mota}
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <div className={classes['moTa-list-image']}>
                                {props.data.listImage?.map((item, index) => (
                                    <div key={index} >
                                        <Image src={item.src} className={classes['list-image-item']} />
                                    </div>
                                ))}
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item className={classes['moTa-introduce']} span={3}>
                            {props.data?.introduce}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            < div className={classes["bottom-infor-btn"]} >
                {joined && <Button className={classes["btn-tham-gia"]} onClick={cancelJoinHandler}>Hủy tham gia</Button>}
                {!joined && <Button className={classes["btn-tham-gia"]} onClick={props.joinHandler}>Tham gia</Button>}
            </ div>
        </Modal >
    )
}

export default ThongTinChienDich