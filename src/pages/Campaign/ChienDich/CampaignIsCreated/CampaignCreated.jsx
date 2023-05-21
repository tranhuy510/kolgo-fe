import React, { useState } from 'react'
import classes from '../../Campaign.module.css'
import InformationCampaign from './InformationCampaign'
import { Button, Avatar } from 'antd'
import { Link } from 'react-router-dom';
import ModalUpdateCampaign from './ModalUpdateCampaign'



const CampaignCreated = ({ data }) => {
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
                    {data.author.avatar && <img
                        className={classes["anh"]}
                        src={data.author.avatar}
                        alt={data.tenchiendich}
                    />}
                    {!data.author.avatar && <Avatar shape="square" size={150}>
                        {!data.author.avatar && data.author.name.toUpperCase()}
                    </Avatar>}
                </div>
                <div className={classes["item-right"]}>
                    <div className={classes["item-right-top"]}>{data.tenchiendich}</div>
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
                data={data}
            />}

            {show.id === 2 && <ModalUpdateCampaign
                open={show}
                data={data}
                onCancelShowHandler={onCancelShowHandler}
            />}
        </div>
    )
}

export default CampaignCreated