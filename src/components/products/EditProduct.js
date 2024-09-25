import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { fetchProductById, updateProduct } from '../../apis/products';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        message.error('Failed to fetch product');
      }
    };

    getProduct();
  }, [id]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateProduct(id, values);
      message.success('Product updated successfully');
      navigate('/products');
    } catch (error) {
      message.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <Spin tip="Loading..." />;
  }

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={product}>
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
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
