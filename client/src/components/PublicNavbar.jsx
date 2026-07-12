import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Restaurant Reservation
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-slate-700 hover:text-blue-600 transition"
          >
            Register
          </Link>

          <Link
            to="/book-table"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Book Table
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;