import React, { useState, useLayoutEffect } from 'react'
import RateDate from './RateDate';
import { Link } from 'react-router-dom';

import { Avatar, Rate } from "antd";

const Feedback = (props) => {

    function getRandomColorHex() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div className="form-danh-gia">
            <div className="title-danh-gia">Đánh giá:</div>
            <div className="rate">
                {props.danhgia &&
                    props.danhgia.length > 0 &&
                    props.danhgia.map((item) => {
                        const color = getRandomColorHex()
                        return (
                            <div key={item.enterpriseId} className="rate-item">
                                <div className="rate-item__avatar" style={{ border: `4px solid ${color}` }}>
                                    <Avatar size={64} src={item.avatar} >{item.avatar ? "" : item.name.charAt(0)?.toUpperCase()}</Avatar>
                                </div>
                                <div className="rate-item__content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="busines" style={{ color: color }}>
                                            <Link to={`/ents/${item.enterpriseId}`} style={{ color: color }}>{item.name}</Link>
                                        </div>
                                        <RateDate date={item.date} />
                                    </div>
                                    <Rate disabled value={item.rate} />
                                    <div className="content-is-rated">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div >
    )
}

export default Feedback