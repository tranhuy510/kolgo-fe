import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getEntsId, getFields } from "../../../services/getApi";
import classes from './PageEntDetail.module.css'
import InformationHeader from "./InformationHeader/InformationHeader";
import Introduce from "./Introduce/Introduce";
import Activity from "./Activity/Activity";
import Campaign from "./Campaign/Campaign";

import { Col, Row } from 'antd';

const PageEntDetail = () => {
    const [infoEnt, setInfoEnt] = useState()
    const [fields, setFields] = useState('')
    const [show, setShow] = useState(0)
    const navigate = useNavigate();

    let { id } = useParams()

    useEffect(() => {
        const identifier = setTimeout(() => {
            getEntsId(id)
                .then(res => {
                    if (!res.ok) {
                        return Promise.reject(res)
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setInfoEnt(data)
                })
        }, 500)
        return () => {
            clearTimeout(identifier)
        }
    }, [id])

    useEffect(() => {
        const identifier = setTimeout(() => {
            getFields()
                .then(res => {
                    if (!res.ok) {
                        return Promise.reject(res)
                    }
                    return res.json();
                })
                .then(data => {
                    setFields(data.find((item) => {
                        return item.id === infoEnt?.enterpriseFieldId
                    }))
                })
        }, 500)
        return () => {
            clearTimeout(identifier)
        }
    }, [infoEnt?.enterpriseFieldId])

    const onClickShowHandler = (index) => {
        setShow(index)
    }

    return (
        <div className={classes["main-detail-enterprise"]}>
            <Row className={classes["detail-enterprise-row-1-header"]}>
                <Col span={16}>
                    <InformationHeader infoEnt={infoEnt} onClickShowHandler={onClickShowHandler}></InformationHeader>
                </Col>
            </Row>
            <Row className={classes["detail-enterprise-row-2-middle"]}>
                <Col span={16} className={classes["row-2-col-1"]}>
                    {show == 0 && (<Introduce infoEnt={infoEnt} />)}
                    {show == 1 && (<Activity />)}
                    {show == 2 && (<Campaign />)}
                </Col>
            </Row>
        </div>
    )
}

export default PageEntDetail