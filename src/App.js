import React, { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import { fetchProducts } from './api';
import ProductTable from './ProductTable';

function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product List</h1>
      </header>
      <ProductTable data={data} />
    </div>
  );
}

export default App;
