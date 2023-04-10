import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index";
import "./HomeDetails.css";
import { userInfo, jobData, moreImage, danhGia } from "./data-details";
import SimpleSlider from "./SimpleSlider";
import { Image } from "antd";
import TiktokIcon from "../../assets/icon/icon-tiktok.png";
import FacebookIcon from "../../assets/icon/icon-facebook.png";
import IntagramIcon from "../../assets/icon/icon-intagram.png";
import YoutubeIcon from "../../assets/icon/icon-youtube.png";
import { Tabs } from "antd";
import HoatDong from "./HoatDong";
import SoSanh from "./SoSanh";
import { Avatar } from "antd";

const HomeDetails = () => {
  const [info, setInfo] = useState([]);
  const [job, setJob] = useState([]);
  const [moreImg, setMoreImg] = useState([]);
  const [rate, setRate] = useState([]);

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: <button className="btn-hoat-dong">Hoạt động</button>,
      children: <HoatDong />,
    },
    {
      key: "2",
      label: <button className="btn-so-sanh">So sánh</button>,
      children: <SoSanh />,
    },
  ];

  useEffect(() => {
    const getInfo = async () => {
      const getInfoData = await userInfo;
      setInfo(...getInfoData);

      const getJobData = await jobData;
      setJob([getJobData]);

      const getMoreImg = await moreImage;
      setMoreImg([getMoreImg]);

      const rateData = await danhGia;
      setRate([...rateData]);
    };
    getInfo();
  }, []);

  const handleClickTiktok = () => {
    console.log("go to tiktok");
  };

  const handleClickIntagram = () => {
    console.log("go to intagram");
  };

  const handleClickFacebook = () => {
    console.log("go to facebook");
  };
  const handleClickYoutube = () => {
    console.log("go to youtube");
  };

  return (
    <>
      <main className="main-details">
        <div className="top-details">
          <div className="detail-description">
            <div className="left-description">
              <div className="avatar">
                <Image className="image-avatar" src={info.avatar} />
              </div>
              <div className="slider-image">
                <SimpleSlider />
              </div>
              <div className="contact-info">
                <img
                  src={TiktokIcon}
                  alt="icon-tiktok"
                  onClick={handleClickTiktok}
                />
                <img
                  src={IntagramIcon}
                  alt="icon-intagram"
                  onClick={handleClickIntagram}
                />
                <img
                  src={FacebookIcon}
                  alt="icon-facebook"
                  onClick={handleClickFacebook}
                />
                <img
                  src={YoutubeIcon}
                  alt="icon-facebook"
                  onClick={handleClickYoutube}
                />
              </div>
            </div>
            <div className="right-description">
              <div className="name">
                <div className="name">
                  <span>{info.name}</span>
                </div>
                <button className="btn-book">BOOK</button>
              </div>
              <div className="gender">
                <div className="gender">
                  <span>Giới tính: {info.gender}</span>
                  <div>Khu vực: {info.address}</div>
                </div>
                <button className="btn-chat">CHAT</button>
              </div>
              <div className="introduce">
                <div className="title">giới thiệu bản thân</div>
                <div className="phone-number">{`Số điện thoại:  ${info.phoneNumber}`}</div>
                <div className="gmail">{`Gmail:  ${info.email}`}</div>
                <div className="title-job">Lĩnh vực nghề nghiệp</div>
                <div className="btn-job">
                  {job[0] &&
                    job[0].length &&
                    job[0].map((item, index) => (
                      <button key={index}>{item}</button>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="more-image">
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {moreImg[0] &&
                moreImg[0].length > 0 &&
                moreImg[0].map((item, index) => (
                  <div key={index} className="image-item">
                    <Image width={160} className="more-image" src={item} />
                  </div>
                ))}
              <div
                className={
                  moreImg[0] &&
                  moreImg[0].length > 0 &&
                  moreImg[0].length - 7 > 0
                    ? "see-more-image"
                    : "see-more-image__hide"
                }
              >
                +
                {moreImg[0] && moreImg[0].length > 0
                  ? moreImg[0].length - 7
                  : ""}
              </div>
            </Image.PreviewGroup>
          </div>
        </div>
        <div className="bottom-details">
          <Tabs
            className="tab-item"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
          <div className="form-danh-gia">
            <div className="title-danh-gia">Đánh giá:</div>
            <div className="rate">
              {rate &&
                rate.length > 0 &&
                rate.map((item, index) => (
                  <div key={index} className="rate-item">
                    <div className="rate-item__avatar">
                      <Avatar size={64} src={item.avatar} />
                    </div>
                    <div className="rate-item__content">
                      <div className="busines">{item.busines}</div>
                      <div className="content-is-rated">
                        {item.contentIsRated}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default HomeDetails;
