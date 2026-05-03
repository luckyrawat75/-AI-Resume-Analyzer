import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Resume", path: "/upload" },
    { name: "Job Matcher", path: "/job-matcher" },
  ];

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 h-screen bg-gray-900 text-white
          p-5 flex flex-col shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
      
        <div className="text-2xl font-bold mb-8 text-purple-400">
          ResumeAI
        </div>

      
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-purple-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto text-sm text-gray-400">
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;