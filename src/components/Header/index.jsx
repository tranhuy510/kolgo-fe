import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DidLogin from '../BtnLogin/DidLogin';
import NotLogin from '../BtnNotLogin/NotLogin';
import { Spin, Avatar } from "antd";

import logo from '../../assets/logo/logo_KOLgo-removebg.svg'
import home from '../../assets/logo/icon-home.svg'
import campaign from '../../assets/logo/icon-compaign.svg'
import chat from '../../assets/logo/icon-chat.svg'
import "./style.css"

const Header = props => {
    const navigate = useNavigate();
    const [user, setUser] = useState(false)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("account")));
        console.log(user);
    }, [])

    const logOutHandler = () => {
        localStorage.removeItem('account')
        // window.location.replace('http://localhost:3000/')
        navigate('./')
    }

    const loginHandler = () => {
        navigate('/login')
    }

    const registerHandler = () => {
        navigate('/register')
    }

    return (
        <div className='header'>
            <div className='header__icon'>
                <a href="/"><img className='icon-logo' src={logo} alt="" /></a>
            </div>
            <div className='header__room'>
                {!user && (
                    <div className="room-guest">
                        <div className="icon-room-guest">
                            <a href="#" className="icon-home">
                                <img src={home} alt="" />
                                <label>Home</label>
                            </a>
                        </div>
                        <div className="icon-room-guest">
                            <a href="#" className="icon-campaign">
                                <img src={campaign} alt="" />
                                <label>Campaign</label>
                            </a>
                        </div>
                    </div>
                )}
                {user && user[0]?.role === 'kol' && (
                    <div className="room-guest">
                        <div className="icon-room-guest">
                            <a href="#" className="icon-home">
                                <img src={home} alt="" />
                                <label>Home</label>
                            </a>
                        </div>
                        <div className="icon-room-guest">
                            <a href="#" className="icon-campaign">
                                <img src={campaign} alt="" />
                                <label>Campaign</label>
                            </a>
                        </div>
                        <div className="icon-room-guest">
                            <a href="#" className="icon-campaign">
                                <img src={chat} alt="" />
                                <label>Chat</label>
                            </a>
                        </div>
                    </div>
                )}
                {user && user[0]?.role === 'enterprise' && (
                    <div className="room-guest">
                        <div className="icon-room-guest">
                            <a href="#" className="icon-home">
                                <img src={home} alt="" />
                                <label>Home</label>
                            </a>
                        </div>
                        <div className="icon-room-guest">
                            <a href="#" className="icon-campaign">
                                <img src={campaign} alt="" />
                                <label>Campaign</label>
                            </a>
                        </div>
                        <div className="icon-room-guest">
                            <a href="#" className="icon-campaign">
                                <img src={chat} alt="" />
                                <label>Chat</label>
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <div className='header__button'>
                {user && <div className="avata">
                    <Avatar src={user[0]?.image}>{user[0]?.image ? '' : user[0].name.charAt(0)?.toUpperCase()}</Avatar>
                </div>}
                {user ? <DidLogin logOutHandler={logOutHandler} /> : <NotLogin loginHandler={loginHandler} registerHandler={registerHandler} />}
            </div>
        </div>
    )

}

export default Header;