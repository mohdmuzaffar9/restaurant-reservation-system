import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createReservation } from "../../services/reservationService";
function BookTable() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reservationDate: "",
        reservationTime: "",
        guests: 2,
        specialRequest: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === "guests"
                    ? Number(value)
                    : value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            setSuccess("");

            const response = await createReservation(formData);

            setSuccess(response.message);

            setTimeout(() => {
                navigate("/my-reservations");
            }, 1500);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create reservation."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <section className="max-w-3xl mx-auto">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Book Your Table 🍽️
                </h1>

                <p className="text-slate-500 mt-2">
                    Reserve your favorite table in just a few clicks.
                </p>

            </div>

            {/* Form Card */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-xl">
                            {success}
                        </div>
                    )}

                    {/* Reservation Date */}

                    <div>

                        <label className="block mb-2 font-medium text-slate-700">
                            Reservation Date
                        </label>

                        <input
                            type="date"
                            name="reservationDate"
                            value={formData.reservationDate}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Reservation Time */}

                    <div>

                        <label className="block mb-2 font-medium text-slate-700">
                            Reservation Time
                        </label>

                        <select
                            name="reservationTime"
                            value={formData.reservationTime}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Reservation Time</option>

                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>

                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>

                            <option value="13:00">1:00 PM</option>
                            <option value="13:30">1:30 PM</option>

                            <option value="14:00">2:00 PM</option>
                            <option value="14:30">2:30 PM</option>

                            <option value="15:00">3:00 PM</option>
                            <option value="15:30">3:30 PM</option>

                            <option value="16:00">4:00 PM</option>
                            <option value="16:30">4:30 PM</option>

                            <option value="17:00">5:00 PM</option>
                            <option value="17:30">5:30 PM</option>

                            <option value="18:00">6:00 PM</option>
                            <option value="18:30">6:30 PM</option>

                            <option value="19:00">7:00 PM</option>
                            <option value="19:30">7:30 PM</option>

                            <option value="20:00">8:00 PM</option>
                            <option value="20:30">8:30 PM</option>

                            <option value="21:00">9:00 PM</option>
                            <option value="21:30">9:30 PM</option>

                            <option value="22:00">10:00 PM</option>
                            <option value="22:30">10:30 PM</option>

                            <option value="23:00">11:00 PM</option>
                        </select>

                    </div>

                    {/* Guests */}

                    <div>

                        <label className="block mb-2 font-medium text-slate-700">
                            Number of Guests
                        </label>

                        <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((guest) => (
                                <option key={guest} value={guest}>
                                    {guest} {guest === 1 ? "Guest" : "Guests"}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Special Request */}

                    <div>

                        <label className="block mb-2 font-medium text-slate-700">
                            Special Request (Optional)
                        </label>

                        <textarea
                            rows="4"
                            name="specialRequest"
                            value={formData.specialRequest}
                            onChange={handleChange}
                            placeholder="Window seat, birthday celebration, etc."
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition duration-300"
                    >
                        {loading ? "Reserving..." : "Reserve Table"}
                    </button>
                </form>

            </div>

        </section>
    );
}

export default BookTable;