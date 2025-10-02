import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { config } from "../configs/config.js";

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await UserModel.findById(decoded.id).select("-password -_id -createdAt -updatedAt -__v");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }
        req.user = user; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export default isAuthenticated;