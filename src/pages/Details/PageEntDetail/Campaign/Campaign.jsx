import React, { useState } from 'react'

import classes from '../PageEntDetail.module.css'
import { EnvironmentFilled } from '@ant-design/icons'
import InformationCampaign from './InformationCampaign'

const Campaign = ({ campaigns }) => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})

    const onCloseModalhandler = () => {
        setShow(false);
    };

    return (
        <div className={classes['enterprise-detail-container']}>
            <div className={classes['enterprise-detail-campaign']}>
                {campaigns.map((campaign) => {
                    return (
                        <div className={classes["created-item"]}>
                            <div className={classes["item-right"]}>
                                <div className={classes["item-right-top"]} onClick={() => { setShow(true); setData(campaign) }}>{campaign?.name}</div>
                                <div className={classes["item-right-middle"]}><EnvironmentFilled /> {campaign?.location}</div>
                            </div>
                            <div className={classes["item-left"]} >
                                {campaign?.enterprise.avatar && <img
                                    className={classes["image"]}
                                    src={`http://localhost:8080/api/images/${campaign.images[0]}`}
                                    onClick={() => { setShow(true); setData(campaign) }}
                                    alt={campaign?.images[0]}
                                />}
                            </div>
                        </div>
                    )
                })}
            </div>
            <InformationCampaign campaign={data} openModal={show} onCloseModalhandler={onCloseModalhandler} />
        </div>
    )
}

export default Campaign