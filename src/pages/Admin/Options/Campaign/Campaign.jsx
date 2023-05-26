import React, { useEffect, useState } from "react";
import { Table } from "antd";
import classes from './Campaign.module.css'
import { getCampaigns } from "../../../../services/CampaignService";
import { spreadDate } from "../../../../services/DateTimeUtil";

const Campaign = () => {

  const [selectedStatus, setSelectedStatus] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const columns = [
    {
      title: "Tên chiến dịch",
      dataIndex: "name",
      key: "name",
      fixed: 'left',
      width: 200,
      render: (text) => (<div className="text-data">{text}</div>),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div className="text-data">
          {text === "UPCOMING" ? "Chuẩn bị diễn ra" : text === "IN_PROGRESS" ? "Đang diễn ra" : "Đã kết thúc"}
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
      render: (text) => <div className="text-data">{text}</div>,
    },

    {
      title: "Ngày bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => <div className="text-data">{spreadDate(text)}</div>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "finishTime",
      key: "finishTime",
      render: (text) => <div className="text-data">{spreadDate(text)}</div>,
    },
    {
      title: "Doanh nghiệp",
      dataIndex: "enterprise",
      key: "enterprise",
      render: (text, data) => <div className="text-data">{data.enterprise?.firstName} {data.enterprise?.lastName}</div>,
    },
    {
      title: "Kol tham gia",
      dataIndex: "kols",
      key: "kols",
      render: (text, data) => <div className="text-data">{data.kols?.length}</div>,
    },
  ];

  useEffect(() => {
    getCampaigns().then((res) => { setCampaigns(res) })
  }, []);

  const resultSearch = campaigns.length > 0 ? campaigns?.filter((campaign) => {
    return (inputSearch === "" ? campaign : campaign.name.includes(inputSearch))
  }) : []

  const resultStatus = selectedStatus ? resultSearch?.filter((campaign) => {
    if (campaign.status === selectedStatus) return campaign
  }) : resultSearch;

  const handleOnChangeStatus = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleOnChangeInput = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <>
      <div className={classes["chiendich-container"]}>
        <div className={classes["top"]}>
          <div className={classes["title"]}>Chiến dịch</div>
          <input
            className={classes["input-name"]}
            type="text"
            placeholder="Tên chiến dịch"
            onChange={(e) => handleOnChangeInput(e)}
          />
          <select
            className={classes["select-status"]}
            onChange={(e) => handleOnChangeStatus(e)}
          >
            <option value="" selected disabled hidden>
              Trạng thái
            </option>
            <option value="">Tất cả</option>
            <option value="IN_PROGRESS">Đang Diễn Ra</option>
            <option value="COMPLETED">Đã kết thúc</option>
            <option value="UPCOMING">Sắp diễn ra</option>
          </select>
          <div style={{ marginLeft: '20px' }}>Tổng : {resultStatus.length}</div>
        </div>

        <Table
          className={classes["table"]}
          columns={columns}
          dataSource={resultStatus}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ["1", "5", "10"],
          }}
          scroll={{ x: 1500, }}
        />
      </div>
    </>
  );
};

export default Campaign;
