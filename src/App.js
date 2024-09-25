import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import ProductTable from './components/ProductTable';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import './App.css';

const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible style={{ background: '#fff' }}>
          <div className="logo" />
          <Menu theme="light" mode="inline">
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              <Link to="/products">Products</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px', paddingTop: 0 }}>
            <Routes>
              <Route path="/products" element={<ProductTable />} />
              <Route path="/product" element={<ProductDetail />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
