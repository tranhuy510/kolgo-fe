import { Table } from "antd";
import { useEffect, useState } from "react";
import { getPaymentHistory } from "../../../services/getApiProfile";
import { displayDateTime } from "../../../services/DateTimeUtil";

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
    key: "timestamp",
    dataIndex: "timestamp",
    align: "center",
    render: (text, data) => <div>{displayDateTime(data.timestamp)}</div>,
  },
];

export default function FormActivity(props) {
  const [payment, setPayment] = useState();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <h1 style={{ marginLeft: 30 }}>Lịch sử giao dịch</h1>
      <Table columns={columns} dataSource={payment} />;
    </>
  );
}
