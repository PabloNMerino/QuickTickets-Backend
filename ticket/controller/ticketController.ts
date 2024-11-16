import { Request, Response } from "express";
import Ticket from "../model/ticketModel";
import User from "../../users/model/userModel";
import Event from "../../events/model/eventModel";
import PDFDocument from 'pdfkit';
import path from 'path';
import QRCode from 'qrcode';
import { ticketService } from "../service/ticketService"
import { emailService } from "../../email/service/emailService"

class TicketController {

    async downloadTicket(req: Request, res: Response) {
        const { ticketId } = req.query;
        
        try {
            const ticket = await Ticket.findById(ticketId);
            if(ticket!=null) {
                const user = await User.findById(ticket.buyerId);
                const event = await Event.findById(ticket.eventId);
                const date = event?.dateTime;

                if (date!=null) {
                    const year = date.getFullYear();
                    const month = String(date.getMonth()+1).padStart(2, '0');  // Los meses en JavaScript son 0-indexed
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
    
                    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                const ticketData = {
                    eventName: event?.name,
                    eventDate: formattedDate,
                    qrCodeData: ticket.qrCode,
                    ticketOwner: `${user?.first_name} ${user?.last_name}`
                }

                // Crear documento PDF
                const doc = new PDFDocument();
                const filePath = path.join(__dirname, `ticket_${ticket.id}`)

                // Configuración de encabezado
                doc.pipe(res);

                doc.fontSize(20).fillColor('#FFE047').text('Ticket para el Evento', {
                    align: 'center',
                  });

                const qrCodeImage = await QRCode.toDataURL(`http://www.localhost:3001/ticket/${ticket._id}`);

                // Obtener el tamaño de la imagen
                const qrImageWidth = 200; // El ancho de la imagen que quieres mostrar
                const qrImageHeight = 200; // El alto de la imagen

                // Calcular las posiciones para centrar la imagen en la página
                const pageWidth = doc.page.width;
                const pageHeight = doc.page.height;

                // Calcular las coordenadas para centrar la imagen
                const xPosition = (pageWidth - qrImageWidth) / 2;
                const yPosition = (pageHeight - qrImageHeight) / 2;
                

                // Detalles del evento
                doc.moveDown(1);

                doc.fontSize(16).fillColor('#FFE047').text('Evento:', 50, 100);
                doc.fontSize(16).fillColor('#FFE047').text('Fecha:', 50, 130);
                doc.fontSize(16).fillColor('#FFE047').text('Asistente:', 50, 160);

                // Volver a cambiar el color a un tono oscuro para el contenido
                doc.fontSize(16).fillColor('#2B293D').text(`${ticketData.eventName}`, 150, 100);
                doc.moveDown(1); 

                doc.text(`${ticketData.eventDate}`, 150);
                doc.moveDown(1); 

                doc.text(`${ticketData.ticketOwner}`, 150);
                doc.image(qrCodeImage, xPosition, yPosition, { width: qrImageWidth, height: qrImageHeight });

                doc.end();
                }
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async getAllTicketsByBuyerId(req: Request, res: Response) {
        const userId = req.userId;  
        try {
            const tickets = await Ticket.find({buyerId: userId});
            return res.status(200).json(tickets);
        } catch (error) {
            return res.status(500);
        }
    }
}

export const ticketController = new TicketController();