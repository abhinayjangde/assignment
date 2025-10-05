import { config } from "../configs/config.js";
import UserModel from "../models/user.model.js";
import sendEmail from "../utils/sendMail.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long",
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
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validate email and password
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        // 2. find user
        const user = await UserModel.findOne({ email: email }).select("+password");
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found, please register first"
            })
        }
        // 3. Checking that user is verified or not
        if (!user.isVerified) {
            const token = await user.generateEmailVerificationToken();
            await user.save();
            const verificationUrl = `${config.baseUrl}/api/auth/verify/${token}`

            const message = `
            Thank you for registering! Please verify your email to complete your registration.
            
            ${verificationUrl}

            This verification link will expire in 10 minutes.
            If you did not create an account, please ignore this email.
            `;

            await sendEmail(user.email, token, "Please verify your email", message)

            return res.status(403).json({
                success: false,
                message: "Please verify your email"
            })
        }
        // 4. Match password
        const isMatched = await user.comparePassword(password);

        if (!isMatched) {
            return res.status(200).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // 5. Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
            expiresIn: "3d"
        })

        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
            secure: config.env === "production", // true in production
            sameSite: config.env === "production" ? "none" : "lax", // Allow cross-site cookies in production
            domain: config.env === "production" ? undefined : undefined // Let browser handle domain
        };

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: {
                name: user.name,
            }
        });
    } catch (error) {
        console.error("Error while login :", error);
        return res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message
        });
    }
};

export const profile = async (req, res) => {
    const user = req.user;
    try {

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User profile data fetched successfully",
            user
        })
    } catch (error) {
        console.log("Error in loggedin middleware ", error)
        return res.status(401).json({
            success: false,
            message: "Error while checking logged in",
            error: error.message
        })
    }
};

export const logutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: config.env === "production",
            sameSite: config.env === "production" ? "none" : "lax",
            domain: config.env === "production" ? undefined : undefined
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Error while logging out user:", error);
        return res.status(500).json({
            success: false,
            message: "Error while logging out user",
            error: error.message
        });
    }
}
