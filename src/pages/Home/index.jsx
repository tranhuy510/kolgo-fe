import React from "react";
import Header from "../../components/Header/index";
import SideBar from "../../components/SideBar/index";

import Card from "../../components/UI/Card/Card";
import './style.css'

const Home = props => {

    return (
        <div>
            <Header />
            <SideBar />
        </div>
    )
}

export default Home;