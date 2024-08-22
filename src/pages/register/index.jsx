import React from 'react';
import {Button, Checkbox, Divider, Form, Input, message, notification} from 'antd';
import {createBrowserRouter, useNavigate} from "react-router-dom";
 import {callRegister} from "../../services/api.js";


const RegisterForm = () => {

        const navigate = useNavigate();

        const [isSubmit, setIsSubmit] = React.useState(false);

        const onFinish = async (values) => {
            console.log('Success:', values);
            const { name, email, password } = values;
            setIsSubmit(true);

            const res = await callRegister({name, email, password});
            setIsSubmit(false);

            if(res?.data){
                message.success('Đăng ký thành công!');
                navigate("/login");
            }else{
                notification.error({
                    message: 'Có lỗi xẩy ra !',
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 1,
                })
            }

        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className="register-page" style={{padding: '50px'}}>
                <h3 style={{textAlign: 'center'}}>Register Form</h3>
                <Divider/>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600, margin: '0  auto',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Fullname"
                        name="name"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your fullname!',
                        //     },
                        // ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label="Email"
                        name="email"
                        // rules={[
                        //     {
                        //         required: true,
                        //         type: 'email',
                        //         message: 'Please input your email!',
                        //     },
                        // ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label="Password"
                        name="password"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your password!',
                        //     },
                        // ]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <div><button onClick={() => navigate('/login')}>login</button></div>
            </div>

        )

    }
;
export default RegisterForm;