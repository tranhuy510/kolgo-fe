import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ChienDichData } from "./DataAdmin";
import "./ChienDich.css";

const ChienDich = () => {
  const [listChienDich, setListChienDich] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("true");
  const [changeInput, setChangeInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      const getDataChienDich = await ChienDichData;
      setListChienDich(getDataChienDich);
    };
    getData();
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      render: (text) => (
        <div style={{ width: 150 }} className="text-data">
          {text}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangthai",
      key: "trangthai",
      render: (text) => (
        <div style={{ width: 150 }} className="text-data">
          {text === "true" ? "Đang diễn ra" : "Kết thúc"}
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngaytao",
      key: "ngaytao",
      render: (text) => <div className="text-data">{text}</div>,
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "ngayketthuc",
      key: "ngayketthuc",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Quan tâm",
      dataIndex: "quantam",
      key: "quantam",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "KOL",
      dataIndex: "kol",
      key: "kol",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Doanh nghiệp",
      dataIndex: "doanhnghiep",
      key: "doanhnghiep",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Lượt tiếp cận",
      dataIndex: "luottiepcan",
      key: "luottiepcan",
      render: (text) => <div className="text-data">{text}</div>,
    },
    {
      title: "Doanh thu",
      dataIndex: "doanhthu",
      key: "doanhthu",
      render: (text) => (
        <div style={{ width: 200 }} className="text-data">
          {text}
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
    setSelectedMonth(e.target.value);
  };
  const handleOnChangeStatus = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleOnChangeInput = (e) => {
    setChangeInput(e.target.value);
  };
  return (
    <>
      <div className="chiendich-container">
        <div className="top">
          <div className="title">Chiến dịch</div>
          <input
            className="input-name"
            type="text"
            placeholder="Tên chiến dịch"
            onChange={(e) => handleOnChangeInput(e)}
          />
          <select
            className="select-month"
            onChange={(e) => handleOnChangeMonth(e)}
          >
            <option value="" disabled selected>
              Tháng
            </option>
            {monthList.map((item, index) => (
              <option key={index} value={item}>{`Tháng ${+item}`}</option>
            ))}
          </select>
          <select
            className="select-trangthai"
            onChange={(e) => handleOnChangeStatus(e)}
          >
            <option value="" disabled selected>
              Đang diễn ra
            </option>
            <option value="true">Đang Diễn Ra</option>
            <option value="false">Kết Thúc</option>
          </select>
        </div>
        <Table
          columns={columns}
          dataSource={listChienDich
            .filter((item) => {
              return selectedMonth + selectedStatus === ""
                ? item
                : (item.ngaytao.slice(3, 5) + item.trangthai).includes(
                    selectedMonth + selectedStatus
                  );
            })
            .filter((item) => {
              return changeInput.toLowerCase() === ""
                ? item
                : item.ten.toLowerCase().includes(changeInput.toLowerCase());
            })}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </div>
    </>
  );
};

export default ChienDich;
