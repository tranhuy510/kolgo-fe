import React, { useEffect, useState } from "react";
import { Table, Input, Modal } from "antd";
import { ListAccountEnterprises } from "./DataAdmin";
import "./AccountEnterprises.css";

const AccountEnterprises = () => {
  const [listAccount, setListAccount] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [idEnterprises, setIdEnterprises] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const listEnterprises = await ListAccountEnterprises;
      setListAccount(listEnterprises);
    };
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-action-group">
          <button
            className="btn-delete"
            onClick={() => handleClickDelete(record)}
          >
            Xóa
          </button>
          <button
            className="btn-update"
            onClick={() => handleClickUpdate(record)}
          >
            Cập Nhật
          </button>
        </div>
      ),
    },
  ];
  const handleClickDelete = (record) => {
    console.log("Delete theo ID", record.key);
  };
  const handleClickUpdate = (record) => {
    setFullName(record.name);
    setEmail(record.email);
    setPhone(record.phoneNumber);
    setCity(record.city);
    setIdEnterprises(record.key);
    setIsOpenModal(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      setInputSearch(event.target.value);
    }
  };

  const onChangeFullName = (e) => {
    setFullName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhone(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const saveUpdate = () => {
    if (fullName === "" || email === "" || city === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      // call api update
      const dataUpdate = {
        id: idEnterprises,
        fullName: fullName,
        email: email,
        phoneNumber: phone,
        city: city,
      };
      setIsOpenModal(false);
      console.log("update data: ", dataUpdate);
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <div className="account-container">
        <div className="search">
          <Input
            style={{ border: "1px solid #2C3333" }}
            type="text"
            placeholder="Nhập tên cần tìm ..."
            onKeyDown={handleKeyDown}
          />
          <div className="total-user-enterprise">
            Total enterprise user:
            <label>{listAccount && listAccount.length}</label>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={listAccount.filter((item) => {
            return inputSearch.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(inputSearch.toLowerCase());
          })}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </div>

      <Modal
        open={isOpenModal}
        onOk={saveUpdate}
        onCancel={handleCancel}
        width={900}
      >
        <div className="content-update">
          <div className="child-input">
            <label>Full Name</label>
            <Input
              className={fullName === "" ? "" : "valid-boder-input"}
              value={fullName}
              onChange={onChangeFullName}
            />
          </div>
          <div className="child-input">
            <label>Email</label>
            <Input
              className={email === "" ? "" : "valid-boder-input"}
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className="child-input">
            <label>{`Phone(Optional)`}</label>
            <Input
              className={phone === "" ? "" : "valid-boder-input"}
              value={phone}
              onChange={onChangePhoneNumber}
            />
          </div>
          <div className="child-input">
            <label>City</label>
            <Input
              className={city === "" ? "" : "valid-boder-input"}
              value={city}
              onChange={onChangeCity}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountEnterprises;
