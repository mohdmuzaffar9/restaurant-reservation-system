import { RESTAURANT_CONFIG } from "../config/restaurantConfig.js";

// Convert "HH:MM" to total minutes
export const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

// Convert total minutes to "HH:MM"
export const convertMinutesToTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Check whether the time is within restaurant hours
export const isRestaurantOpen = (time) => {
  const bookingTime = convertTimeToMinutes(time);

  const openingTime = convertTimeToMinutes(
    RESTAURANT_CONFIG.OPENING_TIME
  );

  const closingTime = convertTimeToMinutes(
    RESTAURANT_CONFIG.CLOSING_TIME
  );

  return bookingTime >= openingTime && bookingTime <= closingTime;
};