import axios from 'axios';

export const fetchProducts = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get('http://localhost:3001/products', {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/product?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/product?id=${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post('http://localhost:3001/product', product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/product?id=${id}`,
      product
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
