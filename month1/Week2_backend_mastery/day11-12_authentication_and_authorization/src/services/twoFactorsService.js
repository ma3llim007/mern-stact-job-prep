import speakeasy from "speakeasy";
import qrcode from "qrcode";

// Generating Secret Key
const generate2faSecret = async (email, issuer = "Authentication") => {
    const secret = speakeasy.generateSecret({ length: 20 });

    // Save the 2FA secret to the user's database record
    const secretCode = secret.base32;

    // Generate the OTP Auth URL
    const otpAuthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(
        email
    )}?secret=${secretCode}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6`;

    // Generate the QR code URL that the user will scan
    const qrCodeUrl = await qrcode.toDataURL(otpAuthUrl);

    return {
        secret: secretCode,
        qrCodeUrl,
    };
};

// Verify The Token
const verifyToken = async (user, token) => {
    const verificationResult = speakeasy.totp.verifyDelta({
        secret: user.twoFactorsSecret,
        encoding: "base32",
        token: token.trim(),
        window: 2,
    });

    return verificationResult !== null;
};

// Generating The backupCodes
const generateBackUpCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
        const backupCodes = Math.floor(100000 * Math.random() * 900000).toString();
        codes.push(backupCodes);
    }
    return codes;
};
export { generate2faSecret, verifyToken, generateBackUpCodes };
