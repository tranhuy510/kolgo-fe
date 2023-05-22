import { Carousel } from "antd";
import banner1 from "../../assets/banner/banner_1.jpg";
import banner2 from "../../assets/banner/banner_2.jpg";
const contentStyle = {
  width: "100%",
  height: "200px",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "25px",
};
const ScrollAuto = () => (
  <Carousel autoplay>
    <div>
      <img style={contentStyle} src={banner1} alt="" />
    </div>
    <div>
      <img style={contentStyle} src={banner2} alt="" />
    </div>
    <div>
      <img style={contentStyle} src={banner1} alt="" />
    </div>
    <div>
      <img style={contentStyle} src={banner2} alt="" />
    </div>
  </Carousel>
);
export default ScrollAuto;
