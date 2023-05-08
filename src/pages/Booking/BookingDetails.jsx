import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooking } from '../../services/BookingService';
import { BookingStatus } from '../../utils/Enums';
import { createVnPayPayment } from '../../services/PaymentService';
import { Descriptions, Button } from 'antd';
import classes from './Booking.module.css'

const BookingDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        id: '',
        date: '',
        postPrice: 0,
        postNumber: 0,
        videoPrice: 0,
        videoNumber: 0,
        totalPrice: 0,
        status: '',
        user: {},
        kol: {}
    });

    useEffect(() => {
        getBooking(id)
            .then(res => {
                console.log(res);
                setBooking(res);
                setBooking(prev => ({ ...prev, status: BookingStatus.REJECTED }))
            });
    }, [])

    const handlePayment = () => {
        createVnPayPayment({ amount: booking.totalPrice })
            .then(res => {
                console.log(res);
                const paymentUrl = res.data.paymentUrl;
                console.log(paymentUrl)
                if (paymentUrl) {
                    window.location.replace(paymentUrl)
                }
            })
    }

    const handleCancel = () => {
        // send request update booking status to cancel
    }

    const handleReBooking = () => {
        // redirect to create booking
    }

    return (
        <div className={classes['modal-booking-detail']}>
            <Descriptions title="Thông tin KOL" >
                <Descriptions.Item label="Tên KOL" span={3} >
                    {booking.kol.user?.firstName} {booking.kol.user?.lastName}
                </Descriptions.Item>

                <Descriptions.Item label="Lĩnh vực hoạt động" span={3} >
                    {booking.kol.field?.name}
                </Descriptions.Item>

                <Descriptions.Item label="Email" span={3} >
                    {booking.kol.user?.email}
                </Descriptions.Item>

                <Descriptions.Item label="Số điện thoại" span={3} >
                    {booking.kol?.phone}
                </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Thông tin booking" bordered>
                <Descriptions.Item label="Thời gian tạo" span={3} >
                    {booking?.date}
                </Descriptions.Item>

                <Descriptions.Item label="Giá 1 bài viết"  >
                    {booking?.postPrice}
                </Descriptions.Item>
                <Descriptions.Item label="Số lượng bài viết"  >
                    {booking?.postNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền"  >
                    {booking?.postPrice * booking.postNumber}
                </Descriptions.Item>

                <Descriptions.Item label="Giá 1 video"  >
                    {booking?.videoPrice}
                </Descriptions.Item>
                <Descriptions.Item label="Số lượng video"  >
                    {booking?.videoNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng tiền"  >
                    {booking?.videoPrice * booking.videoNumber}
                </Descriptions.Item>

                <Descriptions.Item label="Tổng tiền cần thanh toán" span={3} >
                    {booking?.totalPrice}
                </Descriptions.Item>

                <Descriptions.Item label="Mô tả" span={3} >
                    {booking?.description}
                </Descriptions.Item>

                {booking.status === BookingStatus.PENDING && <Descriptions.Item label="Trạng thái" span={3} >Đang chờ KOL xác nhận</Descriptions.Item>}
                {booking.status === BookingStatus.ACCEPTED &&
                    <Descriptions.Item label="Trạng thái" span={3}>
                        KOL đã chấp nhận yêu cầu, vui lòng thanh toán
                    </Descriptions.Item>
                }
                {booking.status === BookingStatus.ACCEPTED &&
                    <Descriptions.Item label="" span={3}>
                        <Button onClick={handlePayment}>Thanh toán</Button>
                    </Descriptions.Item>
                }
                {booking.status === BookingStatus.REJECTED &&
                    <Descriptions.Item label="Trạng thái" span={3}>
                        KOL từ chối booking
                    </Descriptions.Item>
                }
                {booking.status === BookingStatus.PAID &&
                    <Descriptions.Item label="Trạng thái" span={3}>
                        ĐÃ THANH TOÁN
                    </Descriptions.Item>
                }
                {booking.status !== BookingStatus.CANCELED
                    && booking.status !== BookingStatus.PAID
                    && booking.status !== BookingStatus.REJECTED
                    &&
                    <Descriptions.Item label="" span={3}>
                        <Button onClick={handleCancel}>Cancel Booking</Button>
                    </Descriptions.Item>
                }
                {(booking.status === BookingStatus.CANCELED
                    || booking.status === BookingStatus.REJECTED
                    || booking.status === BookingStatus.PAID)
                    &&
                    <Descriptions.Item label="" span={3}>
                        <Button onClick={handleReBooking}>Đặt lại</Button>
                    </Descriptions.Item>
                }
            </Descriptions>
        </div>
    );
};

export default BookingDetails;
