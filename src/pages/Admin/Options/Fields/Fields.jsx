import React, { useEffect, useState } from "react";

import { Table, Input, Modal, Button } from "antd";
import { getFields, getKolFields, getEntFields } from "../../../../services/FieldService";

import classes from './Fields.module.css'


const Fields = () => {
    const [kolFields, setKolFields] = useState([])
    const [entFields, setEntFields] = useState([])

    const [inputSearch, setInputSearch] = useState("");
    const [typeFieldSearch, setTypeFieldSearch] = useState("KOL");

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [dataAdd, setDataAdd] = useState({
        name: "",
        id: "KOL"
    })

    useEffect(() => {
        getKolFields().then((res) => { setKolFields(res) })
        getEntFields().then((res) => { setEntFields(res) })
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

    const resultSearch = () => {
        let data = []
        if (typeFieldSearch === "KOL") {
            data = kolFields.filter((field) => {
                return (inputSearch === "" ? field : field.name.includes(inputSearch))
            })
        }
        if (typeFieldSearch === "ENTERPRISE") {
            data = entFields.filter((field) => {
                return (inputSearch === "" ? field : field.name.includes(inputSearch))
            })
        }
        return data
    }

    const onOpenModalAddField = () => {
        setOpenModalAdd(true)
    }

    const onCloseModalAddField = () => {
        setOpenModalAdd(false)
    }

    const onChangeDataAddField = (event) => {
        setDataAdd((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    }

    const onAddFieldHandler = () => {
        console.log(dataAdd);
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
                        <option key="KOL" value="KOL">
                            KOL
                        </option>
                        <option key="ENTERPRISE" value="ENTERPRISE">
                            ENTERPRISE
                        </option>
                    </select>
                    <Button onClick={onOpenModalAddField} >Thêm lĩnh vực</Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={resultSearch()}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["1", "5", "10", "20"],
                    }}
                />
            </div>

            <Modal
                width={800}
                title=""
                open={openModalAdd}
                onCancel={onCloseModalAddField}
                footer={[]}
            >
                <input
                    type="text"
                    placeholder="Nhập tên"
                    className={classes['add-modal-input']}
                    onChange={onChangeDataAddField}
                    name="name"
                />
                <select
                    className={classes['add-modal-select']}
                    onChange={onChangeDataAddField}
                    name="id"
                >
                    <option key="KOL" value="KOL">
                        KOL
                    </option>
                    <option key="ENTERPRISE" value="ENTERPRISE">
                        ENTERPRISE
                    </option>
                </select>
                <Button onClick={onAddFieldHandler}>Thêm</Button>
            </Modal>
        </>
    )
}

export default Fields