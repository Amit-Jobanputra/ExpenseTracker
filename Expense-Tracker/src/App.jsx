import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">
            💸 Expense Tracker
          </h1>
          <div className="flex gap-6">
            <Link
              to="/"
              className="hover:underline text-yellow-300 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:underline text-yellow-300 transition duration-200"
            >
              Register
            </Link>
            <Link
              to="/dashboard"
              className="hover:underline text-yellow-300 transition duration-200"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
