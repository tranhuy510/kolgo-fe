import React, { useState, useContext } from 'react'
import classes from '../../Campaign.module.css'
import { Button } from 'antd'

import InformationCampaign from "./InformationCampaign";
import CampaignContext from '../../../../context/campaign.context';
import Modals from "../../../../components/UI/Modal/Modals";

const ItemCampaign = ({ data }) => {
    const [openModal, setOpenModal] = useState(false);
    const [noti, setNoti] = useState({
        status: false,
        title: '',
        content: '',
    });
    const userCtx = useContext(CampaignContext);

    const onCloseModalhandler = () => {
        setOpenModal(false);
    };

    const onOpenModalHandler = () => {
        setOpenModal(true);
    };

    const changeNotificationHandler = () => {
        setNoti({ status: false })
    }

    const createSuccessNoti = () => {
        setNoti({ status: true, title: 'success', content: 'Chiến dịch này bạn đã tham gia' })
    }

    const createErrorNoti = () => {
        setNoti({ status: true, title: 'error', content: 'Hãy đăng nhập' })
    }

    const onJoinHandler = () => {
        // addUserCampaign(userCtx.user, userCtx.idRole)
        //     .then((res) => createSuccessNoti();)
    };

    return (
        <div className={classes['campaign-card-item']}>
            {noti.status &&
                <Modals status={noti.status} title={noti.title} content={noti.content} changeNotification={changeNotificationHandler} />
            }
            <img src={'http://localhost:8080/api/images/accn1.jpg'} alt="" />
            <div className={classes['card-item-context']}>
                <h2>{data.author.name}</h2>
                <p>{data.introduce}</p>
                <div>
                    <Button onClick={onOpenModalHandler} className={classes['context-btn']}>Xem thêm</Button>
                </div>
            </div>

            <InformationCampaign
                openModal={openModal}
                onCloseModalhandler={onCloseModalhandler}
                data={data}
                onJoinHandler={onJoinHandler}
            />
        </div>
    )
}

export default ItemCampaign