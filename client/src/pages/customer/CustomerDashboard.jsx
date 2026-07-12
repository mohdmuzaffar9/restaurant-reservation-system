import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <section className="space-y-8">

      {/* Welcome Section */}

      <div className="bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, {user?.name || "Customer"} 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your restaurant reservations quickly and easily.
        </p>

      </div>

      {/* Action Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Book Table */}

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

          <div className="text-5xl mb-4">
            🍽️
          </div>

          <h2 className="text-2xl font-semibold text-slate-800">
            Book a Table
          </h2>

          <p className="text-slate-500 mt-2">
            Reserve your favorite table in just a few clicks.
          </p>

          <Link
            to="/book-table"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Book Now
          </Link>

        </div>

        {/* My Reservations */}

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

          <div className="text-5xl mb-4">
            📅
          </div>

          <h2 className="text-2xl font-semibold text-slate-800">
            My Reservations
          </h2>

          <p className="text-slate-500 mt-2">
            View, manage or cancel your existing reservations.
          </p>

          <Link
            to="/my-reservations"
            className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            View Reservations
          </Link>

        </div>

      </div>

      {/* Quick Stats */}

      <div>

        <h2 className="text-2xl font-bold text-slate-800 mb-5">
          Quick Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <h3 className="text-slate-500">
              Total Reservations
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              --
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <h3 className="text-slate-500">
              Active Reservations
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-3">
              --
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CustomerDashboard;