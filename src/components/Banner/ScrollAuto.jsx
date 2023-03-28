import { Carousel } from 'antd';
const contentStyle = {
    width: '100%',
    height: '200px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: "25px",
};
const ScrollAuto = () => (
    <Carousel autoplay>
        <div>
            <img style={contentStyle} src="https://playerduo.com/api/upload-service/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__fde23230-7152-11ed-a19f-23a3b10d190e__admin_banner.jpg" alt="" />
        </div>
        <div>
            <img style={contentStyle} src="https://playerduo.com/api/upload-service/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__b41d4400-ef49-11eb-a5b5-55d4c2fddb9c__admin_banner.jpg" alt="" />
        </div>
        <div>
            <img style={contentStyle} src="https://playerduo.com/api/upload-service/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__fde23230-7152-11ed-a19f-23a3b10d190e__admin_banner.jpg" alt="" />
        </div>
        <div>
            <img style={contentStyle} src="https://playerduo.com/api/upload-service/images/banner/715867c6-698f-411a-b4f9-1e9093130b60__b41d4400-ef49-11eb-a5b5-55d4c2fddb9c__admin_banner.jpg" alt="" />
        </div>
    </Carousel>
);
export default ScrollAuto;