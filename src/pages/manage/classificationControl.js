import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isAuthorize } from '../../utils/authorize';

export function ClassificationControl() {
  const [classifications, setClassifications] = useState(JSON.parse(localStorage.getItem("classifications")) || []);
  const [filteredClassifications, setFilteredClassifications] = useState(classifications);
  const [addClassificationVisible, setAddClassificationVisible] = useState(false);
  const [editingClassification, setEditingClassification] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorize('分类列表')) {
      navigate('/manage/dashboard');
    }
  }, [navigate]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = classifications.filter(classification => classification.name.toLowerCase().includes(value));
    setFilteredClassifications(filtered);
  };

  const addClassification = () => {
    setEditingClassification(null);
    setAddClassificationVisible(true);
    form.resetFields();
  };

  const editClassification = (classification) => {
    setEditingClassification(classification);
    setAddClassificationVisible(true);
    form.setFieldsValue(classification);
  };

  const deleteClassification = (name) => {
    const updatedClassifications = classifications.filter(classification => classification.name !== name);
    setClassifications(updatedClassifications);
    setFilteredClassifications(updatedClassifications);
    localStorage.setItem("classifications", JSON.stringify(updatedClassifications));

    // Update products to remove deleted classification
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map(product => ({
      ...product,
      classification: product.classification === name ? '' : product.classification
    }));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const duplicate = classifications.some(classification => classification.name === values.name);
      if (duplicate && (!editingClassification || editingClassification.name !== values.name)) {
        message.error('分类名称不能重复', 3);
        return;
      }

      let updatedClassifications;
      let oldName = '';

      if (editingClassification) {
        oldName = editingClassification.name;
        updatedClassifications = classifications.map(classification => classification.name === oldName ? values : classification);
      } else {
        updatedClassifications = [...classifications, values];
      }

      setClassifications(updatedClassifications);
      setFilteredClassifications(updatedClassifications);
      localStorage.setItem("classifications", JSON.stringify(updatedClassifications));

      // Update products with new classification name
      if (oldName) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = products.map(product => ({
          ...product,
          classification: product.classification === oldName ? values.name : product.classification
        }));
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }

      setAddClassificationVisible(false);
    }).catch(info => {
      message.error('请填写完整信息', 3);
    });
  };

  const handleCancel = () => {
    setAddClassificationVisible(false);
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editClassification(record)}>修改</Button>
          <Button onClick={() => deleteClassification(record.name)} style={{ marginLeft: 8 }} danger>删除</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据分类名搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        <Button type="primary" onClick={addClassification}>添加分类</Button>
      </div>
      <Table dataSource={filteredClassifications} columns={columns} rowKey="name" pagination={{ pageSize: 7 }} />
      <Modal title={editingClassification ? '编辑分类' : '添加分类'} open={addClassificationVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="classificationForm">
          <Form.Item name="name" label="分类名称" rules={[{ required: true, message: '请输入分类名称!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
