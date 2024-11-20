import { Schema, model } from "mongoose"
import { UserRole } from "./userRoleEnum"
import bcrypt from "bcrypt";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        },
    last_name: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
            ],
        unique: true,
        },
    phone: {
            type: Number,
            required: true,
        },
    state: {
        type: String,
        required: true,
        },
    country: {
        type: String,
        required: true,
        },
    password: {
        type: String,
        required: true,
        },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Customer
    },
    is_subscribed: {
        type: Boolean,
        default: false,          
    },
    is_active: {
        type: Boolean,
        default: true,          
    }
})

userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password ?? "", 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.error(error);
    }
});

    const User = model("Users", userSchema);

    export default User;