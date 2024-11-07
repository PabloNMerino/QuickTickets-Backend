import express from "express";
import { orderController } from "../controller/orderController";
import { isAuthenticated } from "../../middlewares";

const orderRouter = express.Router();

orderRouter.post('', isAuthenticated, orderController.newOrder);

export default orderRouter;