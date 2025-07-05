import React, { useEffect, useState } from "react";

import axios from "axios";
import jscookie from "js-cookie";

import { useNavigate } from "react-router-dom";

function Login() {
  const [loginItems, setLoginItems] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (jscookie.get("token")) {
      console.log(true);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginItems({ ...loginItems, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const checkLoginUser = axios.post(
      "http://localhost:8000/api/login",
      loginItems
    );
    checkLoginUser
      .then((response) => {
        // console.log(response);
        const token = response.data.token;
        // console.log("Token:", token);
        jscookie.set("token", token);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setLoading(false);
      });
  };

  const loginItem = [
    {
      name: "email",
      type: "email",
      required: "required",
      placeholder: "johndoe@gmail.com",
    },
    {
      name: "password",
      type: "password",
      required: "required",
      placeholder: "********",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-white to-teal-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-teal-200 p-8">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Login
        </h2>

        {message.length != 0 ? (
          <div className="bg-red-100 text-red-800 text-sm p-2 rounded mb-4 border border-green-300">
            {message}
          </div>
        ) : (
          ""
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          {loginItem.map((item, i) => (
            <div key={i}>
              <label
                htmlFor={item.name}
                className="block text-gray-700 font-medium mb-1"
              >
                {item.name}
              </label>
              <input
                type={item.type}
                id={item.name}
                name={item.name}
                value={loginItems[item.name]}
                required={item.required}
                placeholder={item.placeholder}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-md shadow-md hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 ease-in-out"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-cyan-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
