import { Badge, Table } from "antd";
import { useEffect, useState } from "react";
import { getBookingHistory } from "../../../services/getApiProfile";
import { displayDateTime } from "../../../services/DateTimeUtil";

const columns = [
  {
    title: "Mã hoạt động",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Tên hoạt động",
    dataIndex: "kol",
    key: "kol",
    align: "center",
    render: (text, data) => <div>Hợp tác với KOL {data.kol.firstName}</div>,
  },
  {
    title: "Nội dung",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "Thời gian",
    key: "timestamp",
    dataIndex: "timestamp",
    align: "center",
    render: (text, data) => <div>{displayDateTime(data.timestamp)}</div>,
  },
  {
    title: "Tình trạng",
    key: "status",
    align: "left",
    render: (text, data) =>
      data.status === "PAID" ? (
        <Badge status="success" text="Hoàn thành" />
      ) : data.status === "CANCELED" ? (
        <Badge status="error" text="Đã hủy" />
      ) : data.status === "ACCEPTED" ? (
        <Badge status="processing" text="Đang tiến hành" />
      ) : data.status === "REJECTED" ? (
        <Badge status="warning" text="Đã từ chối" />
      ) : null,
  },
];

export default function FormActivity({ user }) {
  const [activity, setActivity] = useState();

  useEffect(() => {
    getBookingHistory()
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setActivity(data);
      });
  }, []);
  return (
    <>
      <h1 style={{ marginLeft: 30 }}>Lịch sử hoạt động</h1>
      <Table columns={columns} dataSource={activity} />;
    </>
  );
}
