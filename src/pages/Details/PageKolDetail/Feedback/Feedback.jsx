import React, { useState, useLayoutEffect } from 'react'
import RateDate from './RateDate';
import { Link } from 'react-router-dom';

import { Avatar, Rate } from "antd";
import { spreadDate } from '../../../../services/DateTimeUtil';

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
                {props.bookings?.map((booking) => {
                    if (booking.feedback !== null) {
                        const color = getRandomColorHex()
                        return (
                            <div key={booking.user.id} className="rate-item">
                                <div className="rate-item__avatar" style={{ border: `4px solid ${color}` }}>
                                    <Avatar size={64} src={`http://localhost:8080/api/images/${booking.user.avatar}`} >{booking.user.avatar ? "" : booking.user.name.charAt(0)?.toUpperCase()}</Avatar>
                                </div>
                                <div className="rate-item__content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="busines" style={{ color: color }}>
                                            <Link to={`/ents/${booking.user.id}`} style={{ color: color }}>{booking.user.firstName} {booking.user.lastName}</Link>
                                        </div>
                                        <div style={{ color: color }}>{spreadDate(booking.timestamp)}</div>
                                    </div>

                                    <Rate disabled value={booking.feedback?.rating} />
                                    <div className="content-is-rated">
                                        {booking.feedback?.comment}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div >
    )
}

export default Feedback