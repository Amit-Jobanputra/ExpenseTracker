// src/pages/Dashboard.jsx
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import jscookie from 'js-cookie';
function DashboardComponent() {
const [expenses, setExpenses] = useState([]);
const [totals, setTotals] = useState({ total: 0, currentMonth: 0, previousMonth: 0 });
const token = jscookie.get('token');
useEffect(() => {  
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const data = response.data;
      setExpenses(data);

      // Calculate totals
      const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
      const now = new Date();
      const currentMonth = data
        .filter((item) => new Date(item.date).getMonth() === now.getMonth() && new Date(item.date).getFullYear() === now.getFullYear())
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const previousMonth = data
        .filter((item) => {
          const date = new Date(item.date);
          return (
            date.getMonth() === now.getMonth() - 1 &&
            date.getFullYear() === now.getFullYear()
          );
        })
        .reduce((sum, item) => sum + Number(item.amount), 0);

      setTotals({ total, currentMonth, previousMonth });
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    }
  };
    return (
     <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-600 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
          <nav className="space-y-4">
            <a href="#" className="block hover:text-cyan-200">Dashboard</a>
            <a href="#" className="block hover:text-cyan-200">Add Expense</a>
            <a href="#" className="block hover:text-cyan-200">List of Expenses</a>
            <a href="#" className="block hover:text-cyan-200">Logout</a>
          </nav>
        </div>
        <div>
          <a href="#" className="block hover:text-cyan-200">Settings</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Expense</h2>
            <p className="text-2xl text-teal-600 font-bold">₹{totals.total}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Current Month</h2>
            <p className="text-2xl text-teal-600 font-bold">₹{totals.currentMonth}</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Previous Month</h2>
            <p className="text-2xl text-teal-600 font-bold">₹{totals.previousMonth}</p>
          </div>
        </div>

        {/* Last 10 Expenses */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Last 10 Expenses</h2>
          <ul className="space-y-2">
            {expenses.slice(0, 10).map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.description}</span>
                <span className="text-teal-600 font-semibold">₹{item.amount}</span>
              </li>
            ))}
            {expenses.length === 0 && <p className="text-gray-500">No expenses found.</p>}
          </ul>
        </div>
      </main>
    </div>

  );
}

export default DashboardComponent;
