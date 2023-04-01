import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spin, Avatar } from "antd";

import DidLogin from '../BtnLogin/DidLogin';
import NotLogin from '../BtnNotLogin/NotLogin';
import MenuGuest from "./Menu/MenuGuest";
import MenuKOL from "./Menu/MenuKOL";
import MenuEnterprise from "./Menu/MenuEnterprise";

import logo from '../../assets/logo/logo_KOLgo-removebg.svg'
import home from '../../assets/logo/icon-home.svg'
import campaign from '../../assets/logo/icon-compaign.svg'
import chat from '../../assets/logo/icon-chat.svg'
import "./style.css"

const Header = props => {
    const navigate = useNavigate();
    const [user, setUser] = useState(false)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        console.log(user);
    }, [])

    const logOutHandler = () => {
        localStorage.removeItem('user')
        window.location.replace('http://localhost:3000/')
        // navigate('./')
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
                {!user && <MenuGuest icons={[home, campaign]} />}
                {user && user[0]?.role === 'kol' && <MenuKOL icons={[home, campaign, chat]} />}
                {user && user[0]?.role === 'enterprise' && <MenuEnterprise icons={[home, campaign, chat]} />}
            </div>
            <div className='header__button'>
                {user && <div className="avata">
                    <Avatar src={user[0]?.image}>{user[0]?.image ? '' : user[0]?.name.charAt(0)?.toUpperCase()}</Avatar>
                </div>}
                {user ? <DidLogin logOutHandler={logOutHandler} /> : <NotLogin loginHandler={loginHandler} registerHandler={registerHandler} />}
            </div>
        </div>
    )

}

export default Header;