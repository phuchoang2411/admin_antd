import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spin, Alert, Descriptions } from 'antd';
import { fetchProductById } from '../api';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductDetail = () => {
  const query = useQuery();
  const id = query.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await fetchProductById(id);
        setProduct(product);
        console.log('Product', product);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return (
      <Alert message="Error" description="Failed to fetch data." type="error" />
    );
  }

  if (!product) {
    return (
      <Alert message="Error" description="Product not found." type="error" />
    );
  }

  return (
    <Descriptions title="Thông tin chi tiết">
      <Descriptions.Item label="Tên sách">{product.title}</Descriptions.Item>
      <Descriptions.Item label="Tác giả">{product.author}</Descriptions.Item>
      {/* <Descriptions.Item label="Description">
        {product.description}
      </Descriptions.Item> */}
      {/* Add more fields as needed */}
    </Descriptions>
  );
};

export default ProductDetail;
