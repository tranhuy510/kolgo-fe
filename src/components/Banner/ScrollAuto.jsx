import { Carousel } from 'antd';
import banner_1 from '../../assets/banner/banner_1.jpg'
import banner_2 from '../../assets/banner/banner_2.jpg'
import banner_3 from '../../assets/banner/banner_3.jpg'
import banner_4 from '../../assets/banner/banner_4.jpg'



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
            <img style={contentStyle} src={banner_1} alt="" />
        </div>
        <div>
            <img style={contentStyle} src={banner_2} alt="" />
        </div>
        <div>
            <img style={contentStyle} src={banner_3} alt="" />
        </div>
        <div>
            <img style={contentStyle} src={banner_4} alt="" />
        </div>
    </Carousel>
);
export default ScrollAuto;