import React from 'react';
import { Form, Input, Button, Tabs, Typography, message } from 'antd';
import { useState } from 'react';

export function Login() {
  const [activeKey, setActiveKey] = useState('1');

  const valid = () => ({
    validator(_, value) {
      if (
        value &&
        value.length >= 8 &&
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value)
      ) {
        return Promise.resolve();
      }
      if (!value) {
        return Promise.resolve();
      }
      return Promise.reject(
        '密码至少8位，且包含大小写字母和数字！'
      );
    },
  });

  const login = () => {
    message.success('登入成功', 3);
  };

  const Register = () => {
    message.success('注册成功', 3);
    setActiveKey('1'); // 跳转到tab1
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={setActiveKey} centered>
          <Tabs.TabPane tab={<Typography.Title level={3}>登录</Typography.Title>} key="1">
            <Form
              onFinish={login}
              labelCol={{
                span: 8,
              }}
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
                  valid,
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Typography.Title level={3}>注册</Typography.Title>} key="2">
            <Form
              onFinish={Register}
              labelCol={{
                span: 8,
              }}
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
                  valid,
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
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" >
                  注册
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}