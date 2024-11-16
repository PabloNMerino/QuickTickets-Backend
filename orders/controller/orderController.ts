import { Request, Response } from "express";
import Order from "../model/orderModel";
import { eventService } from "../../events/service/eventService"
import { ticketService } from "../../ticket/service/ticketService"
import Event from "../../events/model/eventModel"
import User from "../../users/model/userModel"
import { emailService } from "../../email/service/emailService"

class OrderController {

    async newOrder(req: Request, res: Response) {
        const eventId = req.body.eventId as string;
        const quantity = parseInt(req.body.quantity as string, 10);
        
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const event = await Event.findById(eventId);
            const user = await User.findById(userId, 'email')
            const newOrder = Order.create({
                eventId,
                quantity,
                buyerId: userId
            });

            await eventService.discountAvailabilityAmount(eventId, quantity);
            await ticketService.createNewTicket(eventId, userId, quantity);
            
            if(user!=null && event!=null) {
                await emailService.sendPurchaseEmail(user.email, event.name, event.dateTime, quantity)
            }
            res.status(200).json(newOrder);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export const orderController = new OrderController();