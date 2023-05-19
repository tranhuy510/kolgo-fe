import React, { useEffect, useState } from "react";
import { BookingData } from "../DataAdmin";
import { Table, Radio } from "antd";
import "./Booking.css";

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const [statusBooking, setStatusBooking] = useState("dabook");
  const [monthSelect, setMonthSelect] = useState("");
  const [nameKOL, setNameKOL] = useState("");

  useEffect(() => {
    const getData = async () => {
      const listBooking = await BookingData;
      setBooking(listBooking);
    };
    getData();
  }, []);
  const columns = [
    {
      title: "Tên Doanh Nghiệp",
      dataIndex: "tendoanhnghiep",
      key: "tendoanhnghiep",
      render: (text) => (
        <div style={{ width: 200 }} className="text-data">
          {text}
        </div>
      ),
    },
    {
      title: "Thời Gian Book",
      dataIndex: "thoigianbook",
      key: "thoigianbook",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Số tiền",
      dataIndex: "sotien",
      key: "sotien",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Tên KOL",
      dataIndex: "tenKOL",
      key: "tenKOL",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Lĩnh Vực",
      dataIndex: "linhvuc",
      key: "linhvuc",
      render: (text) => (
        <div style={{ width: 300 }} className="text-data">
          {text.map((item, index) => item + ", ")}
        </div>
      ),
    },
  ];
  const monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const handleOnChangeMonth = (e) => {
    setMonthSelect(e.target.value);
  };
  const handleOnChangeInput = (e) => {
    setNameKOL(e.target.value);
  };
  return (
    <div className="booking-container">
      <div className="booking-title">Booking</div>
      <div className="booking-status">
        <Radio.Group
          value={statusBooking}
          onChange={(e) => setStatusBooking(e.target.value)}
          className="radio-btn-status"
        >
          <Radio.Button className="btn-book" value="dabook">
            Đã Book
          </Radio.Button>
          <Radio.Button value="dangcho">Đang Chờ</Radio.Button>
        </Radio.Group>
      </div>
      <div className="booking-search">
        <input
          type="text"
          placeholder="Tên"
          className="input-search"
          onChange={(e) => handleOnChangeInput(e)}
        />
        <select
          className="select-search"
          onChange={(e) => handleOnChangeMonth(e)}
        >
          <option value="" disabled selected>
            Tháng
          </option>
          {monthList.map((item, index) => (
            <option key={index} value={item}>{`Tháng ${+item}`}</option>
          ))}
        </select>
      </div>
      <Table
        columns={columns}
        dataSource={booking
          .filter((item) => {
            return monthSelect + statusBooking === ""
              ? item
              : (item.thoigianbook.slice(3, 5) + item.status).includes(
                monthSelect + statusBooking
              );
          })
          .filter((item) => {
            return nameKOL.toLowerCase() === ""
              ? item
              : item.tenKOL.toLowerCase().includes(nameKOL.toLowerCase());
          })}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default Booking;
