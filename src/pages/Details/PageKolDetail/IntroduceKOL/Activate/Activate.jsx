import "./Activate.css";
import { chartBook } from "../data-details";
import { useEffect, useState } from "react";
import ActivateChart from "./ActivateChart/ActivateChart";
import ChartFilter from "./ChartFilter/ChartFilter";
import { Col, Row } from "antd";

const Activate = () => {
  const [selected, setSelected] = useState('2023');
  const [bookings, setBookings] = useState([])
  const [listBooks, setListBooks] = useState([])

  useEffect(() => {
    // goi api books
    // setListBooks 
  }, [])

  // ham set date: new Date(2020, 7, 14), -> dua vao listBooks

  // them 1 ham tong cac booking theo tung thang -> bookings 

  const onChangeFilter = (data) => {
    setSelected(data)
  }

  const filteredBookings = bookings.filter((book) => {
    return book.date.getFullYear().toString() === selected;
  });

  return (
    <>
      <div className="form-hoat-dong">
        <Row>
          <ChartFilter selected={selected} onChangeFilter={onChangeFilter} />
        </Row>
        <Row>
          <Col span={3}
            style={{
              padding: '10px 10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
            <div style={{ fontSize: '18px', textAlign: 'center' }}>Books</div>
            <div style={{ fontSize: '18px', textAlign: 'center' }}>Month</div>
          </Col>
          <Col span={21}>
            <ActivateChart filteredBookings={filteredBookings} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Activate;
