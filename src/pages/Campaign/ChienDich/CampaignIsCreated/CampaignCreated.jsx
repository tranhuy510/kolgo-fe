import React, { useState } from 'react'
import classes from '../../Campaign.module.css'
import InformationCampaign from './InformationCampaign'
import { Button, Avatar } from 'antd'
import { Link } from 'react-router-dom';
import ModalUpdateCampaign from './ModalUpdateCampaign'
import { EnvironmentFilled } from '@ant-design/icons';


const CampaignCreated = ({ campaign }) => {
    const [show, setShow] = useState({
        id: 0,
        status: false,
    })

    const onCancelShowHandler = () => {
        setShow({
            id: 0,
            status: false,
        });
    };

    return (
        <div className={classes["created-campaign-container"]}>
            <div className={classes["created-item"]}>
                <div className={classes["item-left"]} >
                    {campaign?.enterprise.avatar && <img
                        className={classes["image"]}
                        src={`http://localhost:8080/api/images/${campaign.enterprise.avatar}`}
                        onClick={() => { setShow({ id: 1, status: true }) }}
                        alt={campaign?.enterprise.avatar}
                    />}
                    {!campaign?.enterprise.avatar && <Avatar shape="square" size={150}>
                        {campaign?.enterprise?.firstName ? `${campaign?.enterprise?.firstName}` : ''}
                    </Avatar>}
                </div>
                <div className={classes["item-right"]}>
                    <div className={classes["item-right-top"]} onClick={() => { setShow({ id: 1, status: true }) }}>{campaign?.name}</div>
                    <div className={classes["item-right-middle"]}><EnvironmentFilled /> {campaign?.location}</div>
                    < div className={classes["item-right-bottom"]} >
                        <Button className={classes["bottom-btn"]} >Xóa</Button>
                        <Button className={classes["bottom-btn"]} onClick={() => { setShow({ id: 2, status: true }) }}>Sửa</Button>
                        <Button className={classes["bottom-btn"]} onClick={() => { setShow({ id: 1, status: true }) }}>Xem</Button>
                    </ div>
                </div>
            </div>

            {show.id === 1 && <InformationCampaign
                open={show}
                onCancelShowHandler={onCancelShowHandler}
                campaign={campaign}
            />}

            {show.id === 2 && <ModalUpdateCampaign
                open={show}
                campaign={campaign}
                onCancelShowHandler={onCancelShowHandler}
            />}
        </div>
    )
}

export default CampaignCreated