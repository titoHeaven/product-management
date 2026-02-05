// src/components/Navbar.tsx
// import { useNavigate } from "@tanstack/react-router";

export function Navbar() {
  //   const navigate = useNavigate();

  return (
    <header className="w-full h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-6">
      {/* Left: page title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Right: future actions */}
      <div className="flex items-center space-x-4">
        {/* Search placeholder */}
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Notifications */}
        <button className="relative text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          🔔
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile menu */}
        {/* <div className="relative">
          <button
            onClick={() => navigate("/profile")}
            className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-white font-bold"
          >
            H
          </button>
        </div> */}
      </div>
    </header>
  );
}
