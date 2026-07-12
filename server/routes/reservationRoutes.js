import express from "express";

import { createReservation, getMyReservations, cancelReservation, getAllReservations, updateReservationStatus, } from "../controllers/reservationController.js";
import { protect, adminOnly, } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReservation);

router.get("/my", protect, getMyReservations);

router.patch("/:id/cancel", protect, cancelReservation);

router.get("/admin", protect, adminOnly, getAllReservations);

router.patch("/:id/status", protect, adminOnly, updateReservationStatus);

export default router;