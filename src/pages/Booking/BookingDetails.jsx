import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBookingFeedback,
  getBookingByBookingId,
  updateBookingStatus,
} from "../../services/BookingService";
import { BookingStatus } from "../../utils/Enums";
import { createVnPayPayment } from "../../services/PaymentService";
import { Descriptions, Button, TextArea, Rate, message } from "antd";
import classes from "./Booking.module.css";
import NotFound from "../NotFound/NotFound";
import { displayDateTime, formatDate } from "../../services/DateTimeUtil";
import BookingCreate from "./BookingCreate";
import { useContext } from "react";
import { MessageContext } from "../../context/Message.context";
import Header from '../../components/Header/index'

const BookingDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { sendPrivateNotification } = useContext(MessageContext);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [noti, setNoti] = useState({
    type: "BOOKING",
    bookingId: id,
    content: "",
    timestamp: "",
    userId: 0,
  });
  const [booking, setBooking] = useState({
    id: "",
    timestamp: "",
    postPrice: 0,
    postNumber: 0,
    videoPrice: 0,
    videoNumber: 0,
    totalPrice: 0,
    description: "",
    status: "",
    user: {},
    kol: {},
    feedback: {},
  });
  const [feedback, setFeedback] = useState({
    rating: null,
    comment: "",
    timestamp: "",
  });
  const [renderFeedback, setRenderFeedback] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getBookingByBookingId(id).then((res) => {
      setBooking(res);
    });
  }, []);

  const handlePayment = () => {
    createVnPayPayment(booking.totalPrice, booking.id).then((res) => {
      window.location.replace(res.paymentUrl);
    });
  };

  const handleReBooking = () => {
    setOpen(true);
  };

  const onCancelOpenHandler = () => {
    setOpen(false);
  };

  const handleRejectOrCancel = () => {
    // send request update booking status to cancel
    if (validateUser()) {
      updateBookingStatus(booking.id, BookingStatus.CANCELED).then((res) => {
        noti.timestamp = formatDate(new Date());
        noti.content = `${user.firstName} đã hủy yêu cầu hợp tác`;
        noti.userId = res.kol.id;
        sendPrivateNotification(noti);
        setBooking(res);
      });
    } else {
      updateBookingStatus(booking.id, BookingStatus.REJECTED).then((res) => {
        noti.timestamp = formatDate(new Date());
        noti.content = `${res.kol.firstName} đã từ chối yêu cầu hợp tác`;
        noti.userId = res.user.id;
        sendPrivateNotification(noti);
        setBooking(res);
      });
    }
  };

  const handleAccept = () => {
    updateBookingStatus(booking.id, BookingStatus.ACCEPTED).then((res) => {
      noti.timestamp = formatDate(new Date());
      noti.content = `${res.kol.firstName} đã chấp nhận yêu cầu hợp tác`;
      noti.userId = res.user.id;
      sendPrivateNotification(noti);
      setBooking(res);
    });
  };

  const validateUser = () => {
    if (user.id === booking.user.id) {
      return true;
    }
    return false;
  };

  const onChangeFeedbackRate = (value) => {
    setFeedback((prevState) => {
      return {
        ...prevState,
        rating: value,
      };
    });
  };

  const onChangeFeedbackMessage = (event) => {
    setFeedback((prevState) => {
      return {
        ...prevState,
        comment: event.target.value,
      };
    });
  };

  const onFeedbackHandler = (event) => {
    event.preventDefault();
    if (!feedback.rating) {
      messageApi.open({
        type: "warning",
        content: "Bạn chưa đánh giá, hãy đánh giá trước khi gửi phản hồi",
      });
      return;
    }
    setRenderFeedback(true);
    feedback.timestamp = formatDate(new Date());

    addBookingFeedback(id, feedback).then((res) => {
      messageApi.open({
        type: "success",
        content: "Phản hồi thành công!",
      });
    });
  };

  return (
    <>
      <Header />
      <div className={classes["modal-booking-detail"]}>
        {contextHolder}
        <Descriptions title="Thông tin KOL">
          <Descriptions.Item label="Tên KOL" span={3}>
            {booking.kol?.firstName} {booking.kol?.lastName}
          </Descriptions.Item>

          <Descriptions.Item label="Lĩnh vực hoạt động" span={3} >
            {booking.kol?.fieldNames?.map((field) => {
              return `${field} ,`
            })}
          </Descriptions.Item>


          <Descriptions.Item label="Email" span={3}>
            {booking.kol?.email}
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại" span={3}>
            {booking.kol?.phone}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Thông tin người đặt đơn" >
          <Descriptions.Item label="Tên ENTERPRISE" span={3} >
            {booking.user?.firstName} {booking.user?.lastName}
          </Descriptions.Item>

          <Descriptions.Item label="Email" span={3} >
            {booking.user?.email}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Thông tin đơn hàng" bordered>
          <Descriptions.Item label="Thời gian tạo" span={3}>
            {displayDateTime(booking?.timestamp)}
          </Descriptions.Item>

          <Descriptions.Item label="Giá 1 bài viết">
            {booking?.postPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng bài viết">
            {booking?.postNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {booking?.postPrice * booking.postNumber}
          </Descriptions.Item>

          <Descriptions.Item label="Giá 1 video">
            {booking?.videoPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng video">
            {booking?.videoNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {booking?.videoPrice * booking.videoNumber}
          </Descriptions.Item>

          <Descriptions.Item label="Tổng tiền cần thanh toán" span={3}>
            {booking?.totalPrice}
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả" span={3}>
            {booking?.description}
          </Descriptions.Item>

          {booking.status === BookingStatus.PENDING && (
            <Descriptions.Item label="Trạng thái" span={3}>
              Đang chờ xác nhận
            </Descriptions.Item>
          )}
          {booking.status === BookingStatus.ACCEPTED && (
            <Descriptions.Item label="Trạng thái" span={3}>
              Đang chờ thanh toán
            </Descriptions.Item>
          )}
          {booking.status === BookingStatus.ACCEPTED && validateUser() && (
            <Descriptions.Item label="" span={3}>
              <Button onClick={handlePayment}>Thanh toán</Button>
            </Descriptions.Item>
          )}
          {booking.status === BookingStatus.REJECTED && (
            <Descriptions.Item label="Trạng thái" span={3}>
              KOL từ chối yêu cầu
            </Descriptions.Item>
          )}
          {booking.status === BookingStatus.PAID && (
            <Descriptions.Item label="Trạng thái" span={3}>
              Giao dịch đã thanh toán
            </Descriptions.Item>
          )}
          {/* {booking.status !== BookingStatus.CANCELED
          && booking.status !== BookingStatus.PAID
          && booking.status !== BookingStatus.REJECTED
          &&
          <Descriptions.Item label="" span={3}>
            <Button onClick={handleAccept}>Chấp nhận</Button>
          </Descriptions.Item>
        } */}
          {booking.status !== BookingStatus.CANCELED &&
            booking.status !== BookingStatus.PAID &&
            booking.status !== BookingStatus.REJECTED &&
            booking.status !== BookingStatus.ACCEPTED && (
              <Descriptions.Item label="" span={3}>
                {!validateUser() && (
                  <Button onClick={handleAccept}>Chấp nhận</Button>
                )}
                <Button onClick={handleRejectOrCancel}>
                  {validateUser() ? "Hủy đặt" : "Từ chối"}
                </Button>
              </Descriptions.Item>
            )}
          {(booking.status === BookingStatus.CANCELED ||
            booking.status === BookingStatus.REJECTED ||
            booking.status === BookingStatus.PAID) &&
            booking.kol.userId !== user.id && (
              <Descriptions.Item label="" span={3}>
                <Button onClick={handleReBooking}>Đặt lại</Button>
              </Descriptions.Item>
            )}
          {booking.status === BookingStatus.PAID &&
            booking.payment.status === "successful" &&
            booking.feedback === null && (
              <Descriptions.Item label="Phản hồi" span={3}>
                {renderFeedback ? (
                  <>
                    <textarea
                      readonly
                      value={feedback.comment}
                      className={classes["textarea-feedback"]}
                    ></textarea>
                    <Rate disabled value={feedback.rate} />
                  </>
                ) : (
                  <>
                    <textarea
                      onClick={handleReBooking}
                      rows={10}
                      placeholder="Nhập phản hồi"
                      className={classes["textarea-feedback"]}
                      onChange={onChangeFeedbackMessage}
                    ></textarea>
                    <Rate onChange={onChangeFeedbackRate} />
                  </>
                )}
              </Descriptions.Item>
            )}
          {!renderFeedback &&
            booking.status === BookingStatus.PAID &&
            booking.payment.status === "successful" &&
            booking.feedback === null && (
              <Descriptions.Item label="" span={3}>
                <Button onClick={onFeedbackHandler}>Gửi phản hồi</Button>
              </Descriptions.Item>
            )}
          {booking.status === BookingStatus.PAID &&
            booking.payment.status === "successful" &&
            booking.feedback !== null && (
              <Descriptions.Item label="Phản hồi" span={3}>
                <textarea
                  readonly
                  value={feedback.comment}
                  className={classes["textarea-feedback"]}
                ></textarea>
                <Rate disabled value={feedback.rate} />
              </Descriptions.Item>
            )}

          {/* <Descriptions.Item label="Phản hồi" span={3}>
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
              <textarea
                rows={10}
                placeholder="Nhập phản hồi"
                className={classes['textarea-feedback']}
                onChange={onChangeFeedbackMessage}
              ></textarea>
              <Rate onChange={onChangeFeedbackRate} />
            </>}
        </Descriptions.Item>

        <Descriptions.Item label="" span={3}>
          <Button onClick={onFeedbackHandler}>Gửi phản hồi</Button>
        </Descriptions.Item> */}
        </Descriptions>

        <BookingCreate
          open={open}
          kol={booking.kol}
          onCancelOpenHandler={onCancelOpenHandler}
        />
      </div>
    </>

  );
};

export default BookingDetails;
