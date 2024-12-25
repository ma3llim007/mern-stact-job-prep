import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        category: String,
        specs: Object,
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
