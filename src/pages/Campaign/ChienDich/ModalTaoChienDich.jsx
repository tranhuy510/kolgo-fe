import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Select } from "antd";
import { DataListLinhVuc } from "./dataChienDich";
import "./ModalTaoChienDich.css";
import UploadFile from "./UploadFile";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const { TextArea } = Input;

const ModalTaoChienDich = (props) => {
  const [openChild, setOpenChild] = useState(false);
  const [listLinhVuc, setListLinhVuc] = useState([]);
  const [linhVuc, setLinhVuc] = useState([]);
  const [tenChienDich, setTenChienDich] = useState("");
  const [mota, setMota] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const listLinhVuc = await DataListLinhVuc;
      setListLinhVuc(listLinhVuc);
    };
    getData();
  }, []);

  const openModalChild = () => {
    setOpenChild(true);
  };
  const closeModalChild = () => {
    setOpenChild(false);
  };
  const taoChienDich = () => {
    // tao chien dich
    // data:
    console.log(tenChienDich, mota, linhVuc);
    // ngày bắt đầu
    const formattedStart = format(startDate, "yyyy/MM/dd");
    console.log(formattedStart);
    // ngày kết thúc
    const formattedEnd = format(endDate, "yyyy/MM/dd");
    console.log(formattedEnd);

    closeModalChild();
    setTenChienDich("");
    setMota();
    setLinhVuc([]);
    setStartDate(null);
    setEndDate(null);
    props.closeTao();
  };
  const optionLinhVuc = [];
  listLinhVuc.map((item, index) =>
    optionLinhVuc.push({
      value: item,
      label: item,
    })
  );
  const handleChangeLinhVuc = (value) => {
    setLinhVuc(value);
  };
  return (
    <div>
      <Modal
        width={1000}
        title="TẠO CHIẾN DỊCH"
        open={props.isOpen}
        onCancel={props.closeTao}
        footer={[
          <Button key="tao" type="primary" onClick={openModalChild}>
            Tạo
          </Button>,
        ]}
      >
        <div className="tao-chien-dich-input">
          <div className="title">Tên</div>
          <Input
            style={{ height: 50 }}
            placeholder="Nhập tên combo"
            value={tenChienDich}
            onChange={(e) => setTenChienDich(e.target.value)}
          />
        </div>
        <div className="tao-chien-dich-input">
          <div className="title" style={{ width: 90 }}>
            Thời gian
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Từ ngày"
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Đến ngày"
            />
          </div>
        </div>
        <div className="tao-chien-dich-input">
          <div className="title" style={{ width: 90 }}>
            Lĩnh vực
          </div>
          <Select
            mode="tags"
            style={{
              width: "80%",
            }}
            placeholder="Tags Lĩnh Vực"
            onChange={handleChangeLinhVuc}
            options={optionLinhVuc}
            value={linhVuc}
          />
        </div>
        <div className="tao-chien-dich-input">
          <div className="title">Mô tả</div>
          <TextArea
            rows={12}
            value={mota}
            onChange={(e) => setMota(e.target.value)}
          />
        </div>
        <UploadFile />
      </Modal>
      <Modal
        width={500}
        title="Xác Nhận Tạo"
        open={openChild}
        onCancel={closeModalChild}
        footer={[
          <Button key="khongtao" type="primary" onClick={closeModalChild}>
            Không
          </Button>,
          <Button key="dongytao" type="primary" onClick={taoChienDich}>
            Có
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

export default ModalTaoChienDich;
