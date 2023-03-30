import "./SoSanh.css";
import { Button, Modal } from "antd";
import { useEffect, useState, lazy } from "react";
import { listUser, userInfo } from "./data-details";
import TiktokIcon from "../../assets/icon/icon-tiktok.png";
import FacebookIcon from "../../assets/icon/icon-facebook.png";
import IntagramIcon from "../../assets/icon/icon-intagram.png";
import { StarFilled } from "@ant-design/icons";
import { Image } from "antd";

const SoSanh = () => {
  const [info, setInfo] = useState([]);
  const [listuser, setListuser] = useState([]);
  const [dataUser2, setDataUser2] = useState({});
  const [open, setOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const getListUser = async () => {
      const userInfoData = await userInfo;
      setInfo(...userInfoData);

      const lisetUserData = await listUser;
      setListuser([...lisetUserData]);
    };
    getListUser();
  }, []);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleClickCompare = (data) => {
    setDataUser2(data);
    handleCancel();
  };
  return (
    <div className="form-so-sanh">
      <div className="compare-avatar">
        <div className="container-avatar">
          <div
            className="image image-left"
            style={{
              backgroundImage: `url(${info && info.avatar})`,
            }}
          ></div>
          <div className={info ? "bottom-content" : "bottom-content-hide"}>
            <button>{info && info.price}</button>
            <StarFilled className="icon-start" />
            <div className="start-score">{info && info.rateStart}</div>
          </div>
        </div>

        <div className="image image-center"></div>

        <div className="container-avatar">
          <div
            className="image image-right"
            style={{
              backgroundImage: `url(${dataUser2 && dataUser2.avatar})`,
            }}
          ></div>
          <div
            className={dataUser2.id ? "hide-more-user" : "more-user-compare"}
            onClick={showModal}
            style={{
              backgroundImage: `url(https://banner2.cleanpng.com/20180315/qae/kisspng-computer-icons-plus-sign-clip-art-plus-sign-5aaad899307aa1.3479178215211460091986.jpg)`,
            }}
          ></div>
          <Modal
            open={open}
            title="Danh Sách"
            onCancel={handleCancel}
            className="modal-list-more-user"
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
            ]}
          >
            <input
              placeholder="Nhập tên muốn tìm"
              onChange={(event) => setInputSearch(event.target.value)}
            />
            <div className="container-modal-search">
              {listuser &&
                listuser.length > 0 &&
                listuser
                  .filter((item) => {
                    return inputSearch.toLowerCase() === ""
                      ? item
                      : item.name
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase());
                  })
                  .map((item, index) => (
                    <div className="item-search-user" key={index}>
                      <Image className="image-item-user" src={item.avatar} />
                      <div className="name-item-user">{item.name}</div>
                      <div
                        className="content-item-user"
                        onClick={() => handleClickCompare(item)}
                      >
                        Thêm so sánh
                      </div>
                    </div>
                  ))}
            </div>
          </Modal>
          <div
            className={dataUser2.id ? "bottom-content" : "bottom-content-hide"}
          >
            <button>{dataUser2 && dataUser2.price}</button>
            <StarFilled className="icon-start" />
            <div className="start-score">
              {dataUser2 && dataUser2.rateStart}
            </div>
          </div>
        </div>
      </div>

      <div className="compare-interact">
        <img
          className="comparisonType-image"
          src={FacebookIcon}
          alt="icon-tiktok"
        />
        <div>{info && info.faceBook}</div>
        <div>{dataUser2 && dataUser2.faceBook}</div>
      </div>
      <div className="compare-interact">
        <img
          className="comparisonType-image"
          src={IntagramIcon}
          alt="icon-tiktok"
        />
        <div>{info && info.intagram}</div>
        <div>{dataUser2 && dataUser2.intagram}</div>
      </div>
      <div className="compare-interact">
        <img
          className="comparisonType-image"
          src={TiktokIcon}
          alt="icon-tiktok"
        />
        <div>{info && info.tiktok}</div>
        <div>{dataUser2 && dataUser2.tiktok}</div>
      </div>
      <div className="compare-interact">
        <span className="comparisonType-text">Số lượng book hàng tháng</span>
        <div>{info && info.quantityMonth}</div>
        <div>{dataUser2 && dataUser2.quantityMonth}</div>
      </div>
    </div>
  );
};
export default SoSanh;
