import { LinkOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Radio, Row, Select } from "antd";
import { useState } from "react";
import optionCity, { optionSpeciality } from "./option";

const user = [];

export default function FormProfileKOL(props) {
  const [value, setValue] = useState("male");
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
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
                defaultField:
                  user?.firstName && user?.lastName
                    ? `${user?.firstName} ${user?.lastName}`
                    : "",
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item label="Giới tính" name="gender">
            <Radio.Group
              onChange={onChangeRadio}
              value={value}
              defaultValue={user?.gender}
            >
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại">
            <Input
              defaultValue={user?.phoneNumber}
              placeholder="Số điện thoại"
            />
          </Form.Item>

          <Form.Item name="city" label="Tỉnh/Thành phố">
            <Select
              showSearch
              placeholder="Chọn tỉnh/thành phố làm việc"
              optionFilterProp="children"
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={optionCity}
            />
          </Form.Item>

          <Form.Item name="speciality" label="Lĩnh vực">
            <Select
              showSearch
              placeholder="Chọn lĩnh vực hoạt động"
              optionFilterProp="children"
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={optionSpeciality}
            />
          </Form.Item>

          <Form.Item name="linkFb" label="Facebook url">
            <Input
              type="url"
              defaultValue={user?.facebookUrl}
              placeholder="Link trang Facebook cá nhân"
              prefix=<LinkOutlined />
            />
          </Form.Item>
          <Form.Item name="linkYt" label="Youtube url">
            <Input
              type="url"
              defaultValue={user?.youtubeUrl}
              placeholder="Link kênh Youtube cá nhân"
              prefix=<LinkOutlined />
            />
          </Form.Item>
          <Form.Item name="linkInsta" label="Instagram url">
            <Input
              type="url"
              defaultValue={user?.instagramUrl}
              placeholder="Link trang Instagram cá nhân"
              prefix=<LinkOutlined />
            />
          </Form.Item>
          <Form.Item
            name="linkTt"
            label="TikTok url"
            rules={[
              {
                message: "Vui lòng nhập link profile TikTok",
              },
            ]}
          >
            <Input
              type="url"
              defaultValue={user?.tiktokUrl}
              placeholder="Link trang TikTok cá nhân"
              prefix=<LinkOutlined />
            />
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
      </Col>
    </Row>
  );
}
