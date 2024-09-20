import React, { useEffect, useState } from 'react';
import { Spin, Alert, Table, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchProducts /* deleteProduct */ } from '../api';
import { Link } from 'react-router-dom';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      //await deleteProduct(id); // Assuming deleteProduct is an API function
      //setData(data.filter((item) => item._id !== id));
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
      key: 'delete',
      render: (text, record) => (
        <Popconfirm
          title="Xác nhận xóa sản phẩm này?"
          onConfirm={() => handleDelete(record._id)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Button type="link" danger icon={<DeleteOutlined />}></Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default ProductTable;
