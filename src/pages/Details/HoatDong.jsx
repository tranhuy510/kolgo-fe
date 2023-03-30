import "./HoatDong.css";
import { chartBook } from "./data-details";
import { useEffect, useState } from "react";

const HoatDong = () => {
  const [persent, setPersent] = useState([]);

  useEffect(() => {
    const getPersentData = async () => {
      const persentData = await chartBook;
      setPersent([...persentData]);
    };
    getPersentData();
  }, []);

  return (
    <>
      <div className="form-hoat-dong">
        <div className="char-layout">
          {persent &&
            persent.length > 0 &&
            persent.map((item, index) => (
              <div
                key={index}
                style={{ height: `${item.percent}` }}
                className="char-layout-item"
              >
                {item.percent}
              </div>
            ))}
          <div className="title-char-layout">Hoạt động</div>
        </div>
        <div className="count-book">
          {persent &&
            persent.length > 0 &&
            persent.map((item, index) => (
              <div key={index} className="count-book-item">
                {item.countBook}
              </div>
            ))}
          <div className="title-count-book">Số Lượng Book</div>
        </div>
        <div className="month-book">
          {persent &&
            persent.length > 0 &&
            persent.map((item, index) => (
              <div key={index} className="month">
                {item.month}
              </div>
            ))}
          <div className="title-month">Tháng</div>
        </div>
      </div>
    </>
  );
};
export default HoatDong;
