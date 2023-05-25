import { Result, Button } from 'antd';
import { NavLink } from "react-router-dom";

const Success = () => (
    <Result
        status="success"
        title="Xác thực đăng ký thành công!"
        subTitle="Bạn đã xác thực tài khoản thành công, hãy đến đăng nhập để sử dụng hệ thống."
        extra={
            <Button>
                <NavLink to="/login" >
                    <label >Đến đăng nhập</label>
                </NavLink>
            </Button>
        }
    />
);
export default Success;