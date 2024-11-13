import axios from 'axios';

const API_URL = 'http://localhost:4000/products';

export const getProducts = () => axios.get(API_URL);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, updatedProduct) => axios.put(`${API_URL}/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
