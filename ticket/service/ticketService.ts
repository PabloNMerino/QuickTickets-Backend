import Ticket from "../model/ticketModel";
import QRCode from 'qrcode';

class TicketService {

    async createNewTicket(eventId: String, buyerId: String, quantity: Number) {
        try {
            const ticket = new Ticket({
                eventId,
                buyerId
            });

            await Ticket.create(ticket);

            const qrCodeData = `http://${process.env.HOST}:${process.env.PORT}/tickets/${ticket._id}`;
            const qrCode = await QRCode.toDataURL(qrCodeData);

            ticket.qrCode = qrCode;
            ticket.save();
        } catch (error) {
            throw error;
        }
    }
}

export const ticketService = new TicketService();