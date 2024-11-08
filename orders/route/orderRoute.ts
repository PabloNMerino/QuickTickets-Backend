import express from "express";
import { orderController } from "../controller/orderController";
import { isAuthenticated } from "../../middlewares";

const orderRouter = express.Router();

orderRouter.get('/success'/*, isAuthenticated*/, orderController.newOrder);

export default orderRouter;