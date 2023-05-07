import React, { useState } from "react";
import "./ItemDangThamGia.css";
import { Button, Modal } from "antd";
import { format } from "date-fns";

const ItemDangThamGia = (props) => {
  const [openThamGia, setOpenThamGia] = useState(false);

  // show modal
  const showModalThamGia = () => {
    setOpenThamGia(true);
  };
  // cancel modal
  const handleCancelThamGia = () => {
    setOpenThamGia(false);
  };
  //
  const handleHuyThamGia = () => {
    console.log(props.data);
    handleCancelThamGia();
  };
  const handleThamGia = () => {
    console.log(props.data);
    handleCancelThamGia();
  };

  return (
    <div className="dang-tham-gia-container">
      <div className="name-chien-dich">
        <label style={{ fontWeight: 600 }}>TÊN CHIẾN DỊCH: </label>
        <label>{props.data.tenchiendich}</label>
      </div>
      <div className="infor-chien-dich">
        <div className="left-infor">
          <img
            className="anh"
            src={props.data.anh}
            alt={props.data.tenchiendich}
          />
        </div>
        <div className="right-infor">
          <div className="thoi-gian">
            <label style={{ fontWeight: 600 }}>Thời gian diễn ra: </label>
            <label>{`${format(
              new Date(props.data.batdau),
              "dd/MM/yyyy"
            )} - ${format(new Date(props.data.ketthuc), "dd/MM/yyyy")}`}</label>
          </div>
          <div className="linh-vuc">
            <label style={{ fontWeight: 600 }}>Lĩnh Vực:</label>
            {props.data.linhvuc.map((item, index) => (
              <button key={index}>{item.name}</button>
            ))}
          </div>
          <div className="mo-ta">
            <div style={{ fontWeight: 600 }}>Mô tả chiến dịch:</div>
            <div className="noi-dung">{props.data.mota}</div>
          </div>
          <div className="action">
            <button onClick={showModalThamGia}>Hủy</button>
          </div>
        </div>
        <Modal
          open={openThamGia}
          onCancel={handleCancelThamGia}
          footer={[
            <Button key="huythamgia" type="primary" onClick={handleHuyThamGia}>
              Không
            </Button>,
            <Button key="thamgia" type="primary" onClick={handleThamGia}>
              Có
            </Button>,
          ]}
        >
          <div style={{ margin: "20px", fontSize: "18px", fontWeight: "600" }}>
            Xác Nhận Hủy
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ItemDangThamGia;
