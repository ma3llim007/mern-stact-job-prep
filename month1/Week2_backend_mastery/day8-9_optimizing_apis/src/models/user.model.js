import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema(
    {
        name: String,
        age: Number,
        city: String,
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserScheme);
