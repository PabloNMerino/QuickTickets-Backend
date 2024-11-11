import Ticket from "../model/ticketModel";
import QRCode from 'qrcode';

class TicketService {

    async createNewTicket(eventId: string, buyerId: string, quantity: number): Promise<void> {
        try {
            // Crear un array de promesas para crear todos los tickets
            const ticketPromises = Array.from({ length: quantity }, async () => {
                // Crear un nuevo ticket sin guardar aún en la base de datos
                const ticket = new Ticket({
                    eventId,
                    buyerId
                });
    
                // Generar el código QR
                const qrCodeData = `http://${process.env.HOST}:${process.env.PORT}/tickets/${ticket._id}`;
                const qrCode = await QRCode.toDataURL(qrCodeData);
    
                // Asignar el código QR al ticket
                ticket.qrCode = qrCode;
    
                // Guardar el ticket en la base de datos
                return Ticket.create(ticket);
            });
    
            // Ejecutar todas las promesas para crear los tickets
            await Promise.all(ticketPromises);
        } catch (error) {
            throw error;
        }
    }
}

export const ticketService = new TicketService();

