import {
    convertTimeToMinutes,
    isRestaurantOpen,
} from "../utils/timeUtils.js";

import { RESTAURANT_CONFIG } from "../config/restaurantConfig.js";

export const validateReservationDateAndTime = (
    reservationDate,
    reservationTime
) => {
    // ==========================
    // Date Validation
    // ==========================

    const today = new Date();

    const bookingDate = new Date(reservationDate);

    // ==========================
    // Invalid Date Validation
    // ==========================

    if (isNaN(bookingDate.getTime())) {
        throw new Error("Invalid reservation date.");
    }

    // Remove time for date comparison
    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
        throw new Error("Reservation date cannot be in the past.");
    }

    // ==========================
    // Restaurant Timing
    // ==========================

    if (!isRestaurantOpen(reservationTime)) {
        throw new Error(
            `Restaurant accepts reservations only between ${RESTAURANT_CONFIG.OPENING_TIME} and ${RESTAURANT_CONFIG.CLOSING_TIME}.`
        );
    }

    // ==========================
    // Same Day Validation
    // ==========================

    const currentDate = new Date();

    const isToday =
        bookingDate.getTime() ===
        new Date(currentDate.setHours(0, 0, 0, 0)).getTime();

    if (isToday) {
        const now = new Date();

        const currentMinutes =
            now.getHours() * 60 + now.getMinutes();

        const reservationMinutes =
            convertTimeToMinutes(reservationTime);

        // Past Time
        if (reservationMinutes <= currentMinutes) {
            throw new Error(
                "Reservation time cannot be in the past."
            );
        }

        // Minimum Advance Booking
        if (
            reservationMinutes - currentMinutes <
            RESTAURANT_CONFIG.MIN_ADVANCE_BOOKING
        ) {
            throw new Error(
                `Reservations must be booked at least ${RESTAURANT_CONFIG.MIN_ADVANCE_BOOKING} minutes in advance.`
            );
        }
    }
};