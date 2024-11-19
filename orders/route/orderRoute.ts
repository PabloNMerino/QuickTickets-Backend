import express from "express";
import { orderController } from "../controller/orderController";
import { isAuthenticated } from "../../middlewares";

const orderRouter = express.Router();

/**
 * @swagger
 * /order/sucess:
 *   post:
 *     summary: Crear una orden y generar tickets
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     description: Crea una orden para un evento y genera los tickets correspondientes con base en la cantidad solicitada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: Identificador único del evento.
 *                 example: 5f8d04b8a1b2c3d4e5f6g7h8
 *               quantity:
 *                 type: integer
 *                 description: Cantidad de tickets a generar.
 *                 example: 3
 *     responses:
 *       201:
 *         description: Orden y tickets creados exitosamente
 *       400:
 *         description: Solicitud inválida (parámetros ausentes o incorrectos)
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al crear la orden o los tickets.
 */
orderRouter.post('/success', isAuthenticated, orderController.newOrder);

export default orderRouter;