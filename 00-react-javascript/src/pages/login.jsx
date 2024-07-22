import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {

  const navigate = useNavigate();

  const {setAuth} = useContext(AuthContext);

  const onFinish = async (values) => {

    const { email, password} = values;

    const res = await loginApi( email, password);

    
    if(res && res.EC === 0){
      localStorage.setItem("accessToken", res.accessToken);
      notification.success({
        message: 'Login success',
        description: 'You have successfully login'
      });

      setAuth({
        isAuthenticated: true,
        user: {
            email: res?.user?.email ?? "",
            name: res?.user?.email ?? "",
            role: res?.user?.role ?? ""
        },
      });

      navigate('/');
    }else{
      notification.error({
        message: 'Login failed',
        description: res?.EM ?? "error"
      });
    }

    console.log('Success:', res);
  };

  return (
    <div style={{margin: 50}}>
       <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
  
    onFinish={onFinish}
    autoComplete="off"
    layout="vertical"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />

    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
    </div>
   
  )
}

export default LoginPage