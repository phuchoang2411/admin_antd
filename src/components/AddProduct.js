import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { addProduct } from '../api';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addProduct(values);
      message.success('Product added successfully');
    } catch (error) {
      message.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: 'Please input the author!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
