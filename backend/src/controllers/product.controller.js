

export const addProduct = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Product added successfully"
    });
}