import { Request, Response } from "express";
import Stripe from 'stripe';
import { eventService } from "../../events/service/eventService"
import Event from "../../events/model/eventModel";

const stripePrivateKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(stripePrivateKey); 

class PaymentController {

    async proceedPayment(req: Request, res: Response) {
        const {eventId, quantity} = req.body;
        const userId = req.userId;
        try {

            //VERIFICAR SI HAY CANTIDAD DE TICKETS DISPONIBLES
            const isAvailable = await eventService.checkAvailabilityAmount(eventId, quantity);
            if(!isAvailable) {
                res.status(400).json({message: 'tickets are no longer available'})
            }
            
            //TRAER DE LA BBDD EL EVENTO
            const event = await Event.findById(eventId);

            if(event!=null) {
                const priceInCents = event.price * 100;
                const session = await stripe.checkout.sessions.create({
                    line_items: [
                        {
                            price_data: {
                                product_data: {
                                    name: event.name,
                                    description: event.description
                                },
                                currency:'ars',
                                unit_amount: priceInCents,
                            },
                            quantity: quantity
                        }
                    ],
                    mode: 'payment',
                    success_url: `http://localhost:3000/PaymentSuccess?eventId=${eventId}&quantity=${quantity}`,
                    cancel_url: 'https://e7.pngegg.com/pngimages/686/914/png-clipart-sad-frog-illustration-pepe-the-frog-sadness-alt-right-meme-sad-leaf-animals.png'
                })
                return res.json(session.url);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const paymentController = new PaymentController();