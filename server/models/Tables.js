import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: String,
      required: [true, "Table number is required"],
      unique: true,
      trim: true,
      match: [/^T\d+$/, "Table number must be in format T1, T2, T3..."],
    },

    capacity: {
      type: Number,
      required: [true, "Table capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },

    status: {
      type: String,
      enum: ["available", "maintenance"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;