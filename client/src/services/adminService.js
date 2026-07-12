import api from "./api";

export const getAllReservations = async () => {
  const response = await api.get("/reservations/admin");

  return response.data;
};

export const updateReservationStatus = async (
  reservationId,
  status
) => {
  const response = await api.patch(
    `/reservations/${reservationId}/status`,
    {
      status,
    }
  );

  return response.data;
};