import { Request, Response } from "express";
import Order from "../model/orderModel";
import { eventService } from "../../events/service/eventService"
import { ticketService } from "../../ticket/service/ticketService"

class OrderController {

    async newOrder(req: Request, res: Response) {
        const eventId = req.body.eventId as string;
        const quantity = parseInt(req.body.quantity as string, 10);
        
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            //const userId = '6723dca849b067f3e40cfd69';
            const newOrder = Order.create({
                eventId,
                quantity,
                buyerId: userId
            });

            await eventService.discountAvailabilityAmount(eventId, quantity);
            const newTicket = await ticketService.createNewTicket(eventId, userId, quantity);
            
            res.status(200).json(newOrder);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export const orderController = new OrderController();