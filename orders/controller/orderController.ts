import { Request, Response } from "express";
import Order from "../model/orderModel";
import { eventService } from "../../events/service/eventService"

class OrderController {

    async newOrder(req: Request, res: Response) {
        const {eventId, quantity} = req.body;
        try {
            const userId = req.userId;
            await eventService.discountAvailabilityAmount(eventId, quantity);
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