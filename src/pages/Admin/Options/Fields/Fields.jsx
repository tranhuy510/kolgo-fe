import React, { useEffect, useState } from "react";

import { Table, Input, Modal, Button } from "antd";
import { getFields } from "../../../../services/FieldService";

import classes from './Fields.module.css'


const Fields = () => {
    const [fields, setFields] = useState([])

    const [inputSearch, setInputSearch] = useState("");
    const [typeFieldSearch, setTypeFieldSearch] = useState("");

    const [openModalAdd, setOpenModalAdd] = useState(false)

    useEffect(() => {
        getFields()
            .then((res) => {
                setFields(res)
            })
    }, [])

    const columns = [
        {
            title: "Tên Lĩnh vực",
            dataIndex: "name",
            key: "name",
            render: (text, data) => <div className="name-title-table">{text}</div>,
        },
        {
            title: "Đối tượng",
            dataIndex: "type",
            key: "type",
            render: (text, data) => <div className="name-title-table">{text}</div>,
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <div className="btn-action-group">
                    <Button
                        className="btn-delete"
                        onClick={() => onDeleteFiledHandler(record)}
                    >
                        Xóa
                    </Button>
                    <Button
                        className="btn-update"
                        onClick={() => onUpdateFiledHandler(record)}
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

    const onChangeTypeFieldHandler = (event) => {
        setTypeFieldSearch(event.target.value);
    }

    const onDeleteFiledHandler = (data) => {
        console.log(data);
    }

    const onUpdateFiledHandler = (data) => {
        console.log(data);
    }

    const resultSearch = fields.filter((field) => {
        return (inputSearch === "" ? field : field.name.includes(inputSearch))
            && (typeFieldSearch === "" ? field : field.type.includes(typeFieldSearch))
    })

    const onOpenModalAddField = () => {
        setOpenModalAdd(true)
    }

    const onCloseModalAddField = () => {
        setOpenModalAdd(false)
    }

    const onAddFieldHandler = () => {

    }

    return (
        <>
            <div className={classes["admin-field-container"]}>
                <div className={classes["modal-search"]}>
                    <Input
                        type="text"
                        placeholder="Nhập lĩnh vực cần tìm ..."
                        onKeyDown={handleKeyDown}
                        className={classes["modal-search-input"]}
                    />
                    <select
                        className={classes['search-modal-select']}
                        value={typeFieldSearch}
                        onChange={onChangeTypeFieldHandler}
                    >
                        <option key="ALL" value="">
                            Tất cả
                        </option>
                        <option key="KOL" value="KOL">
                            KOL
                        </option>
                        <option key="ENTERPRISE" value="ENTERPRISE">
                            ENTERPRISE
                        </option>
                    </select>
                </div>

                <div className={classes["modal-add-field"]}>
                    <Button onClick={onOpenModalAddField}>Thêm lĩnh vực</Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={resultSearch}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["1", "5", "10", "20"],
                    }}
                />
            </div>

            <Modal
                width={1000}
                title=""
                open={openModalAdd}
                onCancel={onCloseModalAddField}
                footer={[]}
            >

            </Modal>
        </>
    )
}

export default Fields