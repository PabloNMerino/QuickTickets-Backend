import express from "express";
import { paymentController } from "../controller/paymentController";
import { isAuthenticated } from "../../middlewares";

const paymentRouter = express.Router();

paymentRouter.post('', isAuthenticated, paymentController.proceedPayment);

export default paymentRouter;