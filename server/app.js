import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Restaurant Reservation API is running successfully."
    });
});

export default app;