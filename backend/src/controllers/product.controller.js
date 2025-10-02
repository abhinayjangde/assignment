import cloudinary from "../configs/cloudinary.js";
import ProductModel from "../models/product.model.js";
import path from "node:path";
import fs from "node:fs";

export const addProduct = async (req, res) => {

    const { name, description, price, category } = req.body;
    const imageURL = req.file;
    const seller = req.user._id;


    if (!name || !description || !price || !category || !imageURL) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const imageMimeType = imageURL.mimetype.split("/")[1] ?? "jpg";
    const fileName = imageURL.filename;

    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    try {
        const uploadImageResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "products",
            format: imageMimeType,
        });
        if (!uploadImageResult) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed",
            });
        }
        const newProduct = await ProductModel.create({
            name,
            description,
            price,
            category,
            imageURL: uploadImageResult.secure_url,
            seller,
        });

        fs.promises.unlink(filePath).catch((err) => console.error(err));

        res.status(201).json({
            success: true,
            data: {
                id: newProduct._id,
            },
            message: "Product added successfully"
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}