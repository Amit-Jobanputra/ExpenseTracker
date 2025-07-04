import { useState } from "react";

import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post("http://localhost:8000/api/register", formData)
      .then((response) => {
        console.log(response);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setLoading(false);
        setMessage("successfully registered!");
      })
      .catch((error) => {
        console.log(error);
        const validationErrors = error.response.data.errors;
        const firstError = Object.values(validationErrors)[0][0]; // Show first error
        setMessage(firstError);
        setLoading(false);
      });
  };

  const registerFormData = [
    { name: "name", type: "text", placeholder: "John Doe" },
    { name: "email", type: "email", placeholder: "JohnDoe@gmail.com" },
    { name: "password", type: "password", placeholder: "••••••••" },
  ];
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 ">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">
            Register
          </h2>

          {/* SET MESSAGE */}
          {message.length != 0 ? (
            <div className="bg-green-100 text-green-400-700 text-sm p-2 rounded mb-4 border border-green-300">
              {message}
            </div>
          ) : (
            ""
          )}

          {/* REGISTER FORM */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {registerFormData.map((item, i) => (
              <div key={i}>
                <label
                  htmlFor={item.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {item.name}
                </label>
                <input
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  value={formData[item.name]}
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
              {Loading ? "Loading..." : "Submit"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a href="/" className="text-cyan-600 hover:underline font-medium">
              login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;
