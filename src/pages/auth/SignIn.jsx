import React, {useState} from "react";
import {Form, Input, Button, Checkbox, message, notification} from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callLogin} from "../../services/api.js";
import {doLoginAction} from "../../redux/account/accountSlice.js";


const { Title } = Typography;

export default function SignIn() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);


  const onFinish = async (values) => {
    console.log('Success:', values);
    const { username, password } = values;
    setLoading(true);

    const res = await callLogin({ username, password });
    console.log(res);
    setLoading(false);

    if (res?.data?.user) {
      localStorage.setItem('access_token', res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      form.resetFields();
      message.success('Đăng nhập thành công');
      navigate("/");
    } else {
      notification.error({
        message: 'Something went wrong!',
        description: res?.data?.message ? res.data.message : res.message,
        duration: 1,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="signin"
        form={form}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title level={2} className="text-center">
          Sign in
        </Title>
        <Form.Item
          name="username"
          hasFeedback
          label="Email address"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input your email.",
            },
            {
              type: "email",
              message: "Your email is invalid.",
            },
          ]}
        >
          <Input placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          label="Password"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please input your password.",
            },
            { min: 5, message: "Password must be minimum 5 characters." },
          ]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password?
          </a>
        </Form.Item>

        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          shape="round"
          icon={<LoginOutlined />}
          size="large"
        >
          Sign In
        </Button>
      </Form>
    </>
  );
}
