import { Badge, Table } from "antd";

const columns = [
  {
    title: "Mã hoạt động",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Tên hoạt động",
    dataIndex: "name",
    key: "name",
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
  {
    title: "Tình trạng",
    key: "status",
    align: "center",
    render: () => <Badge status="success" text="Hoàn thành" />,
  },
];
const data = [
  {
    id: "1",
    name: "Chiến dịch Marketing Game Rok",
    content: 32,
    time: "10/2/2023",
    status: ["Hoàn thành"],
  },
  {
    id: "2",
    name: "Jim Green",
    content: 42,
    time: "10/3/2023",
    status: ["loser"],
  },
  {
    id: "3",
    name: "Joe Black",
    content: 32,
    time: "03/04/2023",
    status: ["cool", "teacher"],
  },
];

export default function FormActivity({ user }) {
  return (
    <>
      <h1 style={{ marginLeft: 30 }}>Lịch sử hoạt động</h1>
      <Table columns={columns} dataSource={data} />;
    </>
  );
}
