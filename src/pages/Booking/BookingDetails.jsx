import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooking } from '../../services/BookingService';
import { BookingStatus } from '../../utils/Enums';
import { createVnPayPayment } from '../../services/PaymentService';

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
                setBooking(prev => ({ ...prev, status: BookingStatus.ACCEPTED }))
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
        <div style={{ padding: "100px 20px" }}>
            <h3>Thông tin KOL</h3>
            <div>
                <div>
                    <label>Tên: </label>
                    <label>{booking.kol.user?.firstName} {booking.kol.user?.lastName}</label>
                </div>
                <div>
                    <label>Lĩnh vực hoạt động: </label>
                    <label>{booking.kol.field?.name}</label>
                </div>
                <div>
                    <label>Email: </label>
                    <label>{booking.kol.user?.email}</label>
                </div>
                <div>
                    <label>Số điện thoại: </label>
                    <label>{booking.kol?.phone}</label>
                </div>
            </div>
            <h3>Thông tin booking</h3>
            <div>
                <div>
                    <label>Thời gian tạo booking: </label>
                    <label>{booking?.date}</label>
                </div>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>Giá / 1 bài viết</th>
                        <th>Số lượng bài viết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{booking?.postPrice}</td>
                        <td>{booking?.postNumber}</td>
                        <td>{booking?.postPrice * booking?.postNumber}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Giá / 1 video</th>
                        <th>Số lượng video</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{booking.videoPrice}</td>
                        <td>{booking.videoNumber}</td>
                        <td>{booking.videoPrice * booking.videoNumber}</td>
                    </tr>

                </tbody>
            </table>
            <div>
                <label>Tổng tiền cần thanh toán: </label>
                <label>{booking.totalPrice}</label>
            </div>
            <div>
                <label>Trạng thái: </label>
                {booking.status === BookingStatus.PENDING && <label>Đang chờ KOL xác nhận</label>}
                {booking.status === BookingStatus.ACCEPTED && <div>
                    <div>
                        <label>
                            KOL đã chấp nhận yêu cầu, vui lòng thanh toán
                        </label>
                    </div>
                    <button onClick={handlePayment}>Thanh toán</button>
                </div>}
                {booking.status === BookingStatus.REJECTED
                    && <label>KOL từ chối booking</label>
                }
                {booking.status === BookingStatus.PAID
                    && <label>ĐÃ THANH TOÁN</label>
                }
                {booking.status !== BookingStatus.CANCELED
                    && booking.status !== BookingStatus.PAID
                    && booking.status !== BookingStatus.REJECTED
                    && <div>
                        <button onClick={handleCancel}>Cancel Booking</button>
                    </div>
                }
                {(booking.status === BookingStatus.CANCELED
                    || booking.status === BookingStatus.REJECTED
                    || booking.status === BookingStatus.PAID)
                    && <div>
                        <button onClick={handleReBooking}>Đặt lại</button>
                    </div>}
            </div>
        </div>
    );
};

export default BookingDetails;
