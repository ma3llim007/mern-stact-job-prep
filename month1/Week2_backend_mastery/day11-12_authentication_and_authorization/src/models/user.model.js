import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userScheme = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username Is Required"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
    },
    { timestamps: true }
);

// Hashing the password
userScheme.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Combing the password
userScheme.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userScheme);
