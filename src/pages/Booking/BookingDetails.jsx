import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooking, updateBookingStatus } from '../../services/BookingService';
import { BookingStatus } from '../../utils/Enums';
import { createVnPayPayment } from '../../services/PaymentService';
import { Descriptions, Button, TextArea, Rate, message } from 'antd';
import classes from './Booking.module.css'
import NotFound from '../NotFound/NotFound';

const BookingDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    id: '',
    timestamp: '',
    postPrice: 0,
    postNumber: 0,
    videoPrice: 0,
    videoNumber: 0,
    totalPrice: 0,
    description: '',
    status: '',
    user: {},
    kol: {},
    feedback: null
  });
  const [feedback, setFeedback] = useState({
    rate: null,
    comment: "",
    userId: null,
    kolId: null,
    dateCreate: {
      year: null,
      month: null,
      day: null,
    }
  })
  const [renderFeedback, setRenderFeedback] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getBooking(id)
      .then(res => {
        console.log(res);
        // if (res.error.code === 404) setError(true);
        setBooking(res);
        setFeedback((prevState) => {
          return {
            ...prevState,
            userId: res.user.id,
            kolId: res.kol.id
          };
        })
      });
  }, [])

  const handlePayment = () => {

  }

  const handleReBooking = () => {

  }

  const handleCancel = () => {
    // send request update booking status to cancel
    updateBookingStatus(booking.id, BookingStatus.CANCELED)
      .then(res => {
        setBooking(res);
      });
  }

  const onChangeFeedbackRate = (value) => {
    setFeedback((prevState) => {
      return {
        ...prevState,
        rate: value,
      };
    })
  }

  const onChangeFeedbackMessage = (event) => {
    setFeedback((prevState) => {
      return {
        ...prevState,
        comment: event.target.value,
      };
    })
  }

  const onFeedbackHandler = (event) => {
    event.preventDefault();
    if (!feedback.rate) {
      messageApi.open({
        type: 'warning',
        content: 'Bạn chưa đánh giá, hãy đánh giá trước khi gửi phản hồi',
      });
      return;
    }
    setRenderFeedback(true)
    const date = new Date();
    feedback.dateCreate.day = date.getDate();
    feedback.dateCreate.month = date.getMonth() + 1;
    feedback.dateCreate.year = date.getFullYear();
    console.log(feedback);
  }

  return (
    <div className={classes['modal-booking-detail']}>
      {contextHolder}
      <Descriptions title="Thông tin KOL" >
        <Descriptions.Item label="Tên KOL" span={3} >
          {booking.kol?.firstName} {booking.kol?.lastName}
        </Descriptions.Item>

        <Descriptions.Item label="Lĩnh vực hoạt động" span={3} >
          {booking.kol?.fields?.name}
        </Descriptions.Item>

        <Descriptions.Item label="Email" span={3} >
          {booking.kol?.email}
        </Descriptions.Item>

        <Descriptions.Item label="Số điện thoại" span={3} >
          {booking.kol?.phone}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Thông tin booking" bordered>
        <Descriptions.Item label="Thời gian tạo" span={3} >
          {booking?.timestamp}
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

        {booking.status === BookingStatus.PENDING &&
          <Descriptions.Item label="Trạng thái" span={3} >
            Đang chờ KOL xác nhận
          </Descriptions.Item>}
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
            KOL từ chối yêu cầu
          </Descriptions.Item>
        }
        {booking.status === BookingStatus.PAID &&
          <Descriptions.Item label="Trạng thái" span={3}>
            Giao dịch đã thanh toán
          </Descriptions.Item>
        }
        {booking.status !== BookingStatus.CANCELED
          && booking.status !== BookingStatus.PAID
          && booking.status !== BookingStatus.REJECTED
          &&
          <Descriptions.Item label="" span={3}>
            <Button onClick={handleCancel}>Hủy đặt</Button>
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
        {(booking.status === BookingStatus.PAID &&
          booking.payment.status === "successful" &&
          booking.feedback === null) &&
          <Descriptions.Item label="Phản hồi" span={3}>
            {renderFeedback ?
              <>
                <textarea
                  readonly
                  value={feedback.comment}
                  className={classes['textarea-feedback']}
                ></textarea>
                <Rate disabled value={feedback.rate} />
              </> :
              <>
                <textarea onClick={handleReBooking}
                  rows={10}
                  placeholder="Nhập phản hồi"
                  className={classes['textarea-feedback']}
                  onChange={onChangeFeedbackMessage}
                ></textarea>
                <Rate onChange={onChangeFeedbackRate} />
              </>}
          </Descriptions.Item>
        }
        {!renderFeedback &&
          booking.status === BookingStatus.PAID &&
          booking.payment.status === "successful" &&
          booking.feedback === null &&
          <Descriptions.Item label="" span={3}>
            <Button onClick={onFeedbackHandler}>Gửi phản hồi</Button>
          </Descriptions.Item>
        }
        {(booking.status === BookingStatus.PAID &&
          booking.payment.status === "successful" &&
          booking.feedback === null) &&
          <Descriptions.Item label="Phản hồi" span={3}>
            <textarea
              readonly
              value={feedback.comment}
              className={classes['textarea-feedback']}
            ></textarea>
            <Rate disabled value={feedback.rate} />
          </Descriptions.Item>
        }
      </Descriptions>
    </div>
  );
};

export default BookingDetails;
