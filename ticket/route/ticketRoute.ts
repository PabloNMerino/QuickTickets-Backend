import express from "express";
import { ticketController } from "../controller/ticketController";
import { isAuthenticated, isAdmin } from "../../middlewares";

const ticketRouter = express.Router();

/**
 * @swagger
 * /ticket/download:
 *   get:
 *     summary: Descargar ticket en formato PDF
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     description: Permite descargar un ticket en formato PDF utilizando el `ticketId`.
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del ticket.
 *         example: 63f1b8e4f1a7c2d1e3b4567c
 *     responses:
 *       200:
 *         description: Ticket descargado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Solicitud inválida (ID de ticket no proporcionado o formato incorrecto)
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error al generar o descargar el ticket.
 */
ticketRouter.get('/download', ticketController.downloadTicket);

/**
 * @swagger
 * /ticket/my-tickets:
 *   get:
 *     summary: Obtener tickets de un usuario
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista de tickets comprados por un usuario específico.
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identificador único del ticket.
 *                     example: 8745b3c7d9e2a1f1c3b2a1d4
 *                   eventId:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 8745b3c7d9e2a1f1c3b2a1d4
 *                   buyerId:
 *                     type: string
 *                     description: Identificador único del comprador.
 *                     example: 8745b3c7d9e2a1f1c3b2a1d4
 *                   purchaseDateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de compra del ticket.
 *                     example: 2024-11-19T15:30:00Z
 *                   qrCode:
 *                     type: string
 *                     description: Codigo QR del ticket.
 *                     example: data:image/png;base64,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
 *       400:
 *         description: Solicitud inválida (ID de usuario no proporcionado o formato incorrecto)
 *       404:
 *         description: Usuario no encontrado o sin tickets
 *       500:
 *         description: Error al obtener los tickets del usuario.
 */
ticketRouter.get('/my-tickets', isAuthenticated, ticketController.getAllTicketsByBuyerId)

/**
 * @swagger
 * /ticket/status:
 *   patch:
 *     summary: Marcar un ticket como utilizado
 *     tags: [Ticket]
 *     description: Actualiza la propiedad "is_used" de un ticket a true si su valor actual es false.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *                 description: ID del ticket a marcar como utilizado.
 *                 example: 672272773d5248be4b5964a7
 *     responses:
 *       200:
 *         description: Indicacion "Authorized" o "Denied"
 *       500:
 *         description: Error interno al actualizar el ticket.
 */
ticketRouter.patch('/status', isAdmin, ticketController.checkTicketStatus);


export default ticketRouter;