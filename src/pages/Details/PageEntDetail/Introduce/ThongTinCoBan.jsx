import React from 'react'

import classes from '../PageEntDetail.module.css'
import { HomeFilled, PhoneFilled, MailFilled, LinkOutlined, LinkedinOutlined } from '@ant-design/icons'

const ThongTinCoBan = (props) => {
    return (
        <div >
            <div className={classes['coban-item']}>
                <h2>Hạng mục</h2>
                <p>Công ty phần mềm</p>
            </div>
            <div className={classes['coban-item']}>
                <h2>Thông tin liên hệ</h2>
                <div className={classes['coban-item-img']}></div>
                <div className={classes['coban-item-address']}>
                    <div style={{ marginRight: '10px' }}><HomeFilled style={{ fontSize: '30px', opacity: '0.6', lineHeight: '45px' }} /></div>
                    <div>
                        <div style={{ fontSize: '20px' }}>7 Phan Châu Trinh, Da Nang, Vietnam, 550000</div>
                        <div>Địa chỉ</div>
                    </div>
                </div>
                <div className={classes['coban-item-phone']}>
                    <div style={{ marginRight: '10px' }}><PhoneFilled style={{ fontSize: '30px', opacity: '0.6', lineHeight: '45px' }} /></div>
                    <div>
                        <div style={{ fontSize: '20px' }}>0236 3531 773</div>
                        <div>Di động</div>
                    </div>
                </div>
                <div className={classes['coban-item-email']}>
                    <div style={{ marginRight: '10px' }}><MailFilled style={{ fontSize: '30px', opacity: '0.6', lineHeight: '45px' }} /></div>
                    <div>
                        <div style={{ fontSize: '20px' }}>{props.infoEnt?.email}</div>
                        <div>Email</div>
                    </div>
                </div>
            </div>
            <div className={classes['coban-item']}>
                <h2>Các trang web và liên kết xã hội</h2>
                <div className={classes['coban-item-web']}>
                    <div style={{ marginRight: '10px' }}><LinkOutlined style={{ fontSize: '30px', opacity: '0.6', lineHeight: '45px' }} /></div>
                    <div>
                        <div style={{ fontSize: '20px' }}>https://mgmtp.recruiterbox.com/?country=Vietnam</div>
                        <div>Trang web</div>
                    </div>
                </div>
                <div className={classes['coban-item-linkedIn']}>
                    <div style={{ marginRight: '10px' }}><LinkedinOutlined style={{ fontSize: '30px', opacity: '0.6', lineHeight: '45px' }} /></div>
                    <div>
                        <div style={{ fontSize: '20px' }}>www.linkedin.com/company/mgm-technology-partners-vietnam-co-ltd   </div>
                        <div>LinkedIn</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThongTinCoBan