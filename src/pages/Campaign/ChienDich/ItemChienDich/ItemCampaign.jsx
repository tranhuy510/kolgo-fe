import React, { useState, useContext } from 'react'
import classes from '../../Campaign.module.css'
import { Button } from 'antd'

import InformationCampaign from "./InformationCampaign";
import CampaignContext from '../../../../context/campaign.context';
import Modals from "../../../../components/UI/Modal/Modals";

const ItemCampaign = ({ campaign }) => {
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

    return (
        <div className={classes['wrap-campaign-card-item']}>
            <div className={classes['campaign-card-item']}>
                {noti.status &&
                    <Modals status={noti.status} title={noti.title} content={noti.content} changeNotification={changeNotificationHandler} />
                }
                <img src={`http://localhost:8080/api/images/${campaign?.images[0]}`} alt="" />
                <div className={classes['card-item-context']}>
                    <h2>{campaign?.enterprise?.firstName} {campaign?.enterprise?.lastName}</h2>
                    <p>{campaign?.name}</p>
                    <div>
                        <Button onClick={onOpenModalHandler} className={classes['context-btn']}>Xem thêm</Button>
                    </div>
                </div>

                <InformationCampaign
                    openModal={openModal}
                    onCloseModalhandler={onCloseModalhandler}
                    campaign={campaign}
                />
            </div>
        </div>

    )
}

export default ItemCampaign