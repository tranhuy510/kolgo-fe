import React, { useState } from 'react'
import classes from './Campaign.module.css'
import ModalChienDichDaTao from './ChienDich/ChienDichDaTao/ModalChienDichDaTao';
import ModalDangThamGia from './ChienDich/Dangthamgia/ModalDangThamGia';
import ModalCampaignIsProgress from './ChienDich/CampaignIsProgress/ModalCampaignIsProgress';
import ModalTaoChienDich from './ChienDich/TaoChienDich/ModalTaoChienDich';

const SubTab = (props) => {
    const [key, setKey] = useState(props.changeContent);

    if (key !== props.changeContent) {
        setKey(props.changeContent)
    }

    const components = [
        <ModalCampaignIsProgress />,
        <ModalDangThamGia />,
        <ModalTaoChienDich />,
        <ModalChienDichDaTao />,
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