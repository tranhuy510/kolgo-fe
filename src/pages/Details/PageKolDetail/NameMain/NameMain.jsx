import React, { useState } from 'react'
import ButtonRadius from '../../../../components/UI/Button/ButtonRadius'
import { HeartOutlined } from '@ant-design/icons/lib/icons'
import classes from './NameMain.module.css'
import Modals from "../../../../components/UI/Modal/Modals";

const NameMain = ({ firstName, lastName, sumBook, sumCampaigns }) => {
    const [noti, setNoti] = useState({
        status: false,
        title: '',
    });

    const name = firstName?.toUpperCase() + ' ' + lastName?.toUpperCase();

    const createWarningNoti = () => {
        setNoti({ status: true, title: 'warning', message: 'Please login to like' })
    }

    const changeNotificationHandler = () => {
        setNoti({ status: false })
    }

    const checkLoginHandler = () => {
        const user = localStorage.getItem('user')
        if (!user) {
            createWarningNoti()
        }
    }

    return (

        <div className={classes['name-main']}>
            <div className={classes["name-main__header"]} >
                <span className={classes['header__name-kol']}
                >{name}</span>
                <ButtonRadius className={classes['header__button-like']} onClick={checkLoginHandler}>
                    <HeartOutlined />
                    <p>Yêu thích</p>
                </ButtonRadius>
                {noti.status &&
                    <Modals status={noti.status} title={noti.title} message={noti.message} changeNotification={changeNotificationHandler} />
                }
            </div>
            <div className={classes['name-main__bottom']} >
                <div className={classes['bottom-item']} >
                    <span className={classes['bottom-item__title']}>SỐ LƯỢT BOOK</span>
                    <span className={classes['bottom-item__content']}>{sumBook}</span>
                </div>
                <div className={classes['bottom-item']}>
                    <span className={classes['bottom-item__title']}>CHIẾN DỊCH THAM GIA</span>
                    <span className={classes['bottom-item__content']}>{sumCampaigns}</span>
                </div>
            </div>
        </div>
    )
}

export default NameMain