import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className={classes.container}>
      {images.map((image, index) => (
        <div key={index} className={classes.container}>
          <img
            src={`http://localhost:8080/api/images/${image}`}
            alt={`Ảnh ${index}`}
            className={classes.silderImage}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
