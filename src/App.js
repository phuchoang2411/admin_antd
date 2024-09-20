import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { fetchProducts } from './api';
import ProductTable from './ProductTable';
import ProductDetail from './ProductDetail';

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/products" element={<ProductTable data={data} />} />
          <Route path="/product" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
