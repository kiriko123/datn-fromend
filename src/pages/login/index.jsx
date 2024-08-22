import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callLogin} from "../../services/api.js";
 import {doLoginAction} from "../../redux/account/accountSlice.js";

const LoginPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const {username, password} = values;
        setLoading(true);

        const res = await callLogin({username, password});
        console.log(res);
        setLoading(false);


        if(res?.data?.user){
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success('Đăng nhập thành công');
            navigate("/");
        }else{
            notification.error({
                message: 'Có lỗi xẩy ra !',
                description: res?.data?.message ? res.data.message : res.message,
                duration: 1,
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <div className="">
            <div className="">
                <h2 className="">Login</h2>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Email"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input className=""/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password className=""/>
                    </Form.Item>


                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className=""
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>


                    <Form.Item className="">
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className=""
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div className="">

                    <div>
                        <a href="#" className="">Forgot password?</a>
                    </div>
                    <div className=" ">
                        <div><span>Don't have an account? </span></div>
                        <Link to="/register" className="">Register now</Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
