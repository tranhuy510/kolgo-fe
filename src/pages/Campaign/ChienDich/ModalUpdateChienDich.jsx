import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Select } from "antd";
import { DataListLinhVuc } from "./dataChienDich";
import "./ModalTaoChienDich.css";
import UploadFile from "./UploadFile";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const { TextArea } = Input;

const ModalUpdateChienDich = (props) => {
  const [openChild, setOpenChild] = useState(false);
  const [listLinhVuc, setListLinhVuc] = useState([]);
  const [linhVuc, setLinhVuc] = useState(props.data.linhvuc);
  const [tenChienDich, setTenChienDich] = useState(props.data.tenchiendich);
  const [mota, setMota] = useState(props.data.mota);

  const [startDate, setStartDate] = useState(new Date(props.data.batdau));
  const [endDate, setEndDate] = useState(new Date(props.data.ketthuc));

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
  const updateChienDich = () => {
    // update chien dich
    // data:
    console.log(tenChienDich, mota, linhVuc);
    // ngày bắt đầu
    const formattedStart = format(startDate, "yyyy/MM/dd");
    console.log(formattedStart);
    // ngày kết thúc
    const formattedEnd = format(endDate, "yyyy/MM/dd");
    console.log(formattedEnd);
    closeModalChild();
    props.closeUpdate();
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
        title="Chỉnh Sửa Chiến Dịch"
        open={props.isOpen}
        onCancel={props.closeUpdate}
        footer={[
          <Button key="tao" type="primary" onClick={openModalChild}>
            Update
          </Button>,
        ]}
      >
        <div className="tao-chien-dich-input">
          <div className="title">Tên</div>
          <Input
            style={{ height: 50 }}
            placeholder="Nhập tên chiến dịch"
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
        title="Xác Nhận Update"
        open={openChild}
        onCancel={closeModalChild}
        footer={[
          <Button key="khongupdate" type="primary" onClick={closeModalChild}>
            Không
          </Button>,
          <Button key="dongyupdate" type="primary" onClick={updateChienDich}>
            Có
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

export default ModalUpdateChienDich;
