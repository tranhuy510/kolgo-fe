import { useState } from "react";
import "./UploadFile.css";
import { Image } from "antd";

const UploadFile = (props) => {
  const [imageBase64, setImageBase64] = useState("");

  const handleChangeImage = (event) => {
    props.onChangeAvataMainHandler(event.target.files[0].name)
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result;
      setImageBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input type="file" onChange={handleChangeImage} />
      <div style={{ width: 500 }}>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Image width={100} src={imageBase64} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};
export default UploadFile;
