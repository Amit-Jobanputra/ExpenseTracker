import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <div className="flex gap-6">
          <a href="/" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
          <a href="/dashboard" className="hover:underline">Dashboard</a>
        </div>
        </div>
      </nav>

      <Routes>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
