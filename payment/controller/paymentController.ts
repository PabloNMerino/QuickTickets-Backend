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
            await eventService.discountAvailabilityAmount(eventId, quantity);

            //TRAER DE LA BBDD EL EVENTO
            const event = await Event.findById(eventId);

            if(event!=null) {
                const session = await stripe.checkout.sessions.create({
                    line_items: [
                        {
                            price_data: {
                                product_data: {
                                    name: event.name,
                                    description: event.description
                                },
                                currency:'ars',
                                unit_amount: event.price,
                            },
                            quantity: quantity
                        }
                    ],
                    mode: 'payment',
                    success_url: 'https://static.wikia.nocookie.net/memeaventuras/images/8/8a/Exito.jpg/revision/latest?cb=20140608174656&path-prefix=es',
                    cancel_url: 'https://e7.pngegg.com/pngimages/686/914/png-clipart-sad-frog-illustration-pepe-the-frog-sadness-alt-right-meme-sad-leaf-animals.png'
                })
                return res.json(session);
            }
            return res.send('holis')
        } catch (error) {
            
        }
    }
}

export const paymentController = new PaymentController();