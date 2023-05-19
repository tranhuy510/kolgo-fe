import React, { useState } from 'react'
import classes from '../PageEntDetail.module.css'

const InformationHeader = ({ infoEnt, onClickShowHandler }) => {
    const [isActive, setIsActive] = useState(false);

    function onActiveHandler(index) {
        setIsActive(index)
        onClickShowHandler(index)
    }

    return (
        <div className={classes['enterprise-detail-header']}>
            <div className={classes['row-1-header-banner']}>
                <img
                    className={classes['header-banner-img']}
                    src={`http://localhost:8080/api/images/${infoEnt?.avatar}`}
                />
            </div>
            <div className={classes['row-1-middle']}>
                <div className={classes['wrap-middle-avatar']}>
                    <img className={classes['middle-avatar']} src={`http://localhost:8080/api/images/${infoEnt?.avatar}`} alt="" />
                </div>
                <div className={classes['middle-name']}>
                    <h1>{infoEnt?.firstName} {infoEnt?.lastName}</h1>
                    <p>{infoEnt?.name}</p>
                </div>
            </div>
            <div className={classes['row-1-bottom']} >
                <div className={`${classes["wrap-bottom-btn"]} ${isActive === 0 ? classes.active : ""}`}>
                    <button className={classes['bottom-btn']} onClick={() => onActiveHandler(0)}>Giới thiệu</button>
                </div>
                <div className={`${classes["wrap-bottom-btn"]} ${isActive === 1 ? classes.active : ""}`} >
                    <button className={classes['bottom-btn']} onClick={() => onActiveHandler(1)}>Hoạt động</button>
                </div>
                <div className={`${classes["wrap-bottom-btn"]} ${isActive === 2 ? classes.active : ""}`}>
                    <button className={classes['bottom-btn']} onClick={() => onActiveHandler(2)}>Chiến dịch</button>
                </div>
            </div>
        </div>
    )
}

export default InformationHeader