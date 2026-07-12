import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { removeToken } from "../utils/localStorage";
import { useAuth } from "../context/AuthContext";

function AdminSidebar() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    logout();
    navigate("/login");
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}

      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-40 px-4 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-slate-800">
          Admin Panel
        </h1>

        <button
          onClick={() => setIsOpen(true)}
          className="text-slate-800"
        >
          <span className="text-3xl">☰</span>
        </button>

      </div>

      {/* Overlay */}

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed
        top-0 left-0
        h-screen
        w-64
        bg-slate-900
        text-white
        flex
        flex-col
        z-50
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:left-0
      `}
      >
        {/* Mobile Close Button */}

        <div className="md:hidden flex justify-end p-4">

          <button onClick={closeSidebar}>
            <span className="text-3xl">✕</span>
          </button>

        </div>

        {/* Logo */}

        <div className="px-6 pb-6 border-b border-slate-700">

          <h1 className="text-2xl font-bold">
            Restaurant Admin
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            {user?.name}
          </p>

        </div>

        {/* Navigation */}

        <nav className="flex-1 p-6 space-y-3">

          <NavLink
            to="/admin"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>

        </nav>

        {/* Logout */}

        <div className="mt-auto p-6 border-t border-slate-700 bg-slate-900">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition"
          >
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;