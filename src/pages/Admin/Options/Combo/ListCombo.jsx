import React, { useEffect, useState } from "react";
import { Table, Input, Select, Button, Modal } from "antd";
import {
  DataListCombo,
  ListAccountKOL,
  DataListLinhVuc,
  ListAccountEnterprises,
} from "../DataAdmin";
import "./ListCombo.css";

const { TextArea } = Input;
const ListCombo = () => {
  const [listCombo, setListCombo] = useState([]);
  const [listKOL, setListKOL] = useState([]);
  const [listEnterprises, setListEnterprises] = useState([]);
  const [listLinhVuc, setListLinhVuc] = useState([]);

  const [idCombo, SetIdCombo] = useState("");
  const [nameCombo, setNameCombo] = useState("");
  const [description, setDescription] = useState("");
  const [linhVuc, setLinhVuc] = useState([]);
  const [valueKOL, setValueKOL] = useState([]);
  const [valueEnter, setValueEnter] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      const dataCombo = await DataListCombo;
      setListCombo(dataCombo);

      const listKOL = await ListAccountKOL;
      setListKOL(listKOL);

      const listEnter = await ListAccountEnterprises;
      setListEnterprises(listEnter);

      const listLinhVuc = await DataListLinhVuc;
      setListLinhVuc(listLinhVuc);
    };
    getData();
  }, []);

  const columns = [
    {
      title: "Tên Combo",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-action-group">
          <button className="btn-view" onClick={() => handleClickView(record)}>
            Xem
          </button>
        </div>
      ),
    },
  ];

  const handleClickView = (record) => {
    SetIdCombo(record.key);
    setNameCombo(record.name);
    setLinhVuc(record.linhvuc);
    setValueKOL(record.member.kol);
    setValueEnter(record.member.enterprises);
    setDescription(record.description);
    setIsOpenModal(true);
  };
  const handleUpdateCombo = () => {
    // setState infoCombo, call api update
    // idCombo, nameCombo, description, linhVuc, valueKOL, valueEnter
    console.log("Cập nhật combo theo id");
    setIsOpenModal(false);
  };
  const handleDeleteCombo = () => {
    // setState infoCombo, call api delete
    console.log("Xóa combo theo id: ", idCombo);
    setIsOpenModal(false);
  };

  const optionLinhVuc = [];
  listLinhVuc.map((item, index) =>
    optionLinhVuc.push({
      value: item,
      label: item,
    })
  );
  const optionThanhVienKOL = [];
  listKOL.map((item, index) =>
    optionThanhVienKOL.push({
      value: item.key,
      label: item.fullName,
    })
  );
  const optionThanhVienEnter = [];
  listEnterprises.map((item, index) =>
    optionThanhVienEnter.push({
      value: item.key,
      label: item.name,
    })
  );
  const onChangeNameCombo = (e) => {
    setNameCombo(e.target.value);
  };
  const handleChangeLinhVuc = (value) => {
    setLinhVuc(value);
  };
  const handleChangeKOL = (value) => {
    setValueKOL(value);
  };
  const handleChangeEnter = (value) => {
    setValueEnter(value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      setInputSearch(event.target.value);
    }
  };
  return (
    <div className="combo-container">
      <div className="title">Danh Sách Combo Hiện Có</div>
      <Input
        style={{ border: "1px solid #2C3333" }}
        type="text"
        placeholder="Nhập tên cần tìm ..."
        onKeyDown={handleKeyDown}
      />
      <div style={{ height: 300 }}>
        <Table
          columns={columns}
          // dataSource={listCombo.filter((item) => {
          //   return inputSearch.toLowerCase() === ""
          //     ? item
          //     : item.name.toLowerCase().includes(inputSearch.toLowerCase());
          // })}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </div>
      <Modal
        open={isOpenModal}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button type="primary" onClick={handleDeleteCombo}>
            Xóa
          </Button>,
          <Button type="primary" onClick={handleUpdateCombo}>
            Cập Nhật
          </Button>,
        ]}
      >
        <div className="information-combo">
          <div className="child-input">
            <label>Tên Combo</label>
            <Input
              placeholder="Nhập tên combo"
              value={nameCombo}
              onChange={onChangeNameCombo}
            />
          </div>
          <div className="child-input">
            <label>Lĩnh Vực</label>
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
          <div className="child-input">
            <label>Mô Tả</label>
            <TextArea
              rows={12}
              value={description}
              onChange={onChangeDescription}
              placeholder="Nhập mô tả"
            />
          </div>
          <div className="child-input">
            <label>Thành Viên KOL:</label>
            <Select
              mode="tags"
              style={{
                width: "80%",
              }}
              placeholder="Tags Thành Viên"
              onChange={handleChangeKOL}
              options={optionThanhVienKOL}
              value={valueKOL}
            />
          </div>
          <div className="child-input">
            <label>Thành Viên Enterprises:</label>
            <Select
              mode="tags"
              style={{
                width: "80%",
              }}
              placeholder="Tags Thành Viên"
              onChange={handleChangeEnter}
              options={optionThanhVienEnter}
              value={valueEnter}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListCombo;
