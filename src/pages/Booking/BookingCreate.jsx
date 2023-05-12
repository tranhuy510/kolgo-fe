import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getKol } from "../../services/KolService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../services/DateTimeUtil";
import { BookingStatus } from "../../utils/Enums";
import { createBooking } from "../../services/BookingService";
import { MessageContext } from "../../context/Message.context";
import { Modal, Form, Input, Button } from "antd";

import classes from "./Booking.module.css";

const BookingCreate = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { state } = useLocation();
  const { sendPublicMessage, sendPrivateMessage } = useContext(MessageContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState();
  const { TextArea } = Input;

  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState({
    date: "",
    postPrice: 0,
    postNumber: 0,
    videoPrice: 0,
    videoNumber: 0,
    totalPrice: 0,
    status: "",
    kolId: props.kol.id,
    description: "",
  });

  useEffect(() => {
    setBooking((prev) => ({
      ...prev,
      postPrice: props.kol.postPrice,
      videoPrice: props.kol.videoPrice,
    }));
  });

  const updateTotalPrice = (postPrice, postNumber, videoPrice, videoNumber) => {
    const totalPrice = postPrice * postNumber + videoPrice * videoNumber;
    setBooking((prev) => ({ ...prev, totalPrice }));
  };

  const handlePostNumberChange = (e) => {
    setBooking((prev) => ({ ...prev, postNumber: e.target.value }));
    updateTotalPrice(
      booking.postPrice,
      e.target.value,
      booking.videoPrice,
      booking.videoNumber
    );
  };

  const handleVideoNumberChange = (e) => {
    setBooking((prev) => ({ ...prev, videoNumber: e.target.value }));
    updateTotalPrice(
      booking.postPrice,
      booking.postNumber,
      booking.videoPrice,
      e.target.value
    );
  };

  const handleDescriptionChange = (e) => {
    setBooking((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleBooking = () => {
    booking.date = formatDate(new Date());
    booking.status = BookingStatus.PENDING;
    setBooking({ ...booking });
    createBooking(booking).then((res) => {
      console.log(res);
      if (!res.error) navigate(`/bookings/${res.id}`);
      if (res.error) {
        setBooked(true);
      }
    });
  };

  const onCloseModal = () => {
    setBooked(false);
    props.onCancelOpenHandler();
    booking.status = "";
  };

  return (
    <Modal
      width={600}
      title=""
      open={props.open}
      onCancel={onCloseModal}
      footer={[]}
    >
      <div className={classes["modal-booking-create"]}>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="Post price">${booking.postPrice}</Form.Item>
          <Form.Item label="Post number">
            <Input
              rows={2}
              type="number"
              placeholder="Nhập số lượng bài viết"
              onChange={handlePostNumberChange}
              value={booking.postNumber}
            />
          </Form.Item>
          <Form.Item label="Video price">${booking.videoPrice}</Form.Item>
          <Form.Item label="Video number">
            <Input
              rows={2}
              type="number"
              placeholder="Nhập số lượng video"
              onChange={handleVideoNumberChange}
              value={booking.videoNumber}
            />
          </Form.Item>
          <Form.Item label="Total cost">${booking.totalPrice}</Form.Item>
          <Form.Item
            label="Mô tả"
            name="mota"
            rules={[
              {
                required: true,
                message: "Hãy nhập mô tả!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Nhập mô tả"
              value={booking.description}
              onChange={handleDescriptionChange}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 15,
            }}
          >
            {!booking.status && <Button onClick={handleBooking}>Book</Button>}
            {booked && (
              <span>Bạn đã đặt kol này, vào thông báo để xem chi tiết</span>
            )}
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BookingCreate;
