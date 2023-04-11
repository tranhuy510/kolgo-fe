import { Button, Col, Form, Input, Row } from "antd";

const user = [];

export default function FormEmail(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col span={16}>
        <h1 style={{ marginLeft: 30 }}>Email</h1>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Email!",
                defaultField: user.email ? user.email : "",
              },
            ]}
          >
            <Input placeholder="Nhập Email của bạn" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ background: "var(--color-primary-1)" }}
            >
              Thay đổi Email
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
