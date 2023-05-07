import React, { useState, useContext } from "react";

import { Button, Modal } from "antd";
import { format } from "date-fns";
import Modals from "../../../../components/UI/Modal/Modals";

import classes from '../../Campaign.module.css';
import ListFields from "./ListFields";
import ThongTinChienDich from "./ThongTinChienDich";
import CampaignContext from "../../../../context/campaign.context";

const ItemChienDich = (props) => {
    const [openThamGia, setOpenThamGia] = useState(false);
    const [openThongTin, setOpenThongTin] = useState(false);
    const [noti, setNoti] = useState({
        status: false,
        title: '',
        content: '',
    });
    const userCtx = useContext(CampaignContext);

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
        handleCancelThamGia();
    };

    const changeNotificationHandler = () => {
        setNoti({ status: false })
    }

    const createSuccessNoti = () => {
        setNoti({ status: true, title: 'success', content: 'Chiến dịch này bạn đã tham gia' })
    }

    const createErrorNoti = () => {
        setNoti({ status: true, title: 'error', content: 'Hãy đăng nhập' })
    }

    const joinHandler = (listKOL, listEnter) => {
        if (userCtx.user) {
            if (userCtx.user.role === 'KOL') {
                const found = listKOL.find(item => item.kolId === userCtx.idRole)
                if (found) {
                    createSuccessNoti();
                }
                else showModalThamGia()
            }
            if (userCtx.user.role === 'ENTERPRISE') {
                const found = listEnter.find(item => item.enterpriseId === userCtx.idRole)
                if (found) {
                    createSuccessNoti();
                }
                else showModalThamGia()
            }
        }
        else createErrorNoti();
    };

    return (
        <div className={classes["child-chien-dich-container"]}>
            {noti.status &&
                <Modals status={noti.status} title={noti.title} content={noti.content} changeNotification={changeNotificationHandler} />
            }
            <div className={classes["chenDich-container-wrap-header"]}>
                <div className={classes["wrap-header-name-chienDich"]}>
                    <label className={classes["chienDich-item-title"]}>TÊN CHIẾN DỊCH: </label>
                    <div className={classes["chienDich-item-title-data"]}>{props.data.tenchiendich}</div>
                </div>
                <div className={classes["wrap-header-nguoiTao"]}>
                    <label className={classes["chienDich-item-title"]} >NGƯỜI TẠO: </label>
                    <label className={classes["chienDich-item-title-data"]}>{props.data.author.name}</label>
                </div>.
            </div>
            <div className={classes["infor-chien-dich"]}>
                <div className={classes["left-infor"]}>
                    <img
                        className={classes["anh"]}
                        src={props.data.anh}
                        alt={props.data.tenchiendich}
                    />
                </div>
                <div className={classes["right-infor"]}>
                    <div className={classes["thoi-gian"]}>
                        <label className={classes["chienDich-item-title-small"]}>Thời gian diễn ra: </label>
                        <label className={classes["chienDich-item-title-data"]}>
                            {`${format(new Date(props.data.batdau), "dd/MM/yyyy")} - ${format(
                                new Date(props.data.ketthuc),
                                "dd/MM/yyyy"
                            )}`}
                        </label>

                    </div>
                    <div className={classes["linh-vuc"]}>
                        <label className={classes["chienDich-item-title-small"]}>Lĩnh Vực: </label>
                        <div className={classes["linh-vuc-list"]}>
                            {props.data.linhvuc.map((item) => (
                                <ListFields
                                    key={item.id}
                                    className={classes["chienDich-item-title-data"]}
                                    field={item}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={classes["mo-ta"]}>
                        <div className={classes["chienDich-item-title-small"]}>Mô tả chiến dịch:</div>
                        <div className={classes["chienDich-item-title-data"]}>{props.data.mota}</div>
                    </div>
                    <div className={classes["action"]}>
                        <Button className={classes["action-btn"]} onClick={showModalThongTin}>Thông tin</Button>
                        {userCtx.user && <Button className={classes["action-btn"]} onClick={() => { joinHandler(props.data.listKOL, props.data.listEnter) }}>Tham gia</Button>}
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
                        <Button key="thamgia" type="primary" onClick={joinHandler}>
                            Có
                        </Button>,
                    ]}
                >
                    <div style={{ margin: "20px", fontSize: "18px", fontWeight: "600" }}>
                        Xác nhận tham gia
                    </div>
                </Modal>

                <ThongTinChienDich
                    openThongTin={openThongTin}
                    handleCancelThongTin={handleCancelThongTin}
                    data={props.data}
                    joinHandler={joinHandler}
                />
            </div>
        </div>
    );
}

export default ItemChienDich