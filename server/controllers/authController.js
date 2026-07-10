import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            confirmPassword,
        } = req.body;

        // Check if all required fields are provided
        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        // Strong password validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
            });
        }

        // Normalize input data
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();
        const normalizedName = name.trim();

        // Validate phone number
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(normalizedPhone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit Indian mobile number.",
            });
        }

        // Check if email or phone already exists
        const existingUser = await User.findOne({
            $or: [
                { email: normalizedEmail },
                { phone: normalizedPhone },
            ],
        });

        if (existingUser) {
            if (existingUser.email === normalizedEmail) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already registered.",
                });
            }

            if (existingUser.phone === normalizedPhone) {
                return res.status(409).json({
                    success: false,
                    message: "Phone number is already registered.",
                });
            }
        }

        // Create new customer
        const user = await User.create({
            name: normalizedName,
            email: normalizedEmail,
            phone: normalizedPhone,
            password,
            role: "customer",
        });

        // Generate JWT
        const token = generateToken(user);

        // Send success response
        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

export const loginUser = async (req, res) => {
    try {

    } catch (error) {

    }
};