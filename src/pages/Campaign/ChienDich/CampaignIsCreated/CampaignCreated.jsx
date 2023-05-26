import React, { useState } from 'react'
import classes from '../../Campaign.module.css'
import InformationCampaign from './InformationCampaign'
import { Modal, Button, Avatar, message } from 'antd'
import ModalUpdateCampaign from './ModalUpdateCampaign'
import { EnvironmentFilled } from '@ant-design/icons';
import { deleteCampaign } from '../../../../services/CampaignService'

const CampaignCreated = ({ campaign, setCampaignDelete }) => {
    const [show, setShow] = useState({
        id: 0,
        status: false,
    })
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const onCancelShowHandler = () => {
        setShow({
            id: 0,
            status: false,
        });
    };

    const onDeleteCampaignHandler = () => {

        deleteCampaign(campaign.id).then(res => {
            setCampaignDelete(campaign.id)
            messageApi.open({
                type: 'success',
                content: 'Xóa thành công!',
            });
            setOpenDeleteModal(false)
        })
    }

    return (
        <div className={classes["created-campaign-container"]}>
            {contextHolder}
            <div className={classes["created-item"]}>
                <div className={classes["item-left"]} >
                    {campaign?.enterprise.avatar && <img
                        className={classes["image"]}
                        src={`http://localhost:8080/api/images/${campaign.images[0]}`}
                        onClick={() => { setShow({ id: 1, status: true }) }}
                        alt={campaign?.images[0]}
                    />}
                    {!campaign?.enterprise.avatar && <Avatar shape="square" size={150}>
                        {campaign?.enterprise?.firstName ? `${campaign?.enterprise?.firstName}` : ''}
                    </Avatar>}
                </div>
                <div className={classes["item-right"]}>
                    <div className={classes["item-right-top"]} onClick={() => { setShow({ id: 1, status: true }) }}>{campaign?.name}</div>
                    <div className={classes["item-right-middle"]}><EnvironmentFilled /> {campaign?.location}</div>
                    < div className={classes["item-right-bottom"]} >
                        <Button className={classes["bottom-btn"]} onClick={() => { setOpenDeleteModal(true) }}>Xóa</Button>
                        <Button className={classes["bottom-btn"]} onClick={() => { setShow({ id: 2, status: true }) }}>Sửa</Button>
                        <Button className={classes["bottom-btn"]} onClick={() => { setShow({ id: 1, status: true }) }}>Xem</Button>
                    </ div>
                </div>
            </div>

            {show.id === 1 && <InformationCampaign
                open={show}
                onCancelShowHandler={onCancelShowHandler}
                campaign={campaign}
            />}

            {show.id === 2 && <ModalUpdateCampaign
                open={show}
                campaign={campaign}
                onCancelShowHandler={onCancelShowHandler}
            />}

            <Modal
                open={openDeleteModal}
                onCancel={() => { setOpenDeleteModal(false) }}
                width={600}
                footer={[]}
            >
                <div>
                    `Xóa chiến dịch: {campaign?.name}
                </div>
                <div className={classes['admin-modal-delete']}>
                    <Button
                        onClick={onDeleteCampaignHandler}
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
        </div>
    )
}

export default CampaignCreated