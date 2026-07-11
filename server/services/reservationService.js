import { validateReservationDateAndTime } from "../validation/reservationValidation.js";
import { findBestAvailableTable } from "./tableAssignmentService.js";
import Reservation from "../models/Reservation.js";


export const createReservationService = async (userId, reservationData) => {
    // Destructure request data
    const {
        reservationDate,
        reservationTime,
        guests,
        specialRequest,
    } = reservationData;

    // ==========================
    // Required Fields Validation
    // ==========================

    if (!reservationDate) {
        throw new Error("Reservation date is required.");
    }

    if (!reservationTime) {
        throw new Error("Reservation time is required.");
    }

    if (guests === undefined || guests === null) {
        throw new Error("Number of guests is required.");
    }

    // ==========================
    // Guest Validation
    // ==========================

    if (!Number.isInteger(guests)) {
        throw new Error("Guests must be a whole number.");
    }

    if (guests < 1 || guests > 8) {
        throw new Error("Guests must be between 1 and 8.");
    }


    //Date and Time Validation
    validateReservationDateAndTime(
        reservationDate,
        reservationTime
    );


    // ==========================
    // Special Request Validation
    // ==========================

    if (specialRequest && specialRequest.length > 250) {
        throw new Error("Special request cannot exceed 250 characters.");
    }

    // ==========================
    // Temporary Success Response
    // (Database logic will come later)
    // ==========================

    // ==========================
    // Find Best Available Table
    // ==========================

    const selectedTable = await findBestAvailableTable(
        guests,
        reservationDate,
        reservationTime
    );

    if (!selectedTable) {
        throw new Error("No suitable table available.");
    }

    // ==========================
    // Create Reservation Object
    // ==========================

    const reservationDataToSave = {
        user: userId,
        table: selectedTable._id,
        reservationDate,
        reservationTime,
        guests,
        specialRequest,
        status: "confirmed",
    };

    // ==========================
    // Save Reservation
    // ==========================

    const reservation = await Reservation.create(reservationDataToSave);

    return {
        success: true,
        message: "Reservation created successfully.",
        reservation: {
            id: reservation._id,

            tableNumber: selectedTable.tableNumber,

            reservationDate: reservation.reservationDate,

            reservationTime: reservation.reservationTime,

            guests: reservation.guests,

            status: reservation.status,

            specialRequest: reservation.specialRequest,
        },
    };
};