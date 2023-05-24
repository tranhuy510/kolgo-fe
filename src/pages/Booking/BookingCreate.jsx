import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../services/DateTimeUtil";
import { createBooking } from "../../services/BookingService";
import { BookingStatus } from "../../utils/Enums";
import { Modal, Form, Input, Button } from "antd";
import classes from "./Booking.module.css";
import { MessageContext } from "../../context/Message.context";
const { TextArea } = Input;

const BookingCreate = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const kol = props.kol;
  const { sendPrivateNotification } = useContext(MessageContext);
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    timestamp: "",
    postPrice: 0,
    postNumber: 0,
    videoPrice: 0,
    videoNumber: 0,
    totalPrice: 0,
    description: "",
  });

  useEffect(() => {
    setBooking((prev) => ({
      ...prev,
      postPrice: kol?.postPrice,
      videoPrice: kol?.videoPrice,
    }));
  }, []);

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
    booking.timestamp = formatDate(new Date());
    setBooking({ ...booking });
    createBooking(kol.id, booking).then((res) => {
      console.log(res);
      if (!res.error) {
        sendPrivateNotification({
          type: "BOOKING",
          bookingId: res.id,
          content: `${user.firstName} đã gửi lời mời hợp tác đến bạn`,
          timestamp: formatDate(new Date()),
          userId: kol.userId,
        });
        navigate(`/bookings/${res.id}`);
      }
      if (res.error) {
      }
    });
  };

  const onCloseModal = () => {
    props.onCancelOpenHandler();
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
            <Button onClick={handleBooking}>Đặt</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BookingCreate;
