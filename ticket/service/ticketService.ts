import Ticket from "../model/ticketModel";
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import fs from "fs"
import Event from "../../events/model/eventModel";
import User from "../../users/model/userModel";

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
                const qrCodeData = `https://bootcamps3-proyecto-final-frontend.vercel.app/scannerQr/Status?ticketId=${ticket._id}`;
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

