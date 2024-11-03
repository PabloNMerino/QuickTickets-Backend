import express from "express";
import { cloudinaryController, uploadMiddleware } from "../controller/cloudinaryController";
//import { isAuthenticated } from "../../middlewares";

const cloudinaryRouter = express.Router();

cloudinaryRouter.post('/upload', uploadMiddleware, cloudinaryController.uploadImage);

export default cloudinaryRouter;