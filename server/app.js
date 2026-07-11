import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

// Default Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Restaurant Reservation API is running successfully."
    });
});

export default app;