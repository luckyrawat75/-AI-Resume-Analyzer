import React from "react";

const Navbar = ({ user, onLogout, toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow-md">

   
      <div className="flex items-center gap-3">

       
        <button
          onClick={toggleSidebar}
          className="md:hidden text-xl"
        >
          ☰
        </button>

        <div className="text-lg md:text-xl font-semibold">
          HireTrack
        </div>
      </div>

     
      <div className="flex items-center gap-3 md:gap-4">

        <span className="hidden sm:block text-sm text-gray-300">
          {user?.name || "User"}
        </span>

        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-2 md:px-3 py-1 rounded-md text-xs md:text-sm"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;