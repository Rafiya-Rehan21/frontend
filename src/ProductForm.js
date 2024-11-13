import React, { useState, useEffect } from 'react';

function ProductForm({ currentProduct, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setPrice(currentProduct.price);
    } else {
      setName('');
      setPrice('');
    }
  }, [currentProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, price: parseFloat(price) };
    onSave(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">{currentProduct ? 'Update' : 'Add'} Product</button>
    </form>
  );
}

export default ProductForm;
