import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'

const NotAdmin = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="warning"
            title="Bạn không phải là ADMIN."
            extra={
                <Button type="primary" key="console" onClick={() => navigate(-1)}>
                    Trở lại
                </Button>
            }
        />
    );
}
export default NotAdmin;