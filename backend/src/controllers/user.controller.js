import { config } from "../configs/config.js";
import UserModel from "../models/user.model.js";
import sendEmail from "../utils/sendMail.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }


        const user = await UserModel.create({
            name,
            email,
            password
        });
        // it will automatically set token and expire time
        const token = await user.generateEmailVerificationToken();
        await user.save();

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Error while creating user in database",
            });
        }

        const verificationUrl = `${config.baseUrl}/api/auth/verify/${token}`
        // 7. Send verification email
        const message = `
            Thank you for registering! Please verify your email to complete your registration.
            
            ${verificationUrl}

            This verification link will expire in 10 minutes.
            If you did not create an account, please ignore this email.
            `
        try {
            await sendEmail(user.email, token, "Please verify your email", message)
        } catch (error) {
            console.error("Error sending verification email: ", error);
        }
        return res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    } catch (error) {
        console.error("Error registering user: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired verification token"
        });
    }
    try {
        // 1. Find user by verification token
        const user = await UserModel.findOne({ emailVerificationToken: token, emailVerificationExpire: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token"
            });
        }

        // 2. Verify user
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpire = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error("Error verifying email: ", error);
        return res.status(500).json({
            success: false,
            message: "Error while verifying user email",
            error: error.message
        });
    }
}
