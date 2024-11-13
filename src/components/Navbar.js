// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>Product Management App</h1>
      <ul>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/products">Product List</Link></li> {/* Link to Product List page */}
      </ul>
    </nav>
  );
}

export default Navbar;
