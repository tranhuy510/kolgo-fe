import React, { useState } from 'react'
import classes from './Campaign.module.css'
import ModalChienDichDaTao from './ChienDich/ChienDichDaTao/ModalChienDichDaTao';
import ModalDangThamGia from './ChienDich/Dangthamgia/ModalDangThamGia';
import ModalDangDienRa from './ChienDich/DangDienRa/ModalDangDienRa';
import ModalTaoChienDich from './ChienDich/TaoChienDich/ModalTaoChienDich';

const SubTab = (props) => {
    const [key, setKey] = useState(props.changeContent);

    if (key !== props.changeContent) {
        setKey(props.changeContent)
    }

    const components = [
        <ModalDangDienRa />,
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