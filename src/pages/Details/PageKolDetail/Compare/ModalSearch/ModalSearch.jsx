import React, { useState, useEffect } from 'react'
import { Button, Modal, Image } from "antd";

const ModalSearch = (props) => {
    const [inputSearch, setInputSearch] = useState("");

    return (
        <Modal
            open={props.open}
            title="Danh Sách"
            onCancel={props.cancelShowHandler}
            className="modal-list-more-user"
            footer={[
                <Button key="back" onClick={props.cancelShowHandler}>
                    Cancel
                </Button>,
            ]}
        >
            <input
                placeholder="Nhập tên muốn tìm"
                onChange={(event) => setInputSearch(event.target.value)}
            />
            <div className="container-modal-search">
                {props.kols &&
                    props.kols.length > 0 &&
                    props.kols
                        .filter((item) => {
                            return inputSearch.toLowerCase() === ""
                                ? item
                                : item.firstName
                                    .toLowerCase()
                                    .includes(inputSearch.toLowerCase())
                                || item.lastName
                                    .toLowerCase()
                                    .includes(inputSearch.toLowerCase())
                        })
                        .map((item, index) => (
                            <div className="item-search-user" key={index}>
                                <Image className="image-item-user" src={item.avatar} />
                                <div className="name-item-user">{item.firstName} {item.lastName}</div>
                                <div
                                    className="content-item-user"
                                    onClick={() => props.chooseUserCompare(item)}
                                >
                                    Thêm so sánh
                                </div>
                            </div>
                        ))}
            </div>
        </Modal>
    )
}

export default ModalSearch