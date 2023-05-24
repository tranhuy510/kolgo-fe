import React, { useState } from 'react'
import classes from './Campaign.module.css'
import ModalCampaignIsCreated from './ChienDich/CampaignIsCreated/ModalCampaignIsCreated';
import ModalCampaignIsProgress from './ChienDich/CampaignIsProgress/ModalCampaignIsProgress';
import ModalTaoChienDich from './ChienDich/CreateCampaign/ModalCreateCampaign';
import ModalCampaignIsParticipating from './ChienDich/CampaignIsParticipating/ModalCampaignIsParticipating'

const SubTab = (props) => {
    const [key, setKey] = useState(props.changeContent);

    if (key !== props.changeContent) {
        setKey(props.changeContent)
    }

    const components = [
        <ModalCampaignIsProgress />,
        <ModalCampaignIsParticipating />,
        <ModalTaoChienDich />,
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