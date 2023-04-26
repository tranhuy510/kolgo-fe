import React from "react";

const ImageGallery = (props) => {
  return (
    <div>
      {props.images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:8080/api/images/${image.name}`}
          alt={`Image ${index}`}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
