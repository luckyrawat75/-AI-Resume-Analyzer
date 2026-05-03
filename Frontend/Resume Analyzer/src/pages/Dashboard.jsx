import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Siderbar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    if (stored) setData(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully 👋");
    navigate("/login", { replace: true });
  };

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 md:ml-64">

        <Navbar
          user={{ name: "Aryan" }}
          onLogout={handleLogout}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />

        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

          <Card title="Resume Score">
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              {data?.score || 0}%
            </p>
          </Card>

          <Card title="Skills">
            <ul className="list-disc ml-5">
              {safeArray(data?.skills?.technical).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Card>

          <Card title="Missing Skills">
            <ul className="list-disc ml-5 text-red-400">
              {safeArray(data?.missingSkills).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Card>

          <Card title="Suggestions">
            <ul className="list-disc ml-5 text-purple-400">
              {safeArray(data?.suggestions).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;