import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: [true, "Table is required"],
    },

    reservationDate: {
      type: Date,
      required: [true, "Reservation date is required"],
    },

    reservationTime: {
      type: String,
      required: [true, "Reservation time is required"],
    },

    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "Guests must be at least 1"],
      max: [8, "Maximum 8 guests allowed"],
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },

    specialRequest: {
      type: String,
      trim: true,
      maxlength: [250, "Special request cannot exceed 250 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;