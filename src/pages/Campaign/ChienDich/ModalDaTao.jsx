import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { listChienDich } from "./dataChienDich";
import { Pagination } from "antd";
import ItemDaTao from "./ItemDaTao";

const ModalDaTao = (props) => {
  const [chienDich, setChienDich] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const getPersentData = async () => {
      const chiendichData = await listChienDich;
      setChienDich([...chiendichData]);
    };
    getPersentData();
  }, []);

  // pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = chienDich.slice(startIndex, endIndex);
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  // pagination
  const clichParent = (a) => {
    console.log(a);
  };

  return (
    <div>
      <Modal
        width={820}
        title="ĐÃ TẠO"
        open={props.isOpen}
        onCancel={props.closeDatao}
        footer={[]}
      >
        <div className="list-chien-dich">
          {currentProducts &&
            currentProducts.length > 0 &&
            currentProducts.map((item, index) => (
              <div className="item" key={index}>
                <ItemDaTao data={item} clichParent={clichParent} />
              </div>
            ))}
          <Pagination
            style={{ margin: 10 }}
            current={currentPage}
            pageSize={pageSize}
            total={chienDich.length}
            onChange={handlePaginationChange}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalDaTao;
