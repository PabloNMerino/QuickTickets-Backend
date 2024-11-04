import express from "express";
import { eventController } from "../controller/eventController";
import { isAuthenticated } from "../../middlewares";

const eventRouter = express.Router();
const { body } = require("express-validator");
/**
 * @swagger
 * /event/all:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Event]
 *     description: Devuelve una lista de todos los eventos disponibles.
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único del evento
 *                     example: "5f9f1b9f9c9d9c9d9c9d9c9d"
 *                   name:
 *                     type: string
 *                     description: Nombre del evento
 *                     example: "Iron Maiden"
 *                   description:
 *                     type: string
 *                     description: Descripción del evento
 *                     example: "Su regreso tan esperado"
 *                   imageUrl:
 *                     type: string
 *                     description: URL de la imagen del evento
 *                     example: "www.imagenDeMaiden.com"
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento
 *                     example: "2024-12-10T23:30"
 *                   price:
 *                     type: number
 *                     description: Precio del evento
 *                     example: 150000
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad máxima de asistentes al evento
 *                     example: 100000
 *                   category:
 *                     type: string
 *                     description: ID de la categoría del evento
 *                     example: "671fea9e39cc09a5a207b907"
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento
 *                     example: "Corrientes"
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud del evento
 *                     example: -27.46784
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud del evento
 *                     example: -58.8344
 *                   creatorId:
 *                     type: string
 *                     description: ID del creador del evento
 *                     example: "671fe9661b8f8d3bf35776cc"
 *       500:
 *         description: Error en el servidor
 */
eventRouter.get('/all', eventController.getAllEvents);


/**
 * @swagger
 * /event:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Event]
 *     description: Crea un nuevo evento con los detalles proporcionados.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del evento
 *                 example: "Iron Maiden"
 *               description:
 *                 type: string
 *                 description: Descripción del evento
 *                 example: "Su regreso tan esperado"
 *               imageUrl:
 *                 type: string
 *                 description: URL de la imagen del evento
 *                 example: "www.imagenDeMaiden.com"
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del evento
 *                 example: "2024-12-10T23:30"
 *               price:
 *                 type: number
 *                 description: Precio del evento
 *                 example: 150000
 *               capacity:
 *                 type: integer
 *                 description: Capacidad máxima de asistentes al evento
 *                 example: 100000
 *               category:
 *                 type: string
 *                 description: ID de la categoría del evento
 *                 example: "671fea9e39cc09a5a207b907"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento
 *                 example: "Corrientes"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitud del evento
 *                 example: -27.46784
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitud del evento
 *                 example: -58.8344
 *               creatorId:
 *                 type: string
 *                 description: ID del creador del evento
 *                 example: "671fe9661b8f8d3bf35776cc"
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error en el servidor
 */
eventRouter.post('',[body('name').isString().isLength({ min: 3 }).withMessage('event name must be at least 3 characters long'),
                    body('description').isString().isLength({ min: 3 }).withMessage('event description must be at least 3 characters long') ,
                    body('imageUrL').isString().isLength({ min: 20 }).withMessage('event image url must be at least 20 characters long'),
                    body('price').isInt().isLength({ min: 1 }).withMessage('price must be type number'),
                    body('capacity').isInt().isLength({ min: 1 }).withMessage('capacity must be type number'),
                    body('location').isString().isLength({ min: 3 }).withMessage('location must be at least 3 characters long'),
                    body('latitude').isInt().isLength({ min: 1 }).withMessage('latitude must be type number'),
                    body('longitude').isInt().isLength({ min: 1 }).withMessage('longitude must be type number'),
                ], isAuthenticated, eventController.createEvent);

/**
 * @swagger
 * /event/own-events:
 *   get:
 *     summary: Obtener eventos por ID del creador
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Recupera todos los eventos asociados a un creador específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         description: ID del creador cuyas eventos se desean recuperar
 *         schema:
 *           type: string
 *           example: "671fe9661b8f8d3bf35776cc"
 *     responses:
 *       200:
 *         description: Lista de eventos recuperados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del evento
 *                     example: "5f9f1b9f9c9d9c9d9c9d9c9d"
 *                   name:
 *                     type: string
 *                     description: Nombre del evento
 *                     example: "Iron Maiden"
 *                   description:
 *                     type: string
 *                     description: Descripción del evento
 *                     example: "Su regreso tan esperado"
 *                   imageUrl:
 *                     type: string
 *                     description: URL de la imagen del evento
 *                     example: "www.imagenDeMaiden.com"
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento
 *                     example: "2024-12-10T23:30"
 *                   price:
 *                     type: number
 *                     description: Precio del evento
 *                     example: 150000
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad máxima de asistentes al evento
 *                     example: 100000
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento
 *                     example: "Corrientes"
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud del evento
 *                     example: -27.46784
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud del evento
 *                     example: -58.8344
 *                   creatorId:
 *                     type: string
 *                     description: ID del creador del evento
 *                     example: "671fe9661b8f8d3bf35776cc"
 *       500:
 *         description: Error en el servidor
 */
eventRouter.get('/own-events', isAuthenticated, eventController.getMyPostedEvents);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Event]
 *     description: Devuelve la información de un evento específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento que se desea obtener
 *         schema:
 *           type: string
 *           example: "5f9f1b9f9c9d9c9d9c9d9c9d"
 *     responses:
 *       200:
 *         description: Evento encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único del evento
 *                   example: "5f9f1b9f9c9d9c9d9c9d9c9d"
 *                 name:
 *                   type: string
 *                   description: Nombre del evento
 *                   example: "Iron Maiden"
 *                 description:
 *                   type: string
 *                   description: Descripción del evento
 *                   example: "Su regreso tan esperado"
 *                 imageUrl:
 *                   type: string
 *                   description: URL de la imagen del evento
 *                   example: "www.imagenDeMaiden.com"
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora del evento
 *                   example: "2024-12-10T23:30"
 *                 price:
 *                   type: number
 *                   description: Precio del evento
 *                   example: 150000
 *                 capacity:
 *                   type: integer
 *                   description: Capacidad máxima de asistentes al evento
 *                   example: 100000
 *                 category:
 *                   type: string
 *                   description: ID de la categoría del evento
 *                   example: "671fea9e39cc09a5a207b907"
 *                 location:
 *                   type: string
 *                   description: Ubicación del evento
 *                   example: "Corrientes"
 *                 latitude:
 *                   type: number
 *                   format: float
 *                   description: Latitud del evento
 *                   example: -27.46784
 *                 longitude:
 *                   type: number
 *                   format: float
 *                   description: Longitud del evento
 *                   example: -58.8344
 *                 creatorId:
 *                   type: string
 *                   description: ID del creador del evento
 *                   example: "671fe9661b8f8d3bf35776cc"
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error en el servidor
 */
eventRouter.get('/:id', eventController.getEventById);


/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Elimina un evento específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento que se desea eliminar
 *         schema:
 *           type: string
 *           example: "5f9f1b9f9c9d9c9d9c9d9c9d"
 *     responses:
 *       204:
 *         description: Evento eliminado exitosamente
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error en el servidor
 */
eventRouter.delete('/:id', isAuthenticated, eventController.deleteEvent);


/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Actualizar un evento por ID
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Actualiza la información de un evento específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento que se desea actualizar
 *         schema:
 *           type: string
 *           example: "5f9f1b9f9c9d9c9d9c9d9c9d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del evento
 *                 example: "Iron Maiden"
 *               description:
 *                 type: string
 *                 description: Descripción del evento
 *                 example: "Su regreso tan esperado"
 *               imageUrl:
 *                 type: string
 *                 description: URL de la imagen del evento
 *                 example: "www.imagenDeMaiden.com"
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del evento
 *                 example: "2024-12-10T23:30"
 *               price:
 *                 type: number
 *                 description: Precio del evento
 *                 example: 150000
 *               capacity:
 *                 type: integer
 *                 description: Capacidad máxima de asistentes al evento
 *                 example: 100000
 *               category:
 *                 type: string
 *                 description: ID de la categoría del evento
 *                 example: "671fea9e39cc09a5a207b907"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento
 *                 example: "Corrientes"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitud del evento
 *                 example: -27.46784
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitud del evento
 *                 example: -58.8344
 *               creatorId:
 *                 type: string
 *                 description: ID del creador del evento
 *                 example: "671fe9661b8f8d3bf35776cc"
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error en el servidor
 */
eventRouter.put('/:id',[body('name').isString().isLength({ min: 3 }).withMessage('event name must be at least 3 characters long'),
                        body('description').isString().isLength({ min: 3 }).withMessage('event description must be at least 3 characters long') ,
                        body('imageUrL').isString().isLength({ min: 20 }).withMessage('event image url must be at least 20 characters long'),
                        body('price').isInt().isLength({ min: 1 }).withMessage('price must be type number'),
                        body('capacity').isInt().isLength({ min: 1 }).withMessage('capacity must be type number'),
                        body('location').isString().isLength({ min: 3 }).withMessage('location must be at least 3 characters long'),
                        body('latitude').isInt().isLength({ min: 1 }).withMessage('latitude must be type number'),
                        body('longitude').isInt().isLength({ min: 1 }).withMessage('longitude must be type number'),
                    ], isAuthenticated, eventController.updateEvent);


export default eventRouter;