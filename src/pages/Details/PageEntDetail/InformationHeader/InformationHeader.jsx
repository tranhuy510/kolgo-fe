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
                    src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/337375646_2365623916944182_907254926278634257_n.png?stp=dst-png_s960x960&_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=X7GZJ8wEk90AX_xRULV&_nc_ht=scontent-hkg4-1.xx&oh=00_AfDZCRv5GyxueNBtOZOnWQU3b3AcSnrmwdk7Lf4UlUVtIQ&oe=64498A48" alt=""
                />
            </div>
            <div className={classes['row-1-middle']}>
                <div className={classes['wrap-middle-avatar']}>
                    <img className={classes['middle-avatar']} src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/324588603_550887590419417_9151690991090339183_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IGHslF-6-DgAX9TFjcj&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfB3PBoG-MGYpzPB1QBwonx8YYLQjb-gZwUgXlyDgQcCqg&oe=644A269B" alt="" />
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