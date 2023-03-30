import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SimpleSlider.css";
import { listImage } from "./data-details";
import { Image } from "antd";

const SimpleSlider = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const getImage = async () => {
      const dataImage = await listImage;
      setImageList([dataImage]);
    };
    getImage();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="detail-simple-slider">
        <Slider {...settings}>
          {imageList[0] &&
            imageList[0].length > 0 &&
            imageList[0].map((item, index) => (
              <Image
                className="image-item"
                key={index}
                height={90}
                src={item}
              />
            ))}
        </Slider>
      </div>
    </>
  );
};

export default SimpleSlider;
