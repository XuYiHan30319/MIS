import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tree } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isAuthorize } from '../utils/authorize';

export function RoleControl() {
  const [roles, setRoles] = useState(JSON.parse(localStorage.getItem("privileges")) || []);
  const [filteredRoles, setFilteredRoles] = useState(roles);
  const [menus, setMenus] = useState([]);
  const [addRoleVisible, setAddRoleVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [privilegeVisible, setPrivilegeVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthorize("角色管理")){
      navigate('/dashboard');
    }
    const storedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    setMenus(transformToTreeData(storedMenus));
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
          <Button onClick={() => managePrivilege(record)} style={{ marginLeft: 8 }}>Privilege</Button>
        </span>
      ),
    },
  ];

  const transformToTreeData = (menuList) => {
    const treeData = [];
    const map = {};

    menuList.forEach(menu => {
      const { title, path, parent } = menu;
      const key = path || title;

      if (!map[key]) {
        map[key] = { title, key, children: [], allowUser: menu.allowUser };
      }

      if (parent) {
        const parentKey = parent;
        if (!map[parentKey]) {
          map[parentKey] = { title: parent, key: parentKey, children: [] };
        }
        map[parentKey].children.push(map[key]);
      } else {
        treeData.push(map[key]);
      }
    });

    return treeData;
  };

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

  const managePrivilege = (role) => {
    setEditingRole(role);
    const storedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    const roleMenus = storedMenus
      .filter(menu => menu.allowUser && menu.allowUser.includes(role.role))
      .map(menu => menu.path || menu.title);
    setSelectedKeys(roleMenus);
    setPrivilegeVisible(true);
  };

  const handlePrivilegeOk = () => {
    const storedMenus = JSON.parse(localStorage.getItem("menus"));
    const updatedMenus = storedMenus.map(menu => {
      if (selectedKeys.includes(menu.path || menu.title)) {
        return { ...menu, allowUser: [...new Set([...(menu.allowUser || []), editingRole.role])] };
      } else {
        return { ...menu, allowUser: (menu.allowUser || []).filter(user => user !== editingRole.role) };
      }
    });
    localStorage.setItem("menus", JSON.stringify(updatedMenus));
    setPrivilegeVisible(false);
  };

  const handlePrivilegeCancel = () => {
    setPrivilegeVisible(false);
  };

  const onCheck = (checkedKeys) => {
    setSelectedKeys(checkedKeys);
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
      {/* 用户管理 */}
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
      {/* 权限管理 */}
      <Modal title="Manage Privileges" open={privilegeVisible} onOk={handlePrivilegeOk} onCancel={handlePrivilegeCancel}>
        <Tree
          checkable
          onCheck={onCheck}
          checkedKeys={selectedKeys}
          treeData={menus}
        />
      </Modal>
    </div>
  );
}
