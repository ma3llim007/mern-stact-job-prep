import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tokenUserScheme = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email Is Required"],
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// Hashing the password
tokenUserScheme.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Combing the password
tokenUserScheme.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

tokenUserScheme.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        }
    );
};

// Generate Access Token
tokenUserScheme.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        }
    );
};

export const TokenUser = mongoose.model("TokenUser", tokenUserScheme);
