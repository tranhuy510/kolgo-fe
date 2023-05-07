import React, { useEffect, useState } from "react";
import "./HomeChienDich.css";
import ItemChienDich from "./ItemChienDich";
import { listChienDich, listLinhVuc } from "./dataChienDich";
import { Pagination } from "antd";
import ModalDaTao from "./ModalDaTao";
import ModalDangThamGia from "./ModalDangThamGia";
import ModalTaoChienDich from "./ModalTaoChienDich";

const HomeChienDich = () => {
  const [chienDich, setChienDich] = useState([]);
  const [linhVuc, setLinhVuc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [inputSearch, setInputSearch] = useState("");
  const [searchLinhVuc, setSearchLinhVuc] = useState("");

  const [modalDatao, setModalDatao] = useState(false);
  const [modalDangThamGia, setModalDangThamGia] = useState(false);
  const [modalTao, setModalTao] = useState(false);

  useEffect(() => {
    const getPersentData = async () => {
      const chiendichData = await listChienDich;
      setChienDich([...chiendichData]);

      const linhvucData = await listLinhVuc;
      setLinhVuc([...linhvucData]);
    };
    getPersentData();
  }, []);

  // pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const updateList = chienDich.filter((item) => {
    return inputSearch.toLowerCase() === ""
      ? item
      : item.tenchiendich.toLowerCase().includes(inputSearch.toLowerCase());
  });
  const currentProducts = updateList.slice(startIndex, endIndex);
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  // pagination
  const clichParent = (a) => {
    console.log(a);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      setInputSearch(event.target.value);
    }
  };

  const checkStringInArrayIgnoreCase = (str, arr) => {
    return arr.map((item) => item.name.toLowerCase()).includes(str.toLowerCase());
  };

  const handleChange = (event) => {
    setSearchLinhVuc(event.target.value);
  };
  // open modal
  const openDatao = () => {
    setModalDatao(true);
  };
  const closeDatao = () => {
    setModalDatao(false);
  };

  const openDangThamGia = () => {
    setModalDangThamGia(true);
  };
  const closeDangThamGia = () => {
    setModalDangThamGia(false);
  };

  const openTao = () => {
    setModalTao(true);
  };
  const closeTao = () => {
    setModalTao(false);
  };

  // open modal
  return (
    <div className="home-chien-dich-container">
      <div className="btn-open-modal">
        <button onClick={openTao}>Tạo Chiến Dịch</button>
        <button onClick={openDangThamGia}>Đang Tham Gia</button>
        <button onClick={openDatao}>Đã Tạo</button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Nhập tên cần tìm"
          onKeyDown={handleKeyDown}
        />
        <select value={searchLinhVuc} onChange={handleChange}>
          {linhVuc &&
            linhVuc.length > 0 &&
            linhVuc.map((item, index) => (
              <option key={index} value={item}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="list-chien-dich">
        {currentProducts &&
          currentProducts.length > 0 &&
          currentProducts.map((item, index) => (
            <div className="item" key={index}>
              {searchLinhVuc.toLowerCase() === "" ? (
                <ItemChienDich data={item} clichParent={clichParent} />
              ) : (
                checkStringInArrayIgnoreCase(searchLinhVuc, item.linhvuc) && (
                  <ItemChienDich data={item} />
                )
              )}
            </div>
          ))}
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={pageSize}
          total={updateList.length}
          onChange={handlePaginationChange}
        />
      </div>
      <ModalDaTao isOpen={modalDatao} closeDatao={closeDatao} />
      <ModalDangThamGia
        isOpen={modalDangThamGia}
        closeDangThamGia={closeDangThamGia}
      />
      <ModalTaoChienDich isOpen={modalTao} closeTao={closeTao} />
    </div>
  );
};

export default HomeChienDich;
