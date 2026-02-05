// src/components/shared/Sidebar.tsx
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Package, ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      to: "/layout/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      to: "/layout/products",
      icon: Package,
      label: "Products",
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div
          className={`text-2xl font-bold text-indigo-600 dark:text-indigo-400 ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          MyApp
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group"
              activeProps={{
                className:
                  "bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium",
              }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={`${
                  isCollapsed ? "hidden" : "block"
                } transition-all duration-300`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
