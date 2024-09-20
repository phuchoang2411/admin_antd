import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const ProductTable = ({ data }) => {
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

  console.log('Daata', data);

  return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default ProductTable;
