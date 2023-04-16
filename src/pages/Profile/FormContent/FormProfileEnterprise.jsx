import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Select } from "antd";
import optionCity, { optionSpeciality } from "./option";

const user = [];

export default function FormProfileKOL(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Row>
      <Col span={16}>
        <h1 style={{ marginLeft: 30 }}>Thông tin cá nhân</h1>
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 17,
          }}
          style={{
            maxWidth: 400,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input placeholder="Họ và tên" defaultValue={user?.name} />
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại">
            <Input
              defaultValue={user?.phoneNumber}
              placeholder="Số điện thoại"
            />
          </Form.Item>

          <Form.Item name="taxIdentificationNumber" label="Mã số thuế">
            <Input
              defaultValue={user?.taxIdentificationNumber}
              placeholder="Mã số thuế"
            />
          </Form.Item>

          <Form.Item name="speciality" label="Lĩnh vực">
            <Select
              showSearch
              placeholder="Chọn lĩnh vực hoạt động"
              optionFilterProp="children"
              defaultValue={user?.speciality}
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={optionSpeciality}
            />
          </Form.Item>

          <Form.Item name="city" label="Tỉnh/Thành phố">
            <Select
              showSearch
              placeholder="Chọn tỉnh/thành phố địa chỉ"
              optionFilterProp="children"
              defaultValue={user?.city}
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={optionCity}
            />
          </Form.Item>

          <Form.Item name="addressDetail" label="Quận/Huyện">
            <Input defaultValue={user?.address} placeholder="Địa chỉ cụ thể" />
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
      <Col span={8} style={{ marginTop: "30px" }}>
        <h3>Ảnh đại diện</h3>
        <Avatar size={150} src={user?.image}>
          {user.image ? (
            ""
          ) : (
            <UserOutlined style={{ fontSize: 70, lineHeight: "150px" }} />
          )}
        </Avatar>
        <Button style={{ marginTop: 10 }} icon={<EditOutlined />}>
          Thay đổi
        </Button>
      </Col>
    </Row>
  );
}
