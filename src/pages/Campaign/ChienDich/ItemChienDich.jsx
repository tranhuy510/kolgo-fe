import React, { useState } from "react";
import "./ItemChienDich.css";
import { Button, Modal, Pagination } from "antd";
import SliderImage from "./SliderImage";
import { format } from "date-fns";

const ItemChienDich = (props) => {
  const [openThamGia, setOpenThamGia] = useState(false);
  const [openThongTin, setOpenThongTin] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [currentPageEnter, setCurrentPageEnter] = useState(1);
  const [pageSizeEnter, setPageSizeEnter] = useState(5);

  // show modal
  const showModalThamGia = () => {
    setOpenThamGia(true);
  };
  const showModalThongTin = () => {
    setOpenThongTin(true);
  };
  // cancel modal
  const handleCancelThamGia = () => {
    setOpenThamGia(false);
  };
  const handleCancelThongTin = () => {
    setOpenThongTin(false);
  };
  //
  const handleKhongThamGia = () => {
    console.log(props.data);
    handleCancelThamGia();
  };
  const handleThamGia = () => {
    console.log(props.data);
    handleCancelThamGia();
  };
  const thongTinThamGia = () => {
    console.log(props.data);
    handleCancelThongTin();
  };
  //
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = props.data.listKOL.slice(startIndex, endIndex);
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const startIndexEnter = (currentPageEnter - 1) * pageSizeEnter;
  const endIndexEnter = startIndexEnter + pageSizeEnter;
  const currentProductsEnter = props.data.listEnter.slice(
    startIndexEnter,
    endIndexEnter
  );
  const handlePaginationChangeEnter = (page, pageSize) => {
    setCurrentPageEnter(page);
    setPageSizeEnter(pageSize);
  };
  return (
    <div className="child-chien-dich-container">
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
            {`${format(new Date(props.data.batdau), "dd/MM/yyyy")} - ${format(
              new Date(props.data.ketthuc),
              "dd/MM/yyyy"
            )}`}
          </div>
          <div className="linh-vuc">
            <label style={{ fontWeight: 600 }}>Lĩnh Vực: </label>
            {props.data.linhvuc.map((item, index) => (
              <button key={index}>{item.name}</button>
            ))}
          </div>
          <div className="mo-ta">
            <div style={{ fontWeight: 600 }}>Mô tả chiến dịch:</div>
            <div className="noi-dung">{props.data.mota}</div>
          </div>
          <div className="action">
            <button onClick={showModalThongTin}>Thông tin</button>
            <button onClick={showModalThamGia}>Tham gia</button>
          </div>
        </div>
        <Modal
          open={openThamGia}
          onCancel={handleCancelThamGia}
          footer={[
            <Button
              key="khongthamgia"
              type="primary"
              onClick={handleKhongThamGia}
            >
              Không
            </Button>,
            <Button key="thamgia" type="primary" onClick={handleThamGia}>
              Có
            </Button>,
          ]}
        >
          <div style={{ margin: "20px", fontSize: "18px", fontWeight: "600" }}>
            Xác nhận tham gia
          </div>
        </Modal>

        <Modal
          width={1000}
          title="THÔNG TIN"
          open={openThongTin}
          onCancel={handleCancelThongTin}
          footer={[
            <Button
              className="btn-tham-gia"
              key="thamgia"
              type="primary"
              onClick={thongTinThamGia}
            >
              Tham Gia
            </Button>,
          ]}
        >
          <div className="top-modal-infor">
            <div>
              <label style={{ fontWeight: 600 }}>TÊN CHIẾN DỊCH: </label>
              <label>{props.data.tenchiendich}</label>
            </div>
            <div>
              <label style={{ fontWeight: 600 }}>THỜI GIAN DIỄN RA: </label>
              <label>{`${format(
                new Date(props.data.batdau),
                "dd/MM/yyyy"
              )} - ${format(
                new Date(props.data.ketthuc),
                "dd/MM/yyyy"
              )}`}</label>
            </div>
          </div>
          <div className="bottom-modal-infor">
            <div className="left-modal">
              <div className="image">
                <SliderImage />
              </div>
              <div>
                <label>Mô tả chi tiết:</label>
                <div className="mota">{props.data.mota}</div>
              </div>
            </div>
            <div className="right-modal">
              <div style={{ fontWeight: "600" }}>Danh sách tham gia</div>
              <div style={{ marginBottom: "10px" }}>KOL:</div>
              <div className="list">
                {currentProducts &&
                  currentProducts.length > 0 &&
                  currentProducts.map((item, index) => (
                    <div key={index}>
                      <a href={`url.....${item.id}`}>{item.name}</a>
                    </div>
                  ))}
              </div>
              <Pagination
                style={{ margin: "20px 0 20px 100px" }}
                current={currentPage}
                pageSize={pageSize}
                total={props.data.listKOL.length}
                onChange={handlePaginationChange}
              />
              <div style={{ marginBottom: "10px" }}>Enterprise:</div>
              <div className="list">
                {currentProductsEnter &&
                  currentProductsEnter.length > 0 &&
                  currentProductsEnter.map((item, index) => (
                    <div key={index}>
                      <a href={`url.....${item.id}`}>{item.name}</a>
                    </div>
                  ))}
              </div>
              <Pagination
                style={{ margin: "20px 0 20px 100px" }}
                current={currentPageEnter}
                pageSize={pageSizeEnter}
                total={props.data.listEnter.length}
                onChange={handlePaginationChangeEnter}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ItemChienDich;
