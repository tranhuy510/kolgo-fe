import React, { useEffect, useState } from "react";
import "./CreateCombo.css";
import { Modal, Select, Input } from "antd";
import {
  ListAccountEnterprises,
  ListAccountKOL,
  DataListLinhVuc,
} from "../DataAdmin";

const { TextArea } = Input;

const CreateCombo = () => {
  const [modalEnterprises, setModalEnterprises] = useState(false);
  const [listEnterprises, setListEnterprises] = useState([]);

  const [modalLinhVuc, setModalLinhVuc] = useState(false);
  const [listLinhVuc, setListLinhVuc] = useState([]);

  const [modalKOL, setModalKOL] = useState(false);
  const [listKOL, setListKOL] = useState([]);

  const [listSelectLinhVuc, setListSelectLinhVuc] = useState({});
  const [listSelectEnter, setListSelectEnter] = useState({});
  const [listSelectKOL, setListSelectKOL] = useState({});

  const [nameCombo, setNameCombo] = useState("");
  const [description, setDescription] = useState("");

  const [valueLinhVuc, setValueLinhVuc] = useState({});
  const [thanhVienEnterprise, setThanhVienEnterprise] = useState({});
  const [thanhVienKOL, setThanhVienKOL] = useState({});

  useEffect(() => {
    const getData = async () => {
      const listLinhVuc = await DataListLinhVuc;
      setListLinhVuc(listLinhVuc);

      const listEnterprises = await ListAccountEnterprises;
      setListEnterprises(listEnterprises);

      const listKOL = await ListAccountKOL;
      setListKOL(listKOL);
    };
    getData();
  }, []);

  const optionsLinhVuc = [];
  listLinhVuc.map((item, index) =>
    optionsLinhVuc.push({
      value: item,
      label: item,
    })
  );

  const optionsEnterprises = [];
  listEnterprises.map((item, index) =>
    optionsEnterprises.push({
      value: item.name,
      label: item.name,
    })
  );

  const optionsKOL = [];
  listKOL.map((item, index) =>
    optionsKOL.push({
      value: item.fullName,
      label: item.fullName,
    })
  );

  const handleOpenModalEnterprises = () => {
    setModalEnterprises(true);
  };
  const handleOpenModalKOL = () => {
    setModalKOL(true);
  };
  const handleOpenModalLinhVuc = () => {
    setModalLinhVuc(true);
  };

  // -----------------------------
  const handleOkLinhVuc = () => {
    setModalLinhVuc(false);
    setValueLinhVuc(listSelectLinhVuc);
  };
  const handleOkEnterprises = () => {
    setModalEnterprises(false);
    setThanhVienEnterprise(listSelectEnter);
  };
  const handleOkKOL = () => {
    setModalKOL(false);
    setThanhVienKOL(listSelectKOL);
  };
  // ------------------------------------
  const handleCancelLinhVuc = () => {
    setModalLinhVuc(false);
  };
  const handleCancelEnterprises = () => {
    setModalEnterprises(false);
    console.log("cancel");
  };
  const handleCancelKOL = () => {
    setModalKOL(false);
    console.log("cancel");
  };
  // ---------------------------------
  const handleChangeLinhVuc = (value) => {
    console.log(value);
    setListSelectLinhVuc(value);
  };
  const handleChangeEnterprises = (value) => {
    setListSelectEnter(value);
  };
  const handleChangeKOL = (value) => {
    setListSelectKOL(value);
  };
  // ----------------------
  const handleCreateCombo = () => {
    console.log("luu data: ");
    // nameCombo, valueLinhVuc, description, thanhVienEnterprise, thanhVienKOL
  };
  return (
    <div className="create-combo-container">
      <div className="content-left">
        <div className="information-combo">
          <div className="child-input">
            <label>Tên Combo</label>
            <Input
              style={{ height: 50 }}
              placeholder="Nhập tên combo"
              value={nameCombo}
              onChange={(e) => setNameCombo(e.target.value)}
              className={nameCombo === "" ? "" : "valid-value"}
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
              value={valueLinhVuc}
            />
          </div>
          <div className="child-input">
            <label>Mô Tả</label>
            <TextArea
              rows={12}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả"
              className={description === "" ? "" : "valid-value"}
            />
          </div>
          <div className="child-input">
            <label>Thành Viên</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
              }}
            >
              <div style={{ display: "flex" }}>
                <label style={{ width: 80, marginTop: 5 }}>KOL:</label>
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                    marginBottom: "50px",
                  }}
                  placeholder="Tags Thành Viên"
                  value={thanhVienKOL}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ width: 80, marginTop: 5 }}>Enterprise:</label>
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  placeholder="Tags Thành Viên"
                  value={thanhVienEnterprise}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="btn-add-account">
          <button onClick={handleOpenModalLinhVuc}>Thêm Lĩnh Vực</button>
          <button onClick={handleOpenModalKOL}>Thêm KOL</button>
          <button onClick={handleOpenModalEnterprises}>Thêm Enterprises</button>
        </div>
        <div className="btn-create-combo">
          <button onClick={handleCreateCombo}>Tạo</button>
        </div>
      </div>

      <Modal
        title="Thêm Lĩnh Vực"
        open={modalLinhVuc}
        onOk={handleOkLinhVuc}
        onCancel={handleCancelLinhVuc}
      >
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          placeholder="Tags Lĩnh Vực"
          onChange={handleChangeLinhVuc}
          options={optionsLinhVuc}
        />
      </Modal>

      <Modal
        title="Thêm Enterprises"
        open={modalEnterprises}
        onOk={handleOkEnterprises}
        onCancel={handleCancelEnterprises}
      >
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          placeholder="Tags Enterprises"
          onChange={handleChangeEnterprises}
          options={optionsEnterprises}
        />
      </Modal>

      <Modal
        title="Thêm KOL"
        open={modalKOL}
        onOk={handleOkKOL}
        onCancel={handleCancelKOL}
      >
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Tags KOL"
          onChange={handleChangeKOL}
          options={optionsKOL}
        />
      </Modal>
    </div>
  );
};

export default CreateCombo;
