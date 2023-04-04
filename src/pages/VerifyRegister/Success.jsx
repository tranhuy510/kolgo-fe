import { Result } from 'antd';
import { NavLink } from "react-router-dom";

const Success = () => (
    <Result
        status="success"
        title="Successfully Verify Register!"
        subTitle="You have successfully confirmed your registration, please login to use the service."
        extra={
            <NavLink to="/login" >
                <label >Come login</label>
            </NavLink>
        }
    />
);
export default Success;