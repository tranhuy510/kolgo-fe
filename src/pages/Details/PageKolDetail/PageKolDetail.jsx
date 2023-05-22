import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ImageDescription from "./ImageDescription/ImageDescription";
import ContactSocials from "./ContactSocials/ContactSocials";
import InformationKOL from "./InformationKOL/InformationKOL";
import ListFields from "./ListFields/ListFields";
import NameMain from "./NameMain/NameMain";
import IntroduceKOL from "./IntroduceKOL/IntroduceKOL";
import Activate from "./Activate/Activate";
import Compare from "./Compare/Compare";
import Feedback from "./Feedback/Feedback";
import BookingCreate from "../../Booking/BookingCreate";

import "./HomeDetails.css";
import { Col, Row, Tabs } from "antd";
import ButtonFull from "../../../components/UI/Button/ButtonFull";
import { getKol } from "../../../services/KolService";

const description =
  "Xin chao \nMinh là trùm KOL trên tiktok \nrất vui được gặp mọi người <br/> \nMình giọng miền Bắc, ở nhà thường chơi game \nVui vẻ , nhiệt tình, thân thiện, hay cười, mình cũng dễ thương nữa =)) \nRất vui nếu được hợp tác cùng mọi người \n";

const danhgia = [
  {
    enterpriseId: 1,
    name: "Công ty TNHH 1 thành viên Thắng Trần",
    content: "quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot",
    date: new Date(2022, 5, 12),
    rate: 3,
  },
  {
    enterpriseId: 2,
    name: "Công ty TNHH 1 thành viên Thắng Trần",
    content: "quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot",
    date: new Date(2022, 5, 12),
    rate: 3,
  },
  {
    enterpriseId: 3,
    name: "Công ty TNHH 1 thành viên Thắng Trần",
    content: "quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot",
    date: new Date(2022, 5, 12),
    rate: 3,
  },
  {
    enterpriseId: 4,
    name: "Công ty TNHH 1 thành viên Thắng Trần",
    content: "quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot",
    date: new Date(2022, 5, 12),
    rate: 3,
  },
  {
    enterpriseId: 5,
    name: "Công ty TNHH 1 thành viên Thắng Trần",
    content: "quang cao rat hay, phuong phap rat moi, ket qua dat duoc rat tot",
    date: new Date(2022, 5, 12),
    rate: 3,
  },
];

const PageKolDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [kol, setKol] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  const onCancelOpenHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    getKol(id).then((res) => {
      setKol(res);
      checkStatus(res.bookings, user, res.kol);
    });
  }, []);

  useEffect(() => {
    document.title = `KOLgo | ${kol?.kol?.firstName} ${kol?.kol?.lastName}`;

    return () => {
      document.title = "KOLgo";
    };
  }, [kol?.kol?.id]);

  const checkStatus = (bookings, user, kol) => {
    if (!user) {
      setStatus("GUEST");
    } else if (kol.userId === user.id) {
      setStatus("ME");
    } else if (
      bookings.findIndex(
        (booking) => booking.user.id === user.id && booking.status === "PENDING"
      ) !== -1
    ) {
      setStatus("PENDING");
    } else if (
      bookings.findIndex(
        (booking) =>
          booking.user.id === user.id && booking.status === "ACCEPTED"
      ) !== -1
    ) {
      setStatus("ACCEPTED");
    } else setStatus("BOOK");
  };

  const navigateToChat = () => {
    navigate(`/chat`, { state: kol.kol });
  };

  const bookingHandler = () => {
    setOpen(true);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const onRedirect = () => {
    const booking = kol.bookings.find(
      (booking) => booking.status === status && booking.user.id === user.id
    );
    if (booking) {
      navigate(`/bookings/${booking.id}`);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <button className="btn-hoat-dong" style={{ fontSize: "18px" }}>
          Hoạt động
        </button>
      ),
      children: <Activate />,
    },
    {
      key: "2",
      label: (
        <button className="btn-so-sanh" style={{ fontSize: "18px" }}>
          So sánh
        </button>
      ),
      children: <Compare infoKol={kol?.kol} />,
    },
  ];

  return (
    <>
      <main className="main-details">
        {kol && (
          <BookingCreate
            kol={kol.kol}
            onCancelOpenHandler={onCancelOpenHandler}
            open={open}
          />
        )}
        <div className="container">
          <Row className="detail-description">
            <Col
              span={6}
              style={{ paddingRight: "10px", boxSizing: "border-box" }}
            >
              <ImageDescription
                images={kol?.kol?.images}
                avatar={kol?.kol?.avatar}
              />
              <ContactSocials
                facebookUrl={kol?.kol?.facebookUrl}
                instagramUrl={kol?.kol?.instagramUrl}
                tiktokUrl={kol?.kol?.tiktokUrl}
                youtubeUrl={kol?.kol?.youtubeUrl}
              />
            </Col>
            <Col span={12} className="col-12-middle">
              <Row style={{ padding: "20px" }}>
                <NameMain
                  firstName={kol?.kol?.firstName}
                  lastName={kol?.kol?.lastName}
                />
              </Row>
              <Row className="middle-row">
                <InformationKOL
                  email={kol?.kol?.email}
                  phoneNumber={kol?.kol?.phone}
                  gender={kol?.kol?.gender}
                  city={kol?.kol?.cityName}
                  addressDetails={kol?.kol?.addressDetails}
                />
              </Row>
              <Row className="middle-row">
                <ListFields
                  fieldNames={kol?.kol?.fieldNames}
                  fieldIds={kol?.kol?.fieldIds}
                />
              </Row>
              <Row className="middle-row">
                <IntroduceKOL description={description} />
              </Row>
            </Col>
            <Col span={6}>
              <div className="col-6-right">
                <div className="price-booking">
                  {kol?.kol?.postPrice} / 1 post
                </div>
                <div className="price-booking">
                  {kol?.kol?.videoPrice} / 1 video
                </div>
                {status === "GUEST" && <></>}
                {status === "ME" && <></>}
                {status === "BOOK" && (
                  <ButtonFull onClick={bookingHandler} className="btn-function">
                    Đặt
                  </ButtonFull>
                )}
                {status === "PENDING" && (
                  <ButtonFull onClick={onRedirect} className="btn-function">
                    Đang chờ
                  </ButtonFull>
                )}
                {status === "ACCEPTED" && (
                  <ButtonFull onClick={onRedirect} className="btn-function">
                    Cần thanh toán
                  </ButtonFull>
                )}
                {status !== "ME" && status !== "GUEST" && (
                  <ButtonFull onClick={navigateToChat} className="btn-function">
                    NHẮN TIN
                  </ButtonFull>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-details">
          <Tabs
            className="tab-item"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
        <div className="bottom-details">
          <Feedback danhgia={danhgia} />
        </div>
      </main>
    </>
  );
};
export default PageKolDetail;
