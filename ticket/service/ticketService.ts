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

    async generateTicketForEmail(ticketId : string) {
        try {
            const ticket = await Ticket.findById(ticketId);
            const event = await Event.findById(ticket?.eventId);
            const ticketOwner = await User.findById(ticket?.buyerId);
            const doc = new PDFDocument();
            const pdfPath = `./pdfs/${ticket?._id}_entrada.pdf`;
            const stream = fs.createWriteStream(pdfPath);
            doc.pipe(stream);

            // Agregar contenido al PDF
            doc.fontSize(24).text('Entrada para el evento', { align: 'center' });
            doc.moveDown();
            doc.fontSize(20).text(`Evento: ${event?.name}`, { align: 'left' });
            doc.fontSize(16).text(`Fecha: ${event?.dateTime}`, { align: 'left' });
            doc.fontSize(16).text(`Asistente: ${ticketOwner?.first_name} ${ticketOwner?.last_name}`, { align: 'left' });
            doc.moveDown();
            const qrCodeData = await QRCode.toDataURL(`http://www.localhost:3001/ticket/${ticket?._id}`);
            doc.image(qrCodeData, { fit: [150, 150], align: 'center' });

            await new Promise((resolve, reject) => {
                stream.on('finish', resolve);
                stream.on('error', reject);
              });

            return pdfPath;
        } catch (error) {
            throw error;
        }
    }
}

export const ticketService = new TicketService();

