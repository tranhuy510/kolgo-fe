import React, { useState } from 'react'

import classes from '../PageEntDetail.module.css'

import ThongTinCoBan from './ThongTinCoBan';
import ThongTinChiTiet from './ThongTinChiTiet';

const SubContentIntroduce = (props) => {
    const [key, setKey] = useState(props.changeContent);

    if (key !== props.changeContent) {
        setKey(props.changeContent)
    }

    const components = [
        <ThongTinCoBan infoEnt={props.infoEnt} />,
        <ThongTinChiTiet infoEnt={props.infoEnt} />,
    ]

    return (
        <div className={classes['sub-content-introduce']} style={{ width: '100%' }}>
            {components.map((component, index) => {
                if (index == key) {
                    return component
                }
            })}
        </div>
    )
}

export default SubContentIntroduce