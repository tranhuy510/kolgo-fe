import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SimpleSlider.css";

import { Image } from "antd";


const SimpleSlider = ({ images, onChangeImageHandler }) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
          {images &&
            images.length > 0 &&
            images.map((item, index) => (
              <img
                onClick={(item) => { onChangeImageHandler(item.target.currentSrc) }}
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
