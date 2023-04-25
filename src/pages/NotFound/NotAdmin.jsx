import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'

const NotAdmin = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="warning"
            title="You are not ADMIN."
            extra={
                <Button type="primary" key="console" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            }
        />
    );
}
export default NotAdmin;