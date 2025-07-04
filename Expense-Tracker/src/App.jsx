import { useEffect, useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import jscookie from "js-cookie";

import "./App.css";

function App() {
  const [checkUser, checkUserExist] = useState();

  useEffect(() => {
    // Check if token exists in cookies
    if (jscookie.get("token")) {
      checkUserExist(true);
    } else {
      checkUserExist(false);
    }
  }, [checkUserExist]);

  const handleLogout = () => {
    jscookie.remove("token"); // remove token from cookies
    window.location.reload();
    checkUserExist(false); // update state
  };

  return (
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">
            💸 Expense Tracker
          </h1>

          <div className="flex gap-6">
            {!checkUser ? (
              <>
                <Link
                  to="/"
                  className="hover:underline text-shadow-fuchsia-100 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:underline text-shadow-fuchsia-100 transition duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hover:underline text-shadow-fuchsia-100 transition duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline text-shadow-fuchsia-100 transition duration-200"
                >
                  Logout
                </button>
              </>
            )}
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
