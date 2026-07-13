import { useEffect, useMemo, useState } from "react";

import {
  getAllReservations,
  updateReservationStatus,
} from "../../services/adminService";

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await getAllReservations();

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

  const filteredReservations = useMemo(() => {

    if (!selectedDate) return reservations;

    return reservations.filter((reservation) => {

      const reservationDate = new Date(
        reservation.reservationDate
      )
        .toISOString()
        .split("T")[0];

      return reservationDate === selectedDate;

    });

  }, [reservations, selectedDate]);

  const totalReservations = filteredReservations.length;

  const confirmedReservations =
    filteredReservations.filter(
      (reservation) =>
        reservation.status === "confirmed"
    ).length;

  const completedReservations =
    filteredReservations.filter(
      (reservation) =>
        reservation.status === "completed"
    ).length;

  const cancelledReservations =
    filteredReservations.filter(
      (reservation) =>
        reservation.status === "cancelled"
    ).length;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatTime = (time) => {

    const [hours, minutes] =
      time.split(":");

    const date = new Date();

    date.setHours(hours, minutes);

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );

  };

  const handleStatusUpdate = async (
    reservationId,
    status
  ) => {

    const confirmed = window.confirm(
      `Are you sure you want to mark this reservation as ${status}?`
    );

    if (!confirmed) return;

    try {

      await updateReservationStatus(
        reservationId,
        status
      );

      alert("Reservation updated successfully.");

      fetchReservations();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to update reservation."
      );

    }

  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl font-semibold">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <section className="space-y-8">

      {/* Heading */}

      <div className="max-w-full">

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 break-words">
          Restaurant Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all restaurant reservations efficiently.
        </p>

      </div>

      {error && (

        <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4">

          {error}

        </div>

      )}

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-slate-500">
            Total Reservations
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {totalReservations}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-slate-500">
            Confirmed
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {confirmedReservations}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-slate-500">
            Completed
          </h3>

          <p className="text-4xl font-bold text-blue-700 mt-3">
            {completedReservations}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-slate-500">
            Cancelled
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {cancelledReservations}
          </p>

        </div>

      </div>

      {/* Date Filter */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h2 className="text-xl font-semibold">
              📅 Filter Reservations
            </h2>

            <button
              onClick={() => setSelectedDate("")}
              className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-lg transition"
            >
              Clear Filter
            </button>

            <p className="text-slate-500">
              View reservations by date.
            </p>

          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            className="border border-slate-300 rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* =======================================================
          PART 2 STARTS FROM HERE
          Reservation Table
      ======================================================= */}

      {/* ===========================
    Mobile Reservation Cards
=========================== */}

      <div className="md:hidden space-y-5">

        {filteredReservations.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-8 text-center">

            <h2 className="text-xl font-semibold text-slate-700">
              No Reservations Found
            </h2>

            <p className="text-slate-500 mt-2">
              No reservations match the selected date.
            </p>

          </div>

        ) : (

          filteredReservations.map((reservation) => (

            <div
              key={reservation.id}
              className="bg-white rounded-2xl shadow-md p-5 space-y-4"
            >

              <div>

                <h2 className="text-lg font-bold text-slate-800">
                  {reservation.customerName}
                </h2>

                <p className="text-slate-500">
                  {reservation.phone}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <div>

                  <p className="text-slate-500">
                    Table
                  </p>

                  <p className="font-semibold">
                    {reservation.tableNumber}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500">
                    Guests
                  </p>

                  <p className="font-semibold">
                    {reservation.guests}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500">
                    Date
                  </p>

                  <p className="font-semibold">
                    {formatDate(reservation.reservationDate)}
                  </p>

                </div>

                <div>

                  <p className="text-slate-500">
                    Time
                  </p>

                  <p className="font-semibold">
                    {formatTime(reservation.reservationTime)}
                  </p>

                </div>

              </div>

              <div>

                <span
                  className={`px-3 py-2 rounded-full text-sm font-semibold

            ${reservation.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : reservation.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >

                  {reservation.status.toUpperCase()}

                </span>

              </div>

              <div className="flex flex-col gap-3">

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      reservation.id,
                      "completed"
                    )
                  }
                  disabled={reservation.status !== "confirmed"}
                  className={`w-full rounded-lg py-3 text-white transition

            ${reservation.status === "confirmed"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                    }`}
                >

                  Complete

                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      reservation.id,
                      "cancelled"
                    )
                  }
                  disabled={reservation.status !== "confirmed"}
                  className={`w-full rounded-lg py-3 text-white transition

            ${reservation.status === "confirmed"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-400 cursor-not-allowed"
                    }`}
                >

                  Cancel

                </button>

              </div>

            </div>

          ))

        )}

      </div>

      <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Customer</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Phone</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Table</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Guests</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Date</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Time</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">Status</th>

                <th className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredReservations.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-12 text-slate-500"
                  >

                    <div className="py-12 text-center">

                      <h2 className="text-2xl font-semibold text-slate-700">
                        No Reservations Found
                      </h2>

                      <p className="text-slate-500 mt-2">
                        No reservations match the selected date.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredReservations.map(
                  (reservation) => (

                    <tr
                      key={reservation.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        {reservation.customerName}

                      </td>

                      <td className="px-6 py-4">

                        {reservation.phone}

                      </td>

                      <td className="px-6 py-4 font-semibold">

                        {reservation.tableNumber}

                      </td>

                      <td className="px-6 py-4">

                        {reservation.guests}

                      </td>

                      <td className="px-6 py-4">

                        {formatDate(
                          reservation.reservationDate
                        )}

                      </td>

                      <td className="px-6 py-4">

                        {formatTime(
                          reservation.reservationTime
                        )}

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-2 rounded-full text-sm font-semibold

                          ${reservation.status ===
                              "confirmed"

                              ? "bg-green-100 text-green-700"

                              : reservation.status ===
                                "completed"

                                ? "bg-blue-100 text-blue-700"

                                : "bg-red-100 text-red-700"
                            }`}
                        >

                          {reservation.status.toUpperCase()}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex flex-col gap-2">

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                reservation.id,
                                "completed"
                              )
                            }

                            disabled={
                              reservation.status !==
                              "confirmed"
                            }

                            className={`rounded-lg py-2 px-4 text-white transition

                            ${reservation.status ===
                                "confirmed"

                                ? "bg-blue-600 hover:bg-blue-700"

                                : "bg-gray-400 cursor-not-allowed"
                              }`}
                          >

                            Complete

                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                reservation.id,
                                "cancelled"
                              )
                            }

                            disabled={
                              reservation.status !==
                              "confirmed"
                            }

                            className={`rounded-lg py-2 px-4 text-white transition

                            ${reservation.status ===
                                "confirmed"

                                ? "bg-red-500 hover:bg-red-600"

                                : "bg-gray-400 cursor-not-allowed"
                              }`}
                          >

                            Cancel

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}

export default AdminDashboard;