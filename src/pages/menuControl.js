import React, { useState } from 'react';
import { Tree, Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export function MenuControl() {
  const [menus, setMenus] = useState(JSON.parse(localStorage.getItem('menus')) || []);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const onSelect = (selectedKeys, info) => {
    setSelectedMenu(info.node);
  };

  const addMenu = () => {
    setIsEditing(false);
    setModalVisible(true);
    form.resetFields();
  };

  const editMenu = () => {
    if (!selectedMenu) {
      message.warning('请选择一个菜单项进行编辑');
      return;
    }
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue({
      title: selectedMenu.title,
      path: selectedMenu.path,
    });
  };

  const deleteMenu = () => {
    if (!selectedMenu) {
      message.warning('请选择一个菜单项进行删除');
      return;
    }
    const updatedMenus = removeMenu(menus, selectedMenu.key);
    setMenus(updatedMenus);
    localStorage.setItem('menus', JSON.stringify(updatedMenus));
    setSelectedMenu(null);
  };

  const removeMenu = (menus, key) => {
    return menus.reduce((acc, menu) => {
      if (menu.key === key) {
        return acc;
      }
      if (menu.children) {
        menu.children = removeMenu(menu.children, key);
      }
      acc.push(menu);
      return acc;
    }, []);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      let updatedMenus;
      if (isEditing) {
        updatedMenus = updateMenu(menus, selectedMenu.key, values);
      } else {
        const newMenu = { ...values, key: Date.now().toString() };
        if (selectedMenu) {
          updatedMenus = addSubMenu(menus, selectedMenu.key, newMenu);
        } else {
          updatedMenus = [...menus, newMenu];
        }
      }
      setMenus(updatedMenus);
      localStorage.setItem('menus', JSON.stringify(updatedMenus));
      setModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const updateMenu = (menus, key, values) => {
    return menus.map(menu => {
      if (menu.key === key) {
        return { ...menu, ...values };
      }
      if (menu.children) {
        menu.children = updateMenu(menu.children, key, values);
      }
      return menu;
    });
  };

  const addSubMenu = (menus, parentKey, newMenu) => {
    return menus.map(menu => {
      if (menu.key === parentKey) {
        if (!menu.children) {
          menu.children = [];
        }
        menu.children.push(newMenu);
      } else if (menu.children) {
        menu.children = addSubMenu(menu.children, parentKey, newMenu);
      }
      return menu;
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const treeData = menus.map(menu => ({
    title: menu.title,
    key: menu.key,
    children: menu.children ? menu.children.map(subMenu => ({
      title: subMenu.title,
      key: subMenu.key,
      path: subMenu.path,
      children: subMenu.children,
    })) : [],
  }));

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={addMenu}>Add Menu</Button>
        <Button type="primary" icon={<EditOutlined />} onClick={editMenu} style={{ marginLeft: 8 }}>Edit Menu</Button>
        <Button type="danger" icon={<DeleteOutlined />} onClick={deleteMenu} style={{ marginLeft: 8 }}>Delete Menu</Button>
      </div>
      <Tree
        onSelect={onSelect}
        treeData={treeData}
        defaultExpandAll
      />
      <Modal
        title={isEditing ? 'Edit Menu' : 'Add Menu'}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: '请输入菜单标题!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="path" label="Path" rules={[{ required: true, message: '请输入路径!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

