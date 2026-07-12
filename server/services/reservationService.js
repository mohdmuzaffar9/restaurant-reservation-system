import { validateReservationDateAndTime } from "../validation/reservationValidation.js";
import { findBestAvailableTable } from "./tableAssignmentService.js";
import Reservation from "../models/Reservation.js";
import { convertTimeToMinutes } from "../utils/timeUtils.js";
import { RESTAURANT_CONFIG } from "../config/restaurantConfig.js";


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

    if (specialRequest && specialRequest.trim().length > 250) {
        throw new Error("Special request cannot exceed 250 characters.");
    }

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

export const getMyReservationsService = async (userId) => {
    const reservations = await Reservation.find({
        user: userId,
    })
        .populate("table", "tableNumber capacity")
        .sort({
            reservationDate: -1,
            reservationTime: -1,
        });

    return {
        success: true,
        count: reservations.length,

        reservations: reservations.map((reservation) => ({
            id: reservation._id,

            tableNumber: reservation.table.tableNumber,

            reservationDate: reservation.reservationDate,

            reservationTime: reservation.reservationTime,

            guests: reservation.guests,

            status: reservation.status,

            specialRequest: reservation.specialRequest,
        })),
    };
};

export const cancelReservationService = async (
    userId,
    reservationId
) => {

    // Find reservation
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
        throw new Error("Reservation not found.");
    }

    // Ownership Check
    if (reservation.user.toString() !== userId.toString()) {
        throw new Error("You are not authorized to cancel this reservation.");
    }

    // Status Check
    if (reservation.status === "cancelled") {
        throw new Error("Reservation is already cancelled.");
    }

    if (reservation.status === "completed") {
        throw new Error("Completed reservations cannot be cancelled.");
    }

    // ==========================
    // Cancellation Time Validation
    // ==========================

    const reservationDateTime = new Date(reservation.reservationDate);

    const [hours, minutes] = reservation.reservationTime
        .split(":")
        .map(Number);

    reservationDateTime.setHours(hours, minutes, 0, 0);

    const currentTime = new Date();

    const differenceInMinutes =
        (reservationDateTime.getTime() - currentTime.getTime()) / 60000;

    if (
        differenceInMinutes <
        RESTAURANT_CONFIG.MIN_ADVANCE_BOOKING
    ) {
        throw new Error(
            `Reservations can only be cancelled at least ${RESTAURANT_CONFIG.MIN_ADVANCE_BOOKING} minutes before the reservation time.`
        );
    }

    // Cancel Reservation
    reservation.status = "cancelled";

    await reservation.save();

    return {
        success: true,
        message: "Reservation cancelled successfully.",
        reservation: {
            id: reservation._id,
            status: reservation.status,
        },
    };
};

export const getAllReservationsService = async () => {

    const reservations = await Reservation.find()
        .populate("user", "name phone")
        .populate("table", "tableNumber capacity")
        .sort({
            reservationDate: -1,
            reservationTime: -1,
        });

    return {
        success: true,

        count: reservations.length,

        reservations: reservations.map((reservation) => ({

            id: reservation._id,

            customerName: reservation.user.name,

            phone: reservation.user.phone,

            tableNumber: reservation.table.tableNumber,

            capacity: reservation.table.capacity,

            reservationDate: reservation.reservationDate,

            reservationTime: reservation.reservationTime,

            guests: reservation.guests,

            status: reservation.status,

            specialRequest: reservation.specialRequest,

        })),
    };

};

export const updateReservationStatusService = async (
    reservationId,
    status
) => {

    // Find Reservation
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
        throw new Error("Reservation not found.");
    }

    // Allowed Status Validation
    const allowedStatus = ["completed", "cancelled"];

    if (!allowedStatus.includes(status)) {
        throw new Error(
            "Invalid status. Allowed values are completed or cancelled."
        );
    }

    // Final State Check
    if (reservation.status === "completed") {
        throw new Error("Reservation is already completed.");
    }

    if (reservation.status === "cancelled") {
        throw new Error("Reservation is already cancelled.");
    }

    // Update Status
    reservation.status = status;

    await reservation.save();

    return {
        success: true,
        message: "Reservation status updated successfully.",
        reservation: {
            id: reservation._id,
            status: reservation.status,
        },
    };
};