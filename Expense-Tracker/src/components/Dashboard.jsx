// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch all expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/expenses', { withCredentials: true });
      setExpenses(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch expenses.');
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const data = { amount, category, description };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/expenses/${editingId}`, data, { withCredentials: true });
        setEditingId(null);
      } else {
        console.log('Adding new expense:', data);
        await axios.post('http://localhost:8000/api/expenses', data, { withCredentials: true });
      }

      setAmount('');
      setCategory('');
      setDescription('');
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setError('Failed to save expense.');
    }
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setCategory(expense.category);
    setDescription(expense.description);
    setEditingId(expense.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/expenses/${id}`, { withCredentials: true });
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setError('Failed to delete expense.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Dashboard - Manage Expenses</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleAddOrUpdate} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-teal-500">Your Expenses</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-600">No expenses added yet.</p>
      ) : (
        <table className="w-full border table-auto">
          <thead>
            <tr className="bg-teal-100">
              <th className="border p-2">Amount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="text-center">
                <td className="border p-2">{exp.amount}</td>
                <td className="border p-2">{exp.category}</td>
                <td className="border p-2">{exp.description}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
