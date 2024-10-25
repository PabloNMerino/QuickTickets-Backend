import express from "express";
import { authController } from "../controller/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;