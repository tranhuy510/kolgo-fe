import React, { useEffect, useState } from "react";

import { Table, Input, Modal, Button, message } from "antd";
import classes from "./AccountEnterprises.module.css";

import { getEnts } from "../../../../services/EnterpriseService";

import ModalView from "./ModalView";
import ModalUpdate from "./ModalUpdate";
import { getEntFields } from "../../../../services/FieldService";
import { getCities } from "../../../../services/CityService";
import { deleteUser } from "../../../../services/UserService";

const AccountEnterprises = () => {
  const [ents, setEnts] = useState([])
  const [fieldList, setFieldList] = useState([])
  const [cityList, setCityList] = useState([])

  const [inputSearch, setInputSearch] = useState("");

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState()

  const [dataProps, setDataProps] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getEnts().then((res) => { setEnts(res) })
  }, [isDeleted])

  useEffect(() => {
    getEntFields().then((res) => { setFieldList(res) })
    getCities().then((res) => { setCityList(res) })
  }, [])

  const columns = [
    {
      title: "Tên ",
      dataIndex: "firstName",
      key: "firstName",
      fixed: 'left',
      width: 100,
      render: (text, data) => <div className="name-title-table">{data.firstName}</div>,
    },
    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
      width: 100,
      render: (text, data) => <div className="name-title-table">{data.lastName}</div>,
    },
    {
      title: "Tên doanh nghiệp",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "Lĩnh vực",
      dataIndex: "field.name",
      key: "field",
      render: (text, data) => <div className="name-title-table">{data.field?.name}</div>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text, data) => <div className="name-title-table">{data.address?.city?.name} - {data.address?.details}</div>,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxId",
      key: "taxId",
      render: (text) => <div className="name-title-table">{text}</div>,
    },
    {
      title: "",
      key: "action",
      with: 300,
      fixed: 'right',
      render: (_, record) => (
        <div className="btn-action-group">
          <Button
            className="btn-delete"
            onClick={() => onOpenViewHandler(record)}
          >
            Xem
          </Button>
          <Button
            className="btn-delete"
            onClick={() => onOpenDeleteModalHandler(record)}
          >
            Xóa
          </Button>
          <Button
            className="btn-update"
            onClick={() => onOpenUpdateModalHandler(record)}
          >
            Sửa
          </Button>
        </div>
      ),
    },
  ];

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      setInputSearch(event.target.value);
    }
  };

  const onOpenViewHandler = (data) => {
    // console.log(data);
    setOpenViewModal(true);
    setDataProps(data)
  };

  const onCloseViewHandler = () => {
    setOpenViewModal(false);
  };

  const onOpenDeleteModalHandler = (data) => {
    setOpenDeleteModal(true)
    setDataProps(data);
  };

  const onDeleteUserHandler = (id) => {
    console.log(id);
    deleteUser(id).then(
      (res) => {
        setIsDeleted(id)
        messageApi.open({
          type: 'success',
          content: "Xóa thành công!",
        })
      }
    )
    setOpenDeleteModal(false)
  };

  const onOpenUpdateModalHandler = (data) => {
    setOpenUpdateModal(true);
    setDataProps(data)
  };

  const onCloseUpdateModalHandler = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <div className={classes["admin-user-container"]}>
        <div className={classes["modal-search"]}>
          {contextHolder}
          <div className={classes["total-user-enterprise"]}>
            Total enterprise :
            <label> {ents && ents.length}</label>
          </div>
          <Input
            type="text"
            placeholder="Nhập tên cần tìm ..."
            onKeyDown={handleKeyDown}
            className={classes["modal-search-input"]}
          />
        </div>

        <Table
          className={classes["table"]}
          columns={columns}
          dataSource={ents.filter((ent) => {
            return inputSearch.toLowerCase() === ""
              ? ent
              : ent.name.toLowerCase().includes(inputSearch.toLowerCase());
          })}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["1", "5", "10", "20"],
          }}
          scroll={{ x: 1500, }}
        />
      </div>

      <ModalView openView={openViewModal} onCloseViewHandler={onCloseViewHandler} data={dataProps} />

      <Modal
        open={openDeleteModal}
        onCancel={() => { setOpenDeleteModal(false) }}
        width={600}
        footer={[]}
      >
        <div>
          Bạn có muốn xóa "{dataProps?.firstName} {dataProps?.lastName}" không ?
        </div>
        <div className={classes['admin-modal-delete']}>
          <Button
            onClick={() => { onDeleteUserHandler(dataProps.userId) }}
            className={classes['modal-delete-btn']}
          >
            Xóa
          </Button>
          <Button
            onClick={() => { setOpenDeleteModal(false) }}
            className={classes['modal-delete-btn']}
          >
            Không
          </Button>
        </div>
      </Modal>

      <ModalUpdate
        openUpdate={openUpdateModal}
        onCloseUpdateModalHandler={onCloseUpdateModalHandler}
        data={dataProps}
        fieldList={fieldList}
        cityList={cityList}
      />
    </>
  );
};

export default AccountEnterprises;
