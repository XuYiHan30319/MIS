import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Tabs, message,Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { passwordValid, emailValid } from '../../utils/userInfoVaild';

export function Login() {
  const [activeKey, setActiveKey] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const login = (values) => {
    //查找用户是否存在
    let users = JSON.parse(localStorage.getItem("user")) || [];
    let user = users.find(user => user.username === values.username);
    if (!user) {
      message.error('用户不存在', 3);
      return;
    }
    let password = CryptoJS.SHA256(values.password).toString();
    if (user.password !== password) {
      message.error('密码错误', 3);
      return;
    }
    message.success('登入成功', 3);
    localStorage.setItem('isLogin', 'true'); // 设置登录状态
    localStorage.setItem('username', user.username); // 设置用户名
    localStorage.setItem('privilege', user.privilege); // 设置权限
    navigate('/manage/dashboard'); // 跳转到首页
  };

  const Register = (values) => {
    let users = JSON.parse(localStorage.getItem("user")) || [];
    //查重
    if (users.find(user => user.username === values.username)) {
      message.error('用户已存在', 3);
      return;
    }
    users.push({
      username: values.username,
      password: CryptoJS.SHA256(values.password).toString(),
      email: values.email,
      privilege: "普通用户"
    });
    localStorage.setItem("user", JSON.stringify(users));
    setActiveKey('1');
    message.success('注册成功', 3);
  };


  const items = [
    {
      key: "1",
      label: <Typography.Title level={3}>登录</Typography.Title>,
      children: (
        <Form
          onFinish={(values) => {
            login(values);
          }}
          labelCol={{
            span: 8,
          }}
          style={{ marginLeft: '-100px' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              passwordValid,
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            style={{ marginLeft: '290px' }}
          >
            <Button type="primary" htmlType="submit" >
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: <Typography.Title level={3}>注册</Typography.Title>,
      children: (
        <Form
          onFinish={(values) => {
            Register(values);
          }}
          labelCol={{
            span: 8,
          }}
          style={{ marginLeft: '-100px' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
              emailValid,
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              passwordValid,
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="再次输入密码"
            name="repeatpassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') !== value) {
                    return Promise.reject('两次输入的密码不一致！');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            style={{ marginLeft: '290px' }}
          >
            <Button type="primary" htmlType="submit" >
              注册
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={setActiveKey} centered items={items} />
      </div>
    </div>
  );
}