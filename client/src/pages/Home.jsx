import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-slate-800">
            Restaurant <span className="text-blue-600">Reservation</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
            Reserve your favorite table in just a few clicks.
            Enjoy fast, secure and hassle-free restaurant booking with
            smart table allocation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/book-table"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition"
            >
              Book Table
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition"
            >
              Login
            </Link>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-slate-800">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

            {/* Card */}

            <div className="bg-slate-50 rounded-xl shadow-md p-8 text-center">

              <div className="text-5xl">🍽️</div>

              <h3 className="text-xl font-semibold mt-5">
                Smart Table Assignment
              </h3>

              <p className="text-slate-600 mt-3">
                Automatically assigns the best available table
                based on guest count.
              </p>

            </div>

            {/* Card */}

            <div className="bg-slate-50 rounded-xl shadow-md p-8 text-center">

              <div className="text-5xl">📅</div>

              <h3 className="text-xl font-semibold mt-5">
                Easy Reservation
              </h3>

              <p className="text-slate-600 mt-3">
                Book your table within seconds using our
                quick reservation process.
              </p>

            </div>

            {/* Card */}

            <div className="bg-slate-50 rounded-xl shadow-md p-8 text-center">

              <div className="text-5xl">👨‍💼</div>

              <h3 className="text-xl font-semibold mt-5">
                Admin Dashboard
              </h3>

              <p className="text-slate-600 mt-3">
                Restaurant staff can efficiently manage
                reservations with ease.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h3 className="text-xl font-semibold">
            Restaurant Reservation System
          </h3>

          <p className="text-slate-400 mt-3">
            Built with React, Node.js and MongoDB
          </p>

          <p className="mt-6 text-sm text-slate-500">
            © 2026 Restaurant Reservation System. All Rights Reserved.
          </p>

        </div>

      </footer>
    </>
  );
}

export default Home;