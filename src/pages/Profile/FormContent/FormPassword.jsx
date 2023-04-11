import { Button, Col, Form, Input, Row } from "antd";

export default function FormPassword({ user }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col span={16}>
        <h1 style={{ marginLeft: 30 }}>Tài khoản và mật khẩu</h1>
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" disabled defaultValue={user?.email} />
          </Form.Item>

          <Form.Item
            name="oldpasswod"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại!",
              },
            ]}
          >
            <Input placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            name="newpassword"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
            ]}
          >
            <Input placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="reenterpasswod"
            label="Nhập lại mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu mới!",
              },
            ]}
          >
            <Input placeholder="Nhập lại mật khẩu" />
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
