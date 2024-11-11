import { Request, Response } from "express";
import Order from "../model/orderModel";
import { eventService } from "../../events/service/eventService"
import { ticketService } from "../../ticket/service/ticketService"

class OrderController {

    async newOrder(req: Request, res: Response) {
        const eventId = req.query.eventId as string;
        const quantity = parseInt(req.query.quantity as string, 10);
        
        try {
            //const userId = req.userId;
            const userId = '6723dca849b067f3e40cfd69';
            const newOrder = Order.create({
                eventId,
                quantity,
                buyerId: userId
            });

            await eventService.discountAvailabilityAmount(eventId, quantity);
            await ticketService.createNewTicket(eventId, userId, quantity);
            res.status(200).json(newOrder);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export const orderController = new OrderController();