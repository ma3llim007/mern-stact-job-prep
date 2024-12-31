import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const twoFactorAuthUserScheme = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        twoFactorsSecret: {
            type: String,
        },
        is2faEnabled: {
            type: Boolean,
            default: false,
        },
        backupCodes: [String],
    },
    { timestamps: true }
);

// Hashing the password
twoFactorAuthUserScheme.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Combing the password
twoFactorAuthUserScheme.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const TwoFactorAuthUser = mongoose.model("TwoFactorAuthUser", twoFactorAuthUserScheme);
