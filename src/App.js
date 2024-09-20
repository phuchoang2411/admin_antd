import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProductTable from './components/ProductTable';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/products" element={<ProductTable />} />
          <Route path="/product" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
