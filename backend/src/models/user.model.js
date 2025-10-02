import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
        },
        avatar: {
            type: String,
            default:
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        },
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            default: "user",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpire: {
            type: Date,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpire: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.generateEmailVerificationToken = async function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.emailVerificationToken = token;
    this.emailVerificationExpire = Date.now() + 10 * 60 * 60 * 1000; // 10 minutes
    return token;
}
userSchema.methods.generatePasswordResetToken = async function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = token;
    this.passwordResetExpire = Date.now() + 10 * 60 * 60 * 1000; // 10 minutes
    return token;
}

const User = mongoose.model("User", userSchema);

export default User;
