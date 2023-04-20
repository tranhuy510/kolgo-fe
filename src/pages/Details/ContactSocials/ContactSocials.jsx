import React from 'react'
import { Link } from 'react-router-dom'

import TiktokIcon from "../../../assets/icon/icon-tiktok.png";
import FacebookIcon from "../../../assets/icon/icon-facebook.png";
import IntagramIcon from "../../../assets/icon/icon-intagram.png";
import YoutubeIcon from "../../../assets/icon/youtube.png";

import classes from './ContactSocials.module.css'

const ContactSocials = ({ urls }) => {
    return (
        <div className={classes.socials}>
            <div className={classes['socials-item']}>
                <Link to={urls[0]} className={classes.icon}>
                    <img
                        src={FacebookIcon}
                        alt="icon-facebook"
                    />
                </Link>
                <div className={classes['socials-item_follow']}>
                    100000 - follow
                </div>
            </div>
            <div className={classes['socials-item']}>
                <Link to={urls[1]} className={classes.icon}>
                    <img
                        src={IntagramIcon}
                        alt="icon-intagram"
                    />
                </Link>
                <div className={classes['socials-item_follow']}>
                    100000 - follow
                </div>
            </div>
            <div className={classes['socials-item']}>
                <Link to={urls[2]} className={classes.icon}>
                    <img
                        src={TiktokIcon}
                        alt="icon-tiktok"
                    />
                </Link>
                <div className={classes['socials-item_follow']}>
                    100000 - follow
                </div>
            </div>
            <div className={classes['socials-item']}>
                <Link to={urls[3]} className={classes.icon}>
                    <img
                        src={YoutubeIcon}
                        alt="icon-youtube"
                    />
                </Link>
                <div className={classes['socials-item_follow']}>
                    100000 - follow
                </div>
            </div>
        </div>
    )
}

export default ContactSocials