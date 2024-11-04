import { Request, Response } from "express";
import User from "../../users/model/userModel";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
const { validationResult } = require("express-validator");
//import { sendWelcomeEmail } from "../../emailService/emailSender"

class AuthController {

    async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }
            const user = await User.create(req.body);
            //sendWelcomeEmail(email, req.body.first_name)
            return res.status(201).json(user);
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: "Registration failed" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser || existingUser.is_enabled==false) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordValid = await compare(password, existingUser.password!);
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid password" });
            }
            const userPayload = {
                userId: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
            }

            const token = sign(
                userPayload,
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );
    
            return res.status(200).json(userPayload);
        } catch (error) {
            return res.status(400).json({message: "something went wrong"})
        }
    }

}

export const authController = new AuthController()