import React, { useState } from 'react'
import classes from './Campaign.module.css'
import ModalCampaignIsCreated from './ChienDich/CampaignIsCreated/ModalCampaignIsCreated';
import ModalCampaignIsProgress from './ChienDich/CampaignIsProgress/ModalCampaignIsProgress';
import ModalCampaignIsParticipating from './ChienDich/CampaignIsParticipating/ModalCampaignIsParticipating'
import ModalCreateCampaign from './ChienDich/CreateCampaign/ModalCreateCampaign'

const SubTab = (props) => {
    const [key, setKey] = useState(props.changeContent);
    const [isCampaignAdded, setIsCampaignAdded] = useState(false);

    if (key !== props.changeContent) {
        setKey(props.changeContent)
    }

    const components = [
        <ModalCampaignIsProgress isCampaignAdded={isCampaignAdded} />,
        <ModalCampaignIsParticipating isCampaignAdded={isCampaignAdded} />,
        <ModalCreateCampaign setIsCampaignAdded={setIsCampaignAdded} isCampaignAdded={isCampaignAdded} />,
        <ModalCampaignIsCreated />,
        <div>Đang có</div>,
        <div>Đang tham gia</div>,
    ]

    return (
        <div className={classes['sub-tab']}>
            {components.map((component, index) => {
                if (index == key) {
                    return component
                }
            })}
        </div>
    )
}

export default SubTab