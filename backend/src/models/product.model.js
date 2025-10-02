
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Seller is required"],
        },
        price: {
            type: String,
            required: [true, "Price is required"],
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            enum: [
                'Electronics',
                'Clothing',
                'Books',
                'Home & Garden',
                'Sports',
                'Toys',
                'Health & Beauty',
                'Food & Beverages',
                'Automotive',
                'Other'
            ]
        },
        imageURL: {
            type: String,
            required: [true, "Image URL is required"],
        }
    },
    {
        timestamps: true,
    }
)

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
