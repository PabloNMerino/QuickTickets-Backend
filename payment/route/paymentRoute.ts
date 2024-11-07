import express from "express";
import { paymentController } from "../controller/paymentController";

const paymentRouter = express.Router();

paymentRouter.post('', paymentController.proceedPayment);

export default paymentRouter;