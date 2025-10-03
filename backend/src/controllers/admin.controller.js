import UserModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No users found",
                data: users
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}