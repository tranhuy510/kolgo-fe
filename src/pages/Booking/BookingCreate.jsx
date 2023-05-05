import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchData, postData } from '../../services/common';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../services/DateTimeUtil';
import { BookingStatus } from '../../enums/BookingStatus';

const BookingCreate = () => {
    const navigate = useNavigate();
    const { kolId } = useParams();
    const [bookings, setBookings] = useState();
    const [booking, setBooking] = useState({
        date: "",
        postPrice: 0,
        postNumber: 0,
        videoPrice: 0,
        videoNumber: 0,
        totalPrice: 0,
        status: "",
        kolId: kolId
    });

    useEffect(() => {
        fetchData(`kols/${kolId}`)
            .then(res => setBooking(prev => ({
                ...prev,
                postPrice: res.postPrice,
                videoPrice: res.videoPrice
            })));
    }, []);

    const updateTotalPrice = (postPrice, postNumber, videoPrice, videoNumber) => {
        const totalPrice = postPrice * postNumber + videoPrice * videoNumber
        setBooking(prev => ({ ...prev, totalPrice }))
    }

    const handlePostNumberChange = (e) => {
        setBooking(prev => ({ ...prev, postNumber: e.target.value }));
        updateTotalPrice(booking.postPrice, e.target.value, booking.videoPrice, booking.videoNumber);
    }

    const handleVideoNumberChange = (e) => {
        setBooking(prev => ({ ...prev, videoNumber: e.target.value }));
        updateTotalPrice(booking.postPrice, booking.postNumber, booking.videoPrice, e.target.value);
    }

    const handleBooking = () => {
        booking.date = formatDate(new Date());
        booking.status = BookingStatus.PENDING;
        setBooking({ ...booking });
        postData("bookings", booking)
            .then(res => {
                console.log(res)
                if (!res.error) navigate(`/bookings/${res.id}`);

            })
    }

    return (
        <div style={{ padding: '100px 20px' }}>
            <div>
                <label htmlFor="postPrice">Post price</label>
                <label>${booking.postPrice}</label>
            </div>
            <div>
                <label htmlFor="postNumber">Post number</label>
                <input
                    type="number"
                    className="postNumber"
                    value={booking.postNumber}
                    min="0"
                    onChange={handlePostNumberChange}
                />
            </div>
            <div>
                <label htmlFor="postPrice">Post price</label>
                <label>${booking.videoPrice}</label>
            </div>
            <div>
                <label htmlFor="postNumber">Post number</label>
                <input
                    type="number"
                    className="postNumber"
                    value={booking.videoNumber}
                    min="0"
                    onChange={handleVideoNumberChange}
                />
            </div>
            <div>
                <label>Total: </label>
                <label>{booking.totalPrice}</label>
            </div>
            {!booking.status && <button onClick={handleBooking}>Book</button>}
        </div>
    );
};

export default BookingCreate;
