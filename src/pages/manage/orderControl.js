import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isAuthorize } from '../../utils/authorize';

export function OrderControl() {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [addOrderVisible, setAddOrderVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const currentUser = localStorage.getItem('username');
  const userPrivilege = localStorage.getItem('privilege');

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => editOrder(record)}>Edit</Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (!isAuthorize('订单列表')) {
      navigate('/manage/dashboard');
      return;
    }
    const filtered = userPrivilege === '管理员' ? orders : orders.filter(order => order.sellerId === currentUser);
    setFilteredOrders(filtered);
  }, [currentUser, orders, navigate, userPrivilege]);

  // const addOrder = () => {
  //   setEditingOrder(null);
  //   setAddOrderVisible(true);
  //   form.resetFields();
  // };

  const editOrder = (order) => {
    setEditingOrder(order);
    setAddOrderVisible(true);
    form.setFieldsValue(order);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      let updatedOrders;
      if (values.sellerId === undefined) {
        values.sellerId = currentUser;
      }
      updatedOrders = orders.map(order => order.id === editingOrder.id ? values : order);
      setOrders(updatedOrders);
      setFilteredOrders(userPrivilege === '管理员' ? updatedOrders : updatedOrders.filter(order => order.sellerId === currentUser));
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setAddOrderVisible(false);
    }).catch(info => {
      message.error('Validation failed');
    });
  };

  const handleCancel = () => {
    setAddOrderVisible(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = orders.filter(order => order.productName.toLowerCase().includes(searchValue));
    setFilteredOrders(userPrivilege === '管理员' ? filteredData : filteredData.filter(order => order.sellerId === currentUser));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="根据商品名搜索"
          onChange={handleSearch}
          style={{ width: '25%' }}
        />
        {/* <Button type="primary" onClick={addOrder}>Add Order</Button> */}
      </div>
      <Table dataSource={filteredOrders} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
      <Modal title="修改订单" open={addOrderVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="orderForm">
          <Form.Item name="userId" label="User ID" rules={[{ required: true, message: '请输入用户ID' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="productId" label="Product ID" rules={[{ required: true, message: '请输入产品ID' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true, message: '请输入产品名称' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: '请输入地址' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true, message: '请输入时间' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: '请输入数量' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: '请输入价格' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: '请输入状态' }]}>
            <Select>
              <Select.Option value="付款">付款</Select.Option>
              <Select.Option value="发货">发货</Select.Option>
              <Select.Option value="收货">收货</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
