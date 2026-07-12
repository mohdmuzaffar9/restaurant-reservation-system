import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { removeToken } from "../utils/localStorage";
import { useAuth } from "../context/AuthContext";

function CustomerNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}

          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
            Restaurant Reservation
          </h1>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/book-table"
              className="hover:text-blue-600"
            >
              Book Table
            </Link>

            <Link
              to="/my-reservations"
              className="hover:text-blue-600"
            >
              My Reservations
            </Link>

            <span className="text-slate-600">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div className="md:hidden mt-5 flex flex-col gap-4 border-t pt-4">

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/book-table"
              onClick={() => setMenuOpen(false)}
            >
              Book Table
            </Link>

            <Link
              to="/my-reservations"
              onClick={() => setMenuOpen(false)}
            >
              My Reservations
            </Link>

            <span className="text-slate-600">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}

export default CustomerNavbar;