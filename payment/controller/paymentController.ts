import { Request, Response } from "express";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QIbVbASEa29THpJqNQ3WARdIlxumjlb9erK9h7I2kH0JAxhWqfe8OnBQEL3YUpBArDWxB7I5GTn99Cv3F8sY43g007j6Gmu4i'); 

class PaymentController {

    async proceedPayment(req: Request, res: Response) {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: 'recital',
                            description: 'de heavy metal'
                        },
                        currency:'ars',
                        unit_amount: 150000,
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'https://static.wikia.nocookie.net/memeaventuras/images/8/8a/Exito.jpg/revision/latest?cb=20140608174656&path-prefix=es',
            cancel_url: 'https://e7.pngegg.com/pngimages/686/914/png-clipart-sad-frog-illustration-pepe-the-frog-sadness-alt-right-meme-sad-leaf-animals.png'
        })
        return res.json(session);
    }
}

export const paymentController = new PaymentController();