import express from "express";

import {registerUser,loginUser,getUserProfile,} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Registration
router.post("/register", registerUser);

// Customer & Admin Login
router.post("/login", loginUser);

// Get User Profile
router.get("/profile", protect, getUserProfile);

export default router;