import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({ name: '', description: '', price: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productData);
      } else {
        await createProduct(productData);
      }
      loadProducts();
      setProductData({ name: '', description: '', price: '' });
      setEditingProductId(null);
    } catch (error) {
      console.error('Error creating/updating product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setProductData({ name: product.name, description: product.description, price: product.price });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleEdit(product)}>Edit</button>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}

      <h2>{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingProductId ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default ProductList;
