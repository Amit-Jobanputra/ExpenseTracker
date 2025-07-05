import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-200"> 💸 Expense Tracker</h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-cyan-300 transition duration-200">Login</Link>
          <Link to="/register" className="hover:text-cyan-300 transition duration-200">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
