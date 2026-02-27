// src/components/shared/Sidebar.tsx
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Package, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const router = useRouter();

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

  const handleLogout = () => {
    logout();
    router.invalidate().then(() => {
      navigate({ to: "/login" });
    });
  };

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
          Product Hub
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

      {/* User Info & Logout - Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* User Info */}
        {!isCollapsed && (
          <div className="mb-3 px-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        )}

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className={`w-full flex items-center gap-3 ${
            isCollapsed ? "justify-center px-2" : "justify-start px-4"
          } py-3 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span
            className={`${
              isCollapsed ? "hidden" : "block"
            } transition-all duration-300`}
          >
            Logout
          </span>
        </Button>
      </div>
    </aside>
  );
}
