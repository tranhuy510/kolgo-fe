import { Table } from "antd";

import classes from "./Form.module.css";
import { useEffect, useState } from "react";
import { getPaymentHistory } from "../../../services/getApi";

const columns = [
  {
    title: "Mã giao dịch",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Người gửi",
    dataIndex: "sender",
    key: "sender",
    align: "center",
  },
  {
    title: "Người nhận",
    dataIndex: "receiver",
    key: "receiver",
    align: "center",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
    align: "center",
  },
  {
    title: "Thời gian",
    key: "time",
    dataIndex: "time",
    align: "center",
  },
];
const data = [
  {
    id: "1",
    sender: "Công ty TNHH Một thành viên Huy Trần",
    receiver: "Sang Kol",
    content: 32,
    time: "10/2/2023",
  },
  {
    id: "2",
    sender: "Công ty TNHH Một thành viên Huy Trần",
    receiver: "Hiếu Kol",
    content: "Tiền book quảng cáo",
    time: "10/3/2023",
  },
  {
    id: "3",
    sender: "Công ty TNHH Một thành viên Huy Trần",
    receiver: "Thắng Kol",
    content: "Tiền book chiến dịch",
    time: "15/4/2023",
  },
];

export default function FormActivity(props) {
  const [payment, setPayment] = useState();

  const setDefaultHistory = () => {
    getPaymentHistory()
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPayment(data);
      });
  };

  useEffect(() => {
    setDefaultHistory();
  }, []);

  return (
    <>
      <h1>Lịch sử giao dịch</h1>
      <Table columns={columns} dataSource={data} />;
    </>
  );
}
