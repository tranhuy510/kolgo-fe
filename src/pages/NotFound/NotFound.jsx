import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang này không tồn tại."
            extra={<Button onClick={() => navigate(-1)} type="primary">Trở lại</Button>}
        />
    )
};
export default NotFound;