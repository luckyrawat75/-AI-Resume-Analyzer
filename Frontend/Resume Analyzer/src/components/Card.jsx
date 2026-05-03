import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-gray-900 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300">
      
      
      <h2 className="text-lg font-semibold mb-3 text-purple-400">
        {title}
      </h2>

     
      <div className="text-sm text-gray-300">
        {children}
      </div>
      
    </div>
  );
};

export default Card;