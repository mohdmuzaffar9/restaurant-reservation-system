import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";

import User from "../models/User.js";
import Table from "../models/Table.js";

import tables from "../data/tables.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect Database
    await connectDB();

    console.log("\n🌱 Starting Database Seeding...\n");

    // =========================
    // Create Default Admin
    // =========================

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("👤 Default Admin already exists.");
    } else {
      await User.create({
        name: "Restaurant Admin",
        email: process.env.ADMIN_EMAIL,
        phone: process.env.ADMIN_PHONE,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });

      console.log("✅ Default Admin created successfully.");
    }

    console.log("");

    // =========================
    // Create Default Tables
    // =========================

    let insertedTables = 0;

    for (const table of tables) {
      const existingTable = await Table.findOne({
        tableNumber: table.tableNumber,
      });

      if (!existingTable) {
        await Table.create(table);

        insertedTables++;

        console.log(`🍽 Added ${table.tableNumber}`);
      } else {
        console.log(`✔ ${table.tableNumber} already exists`);
      }
    }

    console.log("");

    console.log(`✅ ${insertedTables} new table(s) added.`);

    console.log("\n🎉 Database seeding completed successfully.");

    // Close Database Connection
    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Database seeding failed.");
    console.error(error.message);

    // Close connection if opened
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedDatabase();