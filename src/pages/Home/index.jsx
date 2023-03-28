import React from "react";
import Header from "../../components/Header/index";
import SideBar from "../../components/SideBar/index";
import Content from "../../components/Content/Content";
import Footer from '../../components/Footer/Footer'

import Card from "../../components/UI/Card/Card";
import './style.css'

const Home = props => {

    return (
        <div>
            <Header />
            <SideBar />
            <Content />
            <Footer />
        </div>
    )
}

export default Home;