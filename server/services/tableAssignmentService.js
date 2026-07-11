import Table from "../models/Table.js";
import Reservation from "../models/Reservation.js";
import { RESTAURANT_CONFIG } from "../config/restaurantConfig.js";
import { convertTimeToMinutes } from "../utils/timeUtils.js";

const isTableAvailable = async (
    tableId,
    reservationDate,
    reservationTime
) => {
    // Find confirmed reservations for the same table and date
    const reservations = await Reservation.find({
        table: tableId,
        reservationDate: new Date(reservationDate),
        status: "confirmed",
    });

    // Requested reservation start time
    const requestedStart = convertTimeToMinutes(reservationTime);

    // Requested reservation end time
    const requestedEnd =
        requestedStart + RESTAURANT_CONFIG.DINING_DURATION;

    // Check overlap
    for (const reservation of reservations) {
        const existingStart = convertTimeToMinutes(
            reservation.reservationTime
        );

        const existingEnd =
            existingStart + RESTAURANT_CONFIG.DINING_DURATION;

        const overlap =
            requestedStart < existingEnd &&
            requestedEnd > existingStart;

        if (overlap) {
            return false;
        }
    }

    return true;
};

export const findBestAvailableTable = async (
    guests,
    reservationDate,
    reservationTime
) => {
    const suitableTables = await Table.find({
        capacity: {
            $gte: guests,
            $lte: guests + RESTAURANT_CONFIG.MAX_EXTRA_SEATS,
        },
        status: "available",
    }).sort({
        capacity: 1,
        tableNumber: 1,
    });

    if (suitableTables.length === 0) {
        return null;
    }

    for (const table of suitableTables) {
        const available = await isTableAvailable(
            table._id,
            reservationDate,
            reservationTime
        );

        if (available) {
            return table;
        }
    }

    return null;
};