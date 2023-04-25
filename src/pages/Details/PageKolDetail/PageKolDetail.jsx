import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import ImageDescription from "./ImageDescription/ImageDescription";
import ContactSocials from "./ContactSocials/ContactSocials";
import InformationKOL from "./InformationKOL/InformationKOL";
import ListFields from "./ListFields/ListFields";
import NameMain from "./NameMain/NameMain";
import IntroduceKOL from "./IntroduceKOL/IntroduceKOL";
import Activate from "./Activate/Activate";
import Compare from './Compare/Compare'
import Rate from "./Rate/Rate";

import { getKolsId, getGenders, getCities, getFields } from "../../../services/getApi";

import "./HomeDetails.css";
import { Col, Row } from 'antd';
import { Tabs } from "antd";
import ButtonFull from '../../../components/UI/Button/ButtonFull'

const description = "Xin chao \nMinh là trùm KOL trên tiktok \nrất vui được gặp mọi người <br/> \nMình giọng miền Bắc, ở nhà thường chơi game \nVui vẻ , nhiệt tình, thân thiện, hay cười, mình cũng dễ thương nữa =)) \nRất vui nếu được hợp tác cùng mọi người \n"

const danhgia = [
  { enterpriseId: 1, name: 'Công ty TNHH 1 thành viên Thắng Trần', content: 'quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot', date: new Date(2022, 5, 12) },
  { enterpriseId: 2, name: 'Công ty TNHH 1 thành viên Thắng Trần', content: 'quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot', date: new Date(2022, 5, 12) },
  { enterpriseId: 3, name: 'Công ty TNHH 1 thành viên Thắng Trần', content: 'quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot', date: new Date(2022, 5, 12) },
  { enterpriseId: 4, name: 'Công ty TNHH 1 thành viên Thắng Trần', content: 'quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot', date: new Date(2022, 5, 12) },
  { enterpriseId: 5, name: 'Công ty TNHH 1 thành viên Thắng Trần', content: 'quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot', date: new Date(2022, 5, 12) },
]

const PageKolDetail = () => {
  const [infoKol, setInfoKol] = useState()
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [field, setField] = useState('')
  const [nameField, setNameField] = useState('')
  const urls = [
    infoKol?.facebookUrl,
    infoKol?.instagramUrl,
    infoKol?.tiktokUrl,
    infoKol?.youtubeUrl,
  ]
  const navigate = useNavigate();

  let { id } = useParams()
  id = id.substring(1)

  useEffect(() => {
    getKolsId(id)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        return res.json();
      })
      .then(data => {
        setInfoKol(data)
      })
  }, [id])

  useEffect(() => {
    getGenders()
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        return res.json();
      })
      .then(data => {
        setGender(data.find((item) => {
          return item.id === infoKol?.genderId
        }))
      })
  }, [infoKol?.genderId])

  useEffect(() => {
    getCities()
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        return res.json();
      })
      .then(data => {
        setCity(data.find((item) => {
          return item.id === infoKol?.cityId
        }))
      })
  }, [infoKol?.cityId])

  useEffect(() => {
    getFields()
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        return res.json();
      })
      .then(data => {
        setField(data.find((item) => {
          return item.id === infoKol?.kolFieldId
        }))
      })
  }, [infoKol?.kolFieldId])

  const navigateToChat = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('../login')
    }
    else navigate(`/Chat`, { state: { userId: infoKol.kolId } })
  }

  const bookingHandler = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('../login')
    }
  }

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <button className="btn-hoat-dong" style={{ fontSize: '18px' }}>Hoạt động</button>,
      children: <Activate />,
    },
    {
      key: "2",
      label: <button className="btn-so-sanh" style={{ fontSize: '18px' }}>So sánh</button>,
      children: <Compare infoKol={infoKol} />,
    },
  ];

  return (
    <>
      <main className="main-details">
        <div className="container">
          <Row className="detail-description">
            <Col span={6} style={{ paddingRight: '10px', boxSizing: 'border-box' }}>
              <ImageDescription images={infoKol?.images} />
              <ContactSocials urls={urls} />
            </Col>
            <Col span={12} className="col-12-middle">
              <Row style={{ padding: '20px' }}>
                <NameMain
                  firstName={infoKol?.firstName}
                  lastName={infoKol?.lastName}
                  gender={gender?.name}
                  city={city?.name}
                />
              </Row>
              <Row className="middle-row">
                <InformationKOL
                  email={infoKol?.email}
                  phoneNumber={infoKol?.phoneNumber}
                  gender={gender?.name}
                  city={city?.name}
                />
              </Row>
              <Row className="middle-row" >
                <ListFields
                  field={field}
                />
              </Row>
              <Row className="middle-row" >
                <IntroduceKOL
                  description={description}
                />
              </Row>
            </Col>
            <Col span={6}>
              <div className="col-6-right" >
                <div className="price-booking" >1.000.000</div>
                <ButtonFull onClick={bookingHandler} className="btn-function" >BOOK</ButtonFull>
                <ButtonFull onClick={navigateToChat} className="btn-function" >NHẮN TIN</ButtonFull>
              </div>
            </Col>
          </Row>
        </div >
        <div className="bottom-details">
          <Tabs
            className="tab-item"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
        <div className="bottom-details">
          <Rate danhgia={danhgia} />
        </div>
      </main >
    </>
  );
};
export default PageKolDetail;
