import { Request, Response } from "express";
import Order from "../model/orderModel";

class OrderController {

    async newOrder(req: Request, res: Response) {
        const {eventId, quantity} = req.body;
        try {
            const userId = req.userId;
            const newOrder = Order.create({
                eventId,
                quantity,
                buyerId: userId
            });
            res.status(200).json(newOrder);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export const orderController = new OrderController();