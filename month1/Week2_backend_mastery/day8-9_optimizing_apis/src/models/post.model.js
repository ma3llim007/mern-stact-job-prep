import mongoose, { Schema } from "mongoose";

const postScheme = new Schema(
    {
        title: String,
        content: String,
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postScheme);
