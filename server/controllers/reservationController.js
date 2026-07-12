import { createReservationService, getMyReservationsService, cancelReservationService, getAllReservationsService, updateReservationStatusService, } from "../services/reservationService.js";

export const getMyReservations = async (req, res) => {
  try {
    const result = await getMyReservationsService(
      req.user._id
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

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

export const cancelReservation = async (req, res) => {
  try {
    const result = await cancelReservationService(
      req.user._id,
      req.params.id
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllReservations = async (req, res) => {
  try {

    const result = await getAllReservationsService();

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateReservationStatus = async (req, res) => {
  try {

    const result = await updateReservationStatusService(
      req.params.id,
      req.body.status
    );

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};