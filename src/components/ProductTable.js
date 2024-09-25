import React, { useEffect, useState } from 'react';
import { Spin, Alert, Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { deleteProductById, fetchProducts } from '../api';
import { Link, useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await fetchProducts();
        setData(products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProductById(id); // Assuming deleteProduct is an API function
      setData(data.filter((item) => item._id !== id));
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return (
      <Alert message="Error" description="Failed to fetch data." type="error" />
    );
  }

  const columns = [
    {
      title: 'Tên sách',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/product?id=${record._id}`}>{text}</Link>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit-product/${record._id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/add-product">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>
      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ProductTable;
