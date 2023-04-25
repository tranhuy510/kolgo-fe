import React, { useState } from 'react'

import MenuIntroduce from './MenuIntroduce';
import SubContentIntroduce from './SubContentIntroduce'

import classes from '../PageEntDetail.module.css'
import { Col, Row } from "antd";

const Introduce = (props) => {
    const [changeContent, setChangeContent] = useState(0);

    const onChangeContentHandler = (data) => {
        setChangeContent(data);
        console.log(data);
    };

    return (
        <div className={classes['enterprise-detail-container']}>
            <div className={classes['enterprise-detail-introduce']}>
                <Row tyle={{ boxSizing: 'border-box' }}>
                    <Col span={8}>
                        <h1 style={{ marginBottom: '0' }}>Giới thiệu</h1>
                        <MenuIntroduce
                            onChangeContentHandler={onChangeContentHandler}
                        />
                    </Col>
                    <Col span={16} style={{ borderLeft: '1px solid #ccc' }}>
                        <SubContentIntroduce infoEnt={props.infoEnt} changeContent={changeContent} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Introduce