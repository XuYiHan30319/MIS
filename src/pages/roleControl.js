import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isAuthorize } from '../utils/authorize';

export function RoleControl() {
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem("privileges")) || []);
  const [filteredRoles, setFilteredRoles] = useState(roles);
  const [addRoleVisible, setAddRoleVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorize()) {
      navigate('/login');
    }
  }, [navigate]);

  const columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editRole(record)}>Edit</Button>
          <Button onClick={() => deleteRole(record.role)} style={{ marginLeft: 8 }} danger>Delete</Button>
        </span>
      ),
    },
  ];

  const addRole = () => {
    setEditingRole(null);
    setAddRoleVisible(true);
    form.resetFields();
  };

  const editRole = (role) => {
    setEditingRole(role);
    setAddRoleVisible(true);
    form.setFieldsValue(role);
  };

  const deleteRole = (roleName) => {
    const updatedRoles = roles.filter(role => role.role !== roleName);
    setRoles(updatedRoles);
    setFilteredRoles(updatedRoles);
    localStorage.setItem("privileges", JSON.stringify(updatedRoles));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      let updatedRoles;
      if (editingRole) {
        updatedRoles = roles.map(role => role.role === editingRole.role ? values : role);
      } else {
        updatedRoles = [...roles, values];
      }
      setRoles(updatedRoles);
      setFilteredRoles(updatedRoles);
      localStorage.setItem("privileges", JSON.stringify(updatedRoles));
      setAddRoleVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setAddRoleVisible(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = roles.filter(role => role.role.toLowerCase().includes(searchValue));
    setFilteredRoles(filteredData);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据角色搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addRole}>Add Role</Button>
      </div>
      <Table dataSource={filteredRoles} columns={columns} rowKey="role" />
      <Modal title={editingRole ? 'Edit Role' : 'Add Role'} open={addRoleVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="roleForm">
          <Form.Item name="role" label="Role" rules={[{ required: true, message: '请输入角色名!' }]}>
            {editingRole ? <Input disabled /> : <Input />}
          </Form.Item>
          <Form.Item name="desc" label="Description" rules={[{ required: true, message: '请输入描述!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
