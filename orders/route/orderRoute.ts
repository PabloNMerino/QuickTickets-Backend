import express from "express";
import { orderController } from "../controller/orderController";
import { isAuthenticated } from "../../middlewares";

const orderRouter = express.Router();

orderRouter.post('/success', isAuthenticated, orderController.newOrder);

export default orderRouter;