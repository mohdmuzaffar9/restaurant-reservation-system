import { useEffect, useState } from "react";
import { getMyReservations, cancelReservation, } from "../../services/reservationService";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);

      const response = await getMyReservations();

      setReservations(response.reservations);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to load reservations."
      );

    } finally {

      setLoading(false);

    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-xl font-semibold">
        Loading reservations...
      </h2>
    );
  }

  const handleCancelReservation = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmCancel) return;

    try {

      await cancelReservation(id);

      await fetchReservations();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to cancel reservation."
      );

    }

  };

  return (
    <section className="max-w-5xl mx-auto px-2 sm:px-0">

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">
        My Reservations 📅
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {!loading && reservations.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <h2 className="text-2xl font-semibold text-slate-700">
            No Reservations Found
          </h2>

          <p className="text-slate-500 mt-3">
            Book your first table to see reservations here.
          </p>

        </div>
      )}

      <div className="grid gap-6">

        {reservations.map((reservation) => (

          <div
            key={reservation.id}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
          >

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

              <div className="space-y-2">

                <p>
                  <span className="font-semibold">
                    📅 Date:
                  </span>{" "}
                  {formatDate(reservation.reservationDate)}
                </p>

                <p>
                  <span className="font-semibold">
                    🕒 Time:
                  </span>{" "}
                  {formatTime(reservation.reservationTime)}
                </p>

                <p>
                  <span className="font-semibold">
                    👥 Guests:
                  </span>{" "}
                  {reservation.guests}
                </p>

                <p>
                  <span className="font-semibold">
                    🍽️ Table:
                  </span>{" "}
                  {reservation.tableNumber}
                </p>

                {reservation.specialRequest && (
                  <p>
                    <span className="font-semibold">
                      💬 Request:
                    </span>{" "}
                    {reservation.specialRequest}
                  </p>
                )}

              </div>

              <div className="flex flex-col w-full md:w-auto items-stretch md:items-end gap-4">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    reservation.status
                  )}`}
                >
                  {reservation.status.toUpperCase()}
                </span>

                <button
                  onClick={() => handleCancelReservation(reservation.id)}
                  disabled={
                    reservation.status === "cancelled" ||
                    reservation.status === "completed"
                  }
                  className={`w-full md:w-auto px-5 py-2 rounded-lg text-white transition ${reservation.status === "cancelled" ||
                    reservation.status === "completed"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  Cancel Reservation
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default MyReservations;