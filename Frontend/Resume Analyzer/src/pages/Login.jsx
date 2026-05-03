import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);
      toast.success("Login successful!");

      // redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed");
    }
  };

  return (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
  
  <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
    
    <h2 className="text-3xl font-bold text-white text-center mb-6">
      Welcome 
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition transform py-3 rounded-lg text-white font-semibold shadow-lg"
      >
        Login
      </button>
    </form>

    <p className="text-gray-300 text-sm text-center mt-4">
      Don’t have an account?{" "}
      <Link to="/register" className="text-purple-400 hover:underline">
        Register
      </Link>
    </p>
  </div>
</div>
  );
};

export default Login;