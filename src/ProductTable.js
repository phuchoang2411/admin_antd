import React from 'react';
import { Table } from 'antd';

const ProductTable = ({ data }) => {
  const columns = [
    {
      title: 'Tên sách',
      dataIndex: 'title',
      key: 'title',
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
