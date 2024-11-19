import express from "express";
import { paymentController } from "../controller/paymentController";
import { isAuthenticated } from "../../middlewares";

const paymentRouter = express.Router();

/**
 * @swagger
 * /pay:
 *   post:
 *     summary: Comprar tickets para un evento
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     description: Permite a un usuario comprar tickets para un evento especificado.
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
 *                 description: Cantidad de tickets a comprar.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Compra realizada exitosamente
 *       400:
 *         description: Solicitud inválida (parámetros ausentes o incorrectos)
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al procesar la compra.
 */
paymentRouter.post('', isAuthenticated, paymentController.proceedPayment);

export default paymentRouter;