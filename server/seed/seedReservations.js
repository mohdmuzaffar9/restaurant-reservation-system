// ========================================
// Temporary Testing Seed
// Used only for conflict detection testing
// ========================================

import dotenv from "dotenv";

import connectDB from "../config/db.js";

import User from "../models/User.js";
import Table from "../models/Table.js";
import Reservation from "../models/Reservation.js";

dotenv.config();

await connectDB();

const seedReservations = async () => {
  try {
    console.log("🌱 Creating test reservations...\n");

    // Find any customer
    const customer = await User.findOne({
      role: "customer",
    });

    if (!customer) {
      throw new Error(
        "No customer found. Please register a customer first."
      );
    }

    // Reservation Date
    const reservationDate = new Date("2026-07-20");

    // Remove previous test reservations
    await Reservation.deleteMany({
      reservationDate,
    });

    // Tables to occupy
    const tableNumbers = ["T3", "T4", "T5", "T6"];

    for (const tableNumber of tableNumbers) {
      const table = await Table.findOne({
        tableNumber,
      });

      if (!table) {
        continue;
      }

      await Reservation.create({
        user: customer._id,
        table: table._id,
        reservationDate,
        reservationTime: "19:00",
        guests: table.capacity,
        status: "confirmed",
        specialRequest: "Conflict Test",
      });

      console.log(`✅ ${tableNumber} occupied.`);
    }

    console.log("\n🎉 Conflict testing data created successfully.");

    process.exit(0);

  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedReservations();