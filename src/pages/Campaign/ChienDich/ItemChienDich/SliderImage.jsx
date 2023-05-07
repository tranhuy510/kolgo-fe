import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from '../../Campaign.module.css'
import { listImage } from "../dataChienDich";
import { Image } from "antd";

const SliderImage = () => {
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
    slidesToShow: 2,
    slidesToScroll: 2,
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
      <div className={classes["slider-image"]}>
        <Slider {...settings} className={classes["slider-component"]}>
          {imageList[0] &&
            imageList[0].length > 0 &&
            imageList[0].map((item, index) => (
              <Image
                className={classes["image-item"]}
                key={index}
                height={200}
                src={item}
              />
            ))}
        </Slider>
      </div>
    </>
  );
};

export default SliderImage;
