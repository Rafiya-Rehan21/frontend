// src/components/ProductManager.js
import React, { useState, useEffect } from 'react';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', description: '', price: '' });

  // Fetch products from the server
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle form submit for adding or editing a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await fetch(`http://localhost:4000/products/${currentProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });
      setIsEditing(false);
    } else {
      await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });
    }
    setCurrentProduct({ name: '', description: '', price: '' });
    fetchProducts();
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Set product to be edited
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  return (
    <div className="product-manager">
      <h2>Product List</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="actions">
              <button onClick={() => handleEdit(product)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={currentProduct.name}
          onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Product Description"
          value={currentProduct.description}
          onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={currentProduct.price}
          onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
          required
        />
        <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );
}

export default ProductManager;
