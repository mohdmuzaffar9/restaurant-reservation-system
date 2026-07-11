import { createReservationService } from "../services/reservationService.js";

export const createReservation = async (req, res) => {
  try {
    const result = await createReservationService(req.user._id, req.body);

    return res.status(201).json(result);

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};