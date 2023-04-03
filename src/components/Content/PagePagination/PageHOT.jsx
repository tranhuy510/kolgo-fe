import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios';
import styled from "styled-components";

const IMG = styled.img`
    width: 220px;
    height: 220px;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
`

const Name = styled.p`
    margin: 0;
    padding: 0 10px;
    font-weight: 500;
    line-height: 40px;
`

const CardKOL = styled.div`
    width: 220px;
    height: 280px;
    margin: 5px 0;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #ccc
`

const DivWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
`

const PageHOT = (props) => {

    const dataDemo1 = [
        {
            name: "thang",
            src: "https://playerduo.com/api/upload-service/images/c5c6c610-c3e5-4bc8-a7f1-a6916fe5ca5e__710914a0-adc0-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "thang",
            src: "https://playerduo.com/api/upload-service/images/c5c6c610-c3e5-4bc8-a7f1-a6916fe5ca5e__710914a0-adc0-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "thang",
            src: "https://playerduo.com/api/upload-service/images/c5c6c610-c3e5-4bc8-a7f1-a6916fe5ca5e__710914a0-adc0-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "thang",
            src: "https://playerduo.com/api/upload-service/images/c5c6c610-c3e5-4bc8-a7f1-a6916fe5ca5e__710914a0-adc0-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "thang",
            src: "https://playerduo.com/api/upload-service/images/c5c6c610-c3e5-4bc8-a7f1-a6916fe5ca5e__710914a0-adc0-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
    ]

    const dataDemo2 = [
        {
            name: "2",
            src: "https://playerduo.com/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__763b7b90-8460-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "2",
            src: "https://playerduo.com/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__763b7b90-8460-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "2",
            src: "https://playerduo.com/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__763b7b90-8460-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "2",
            src: "https://playerduo.com/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__763b7b90-8460-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
        {
            name: "2",
            src: "https://playerduo.com/api/upload-service/images/b236f856-16c0-408a-ad6b-6eed82e2f366__763b7b90-8460-11ed-a19f-23a3b10d190e__player_avatar.jpg"
        },
    ]

    const dataDemo3 = [
        {
            name: "3",
            src: "https://playerduo.com/api/upload-service/images/20115ac4-b3d2-4a54-9f14-cda26c9eed30__e552ce90-ec79-11ec-92ac-1b8d2f5bc2b5__player_avatar.jpg"
        },
        {
            name: "3",
            src: "https://playerduo.com/api/upload-service/images/20115ac4-b3d2-4a54-9f14-cda26c9eed30__e552ce90-ec79-11ec-92ac-1b8d2f5bc2b5__player_avatar.jpg"
        },
        {
            name: "3",
            src: "https://playerduo.com/api/upload-service/images/20115ac4-b3d2-4a54-9f14-cda26c9eed30__e552ce90-ec79-11ec-92ac-1b8d2f5bc2b5__player_avatar.jpg"
        },
        {
            name: "3",
            src: "https://playerduo.com/api/upload-service/images/20115ac4-b3d2-4a54-9f14-cda26c9eed30__e552ce90-ec79-11ec-92ac-1b8d2f5bc2b5__player_avatar.jpg"
        },
        {
            name: "3",
            src: "https://playerduo.com/api/upload-service/images/20115ac4-b3d2-4a54-9f14-cda26c9eed30__e552ce90-ec79-11ec-92ac-1b8d2f5bc2b5__player_avatar.jpg"
        },
    ]

    const data = [dataDemo1, dataDemo2, dataDemo3];
    const [listKolHot, setListKolHot] = useState(data[props.current - 1])

    useLayoutEffect(() => {
        setListKolHot(data[props.current - 1]);
    }, [props.current])

    // useEffect(() => {
    //     getData();
    // }, [props.current])

    // const getData = () => {
    //     axios.get(`http://localhost:3000/page/${props.current}`)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 setListKolHot(response.data)
    //             };
    //         });
    // }

    return (
        <DivWrap>
            {listKolHot?.map((item, index) => {
                return (
                    <CardKOL>
                        <IMG src={item.src} alt="" />
                        <Name>{item.name}</Name>
                    </CardKOL>
                )
            })}
        </DivWrap>
    )
}

export default PageHOT