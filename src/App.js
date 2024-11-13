// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductManager from './components/ProductManager';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products initially
  useEffect(() => {
    loadProducts();
  }, []);

  // Function to load products from the API
  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  // Function to add a new product
  const handleAddProduct = async (productData) => {
    try {
      await createProduct(productData);
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Function to update an existing product
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      await updateProduct(productId, updatedData);
      setEditingProduct(null); // Reset editing state
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductManager />} /> {/* Link to ProductManager */}
        <Route
          path="/products"
          element={
            <ProductList
              products={products}
              onEditProduct={setEditingProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route
          path="/products/new"
          element={<ProductForm onSubmit={handleAddProduct} />}
        />
        <Route
          path="/products/edit"
          element={
            editingProduct ? (
              <ProductForm
                product={editingProduct}
                onSubmit={(updatedData) =>
                  handleUpdateProduct(editingProduct._id, updatedData)
                }
              />
            ) : (
              <Navigate to="/products" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
