import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      const res = await registerUser(formData);
      toast.success("Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Register failed");
    }
  };

  return (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
  
  <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
    
    <h2 className="text-3xl font-bold text-white text-center mb-6">
      Create Account 
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
     
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
      />

      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
      />

      
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
      />

      
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition transform py-3 rounded-lg text-white font-semibold shadow-lg"
      >
        Register
      </button>
    </form>

    
    <p className="text-gray-300 text-sm text-center mt-4">
      Already have an account?{" "}
      <span
        onClick={() => (window.location.href = "/login")}
        className="text-purple-400 cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>
  </div>
</div>
  );
};

export default Register;