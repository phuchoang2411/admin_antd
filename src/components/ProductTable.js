import React, { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import { fetchProducts } from '../api';
import { Table } from 'antd';
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
    // Add more columns as needed
  ];

  return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default ProductTable;
