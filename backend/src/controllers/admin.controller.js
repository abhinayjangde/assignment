import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: "user" })
            .select("-password -emailVerificationToken -passwordResetToken")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
            count: users.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getAllSellers = async (req, res) => {
    try {
        const sellers = await UserModel.find({ role: 'seller' })
            .select("-password -emailVerificationToken -passwordResetToken")
            .sort({ createdAt: -1 });

        // Get product count for each seller
        const sellersWithProducts = await Promise.all(
            sellers.map(async (seller) => {
                const productCount = await ProductModel.countDocuments({ seller: seller._id });
                return {
                    ...seller.toObject(),
                    productCount
                };
            })
        );

        return res.status(200).json({
            success: true,
            message: "Sellers retrieved successfully",
            data: sellersWithProducts,
            count: sellers.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getPayments = async (req, res) => {
    try {
        // Mock payment data
        const mockPayments = [
            {
                id: 1,
                user: "John Doe",
                amount: 299.99,
                date: new Date("2024-01-15"),
                status: "Completed",
                paymentMethod: "Credit Card"
            },
            {
                id: 2,
                user: "Jane Smith",
                amount: 149.50,
                date: new Date("2024-01-16"),
                status: "Completed",
                paymentMethod: "PayPal"
            },
            {
                id: 3,
                user: "Bob Johnson",
                amount: 499.00,
                date: new Date("2024-01-17"),
                status: "Pending",
                paymentMethod: "Debit Card"
            }
        ];

        return res.status(200).json({
            success: true,
            data: mockPayments,
            count: mockPayments.length,
            message: "Payments retrieved successfully"
        });
    } catch (error) {
        console.error("Error fetching payments:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching payments",
            error: error.message
        });
    }
};
