import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import CryptoJS from 'crypto-js';
import { passwordValid, emailValid } from '../../utils/userInfoVaild';
import { isAuthorize } from '../../utils/authorize';

export function UserControl() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Privilege',
      dataIndex: 'privilege',
      key: 'privilege',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editUser(record)}>Edit</Button>
          <Button onClick={() => deleteUser(record.username)} style={{ marginLeft: 8 }} danger>Delete</Button>
        </span>
      ),
    },
  ];

  const addUser = () => {
    setEditingUser(null);
    setAddUserVisible(true);
    form.resetFields();
  };

  const editUser = (user) => {
    setEditingUser(user);
    setAddUserVisible(true);
    form.setFieldsValue({
      ...user,
      password: '',
      repeatPassword: ''
    });

    const index = users.findIndex(u => u.username === user.username);
    if (index !== -1) {
      users[index] = user;
      setUsers(users);
      localStorage.setItem("user", JSON.stringify(users));
    }
  };
  
  const deleteUser = (username) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUsers));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (values.password !== values.repeatPassword) {
        message.error('两次密码不一致', 3);
        return;
      }
      let updatedUsers;
      values.password = CryptoJS.SHA256(values.password).toString();
      if (editingUser) {
        updatedUsers = users.map(user => user.username === editingUser.username ? values : user);
      } else {
        updatedUsers = [...users, values];
      }
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      localStorage.setItem("user", JSON.stringify(updatedUsers));
      setAddUserVisible(false);
    }).catch(info => {
    });
  };

  const handleCancel = () => {
    setAddUserVisible(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = users.filter(user => user.username.toLowerCase().includes(searchValue));
    setFilteredUsers(filteredData);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorize('用户管理')) {
      navigate('/manage/dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据权限名搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addUser}>Add User</Button>
      </div>
      <Table dataSource={filteredUsers} columns={columns} rowKey="username" pagination={{ pageSize: 7 }} />
      <Modal title={editingUser ? 'Edit User' : 'Add User'} open={addUserVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item name="username" label="Username" >
            {editingUser ? <Input disabled /> : <Input />}
          </Form.Item>
          <Form.Item name="privilege" label="Privilege" rules={[{ required: true, message: '选择用户权限!' }]}>
            <Select>
              {
                localStorage.getItem("privileges") && JSON.parse(localStorage.getItem("privileges")).map(privilege => (
                  <Select.Option key={privilege.role} value={privilege.role}>{privilege.role}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: '输入密码!' }, passwordValid]}>
            <Input />
          </Form.Item>
          <Form.Item name="repeatPassword" label="repeatPassword" rules={[{ required: true, message: '再次输入密码!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: '输入用户邮箱!' }, emailValid]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
