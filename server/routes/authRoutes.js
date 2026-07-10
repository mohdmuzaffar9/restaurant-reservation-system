import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Customer Registration
router.post("/register", registerUser);

// Customer & Admin Login
router.post("/login", loginUser);

export default router;