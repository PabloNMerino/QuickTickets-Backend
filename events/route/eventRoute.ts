import express from "express";
import { eventController } from "../controller/eventController";
import { isAuthenticated, isAdmin } from "../../middlewares";
import { eventValidation } from "../../middlewares/validations/events/eventValidation"

const eventRouter = express.Router();

/**
 * @swagger
 * /event/all-paused-events:
 *   get:
 *     summary: Obtener eventos pausados
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista de todos los eventos que están pausados.
 *     responses:
 *       200:
 *         description: Lista de eventos pausados obtenida exitosamente
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
 *       404:
 *         description: No se encontraron eventos pausados
 *       500:
 *         description: Error al obtener los eventos pausados.
 */
eventRouter.get("/all-paused-events", isAdmin, eventController.getAllPausedEvents);

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
eventRouter.post('', eventValidation, isAuthenticated, eventController.createEvent);

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
eventRouter.put('/:id', eventValidation, isAuthenticated, eventController.updateEvent);

/**
 * @swagger
 * /event/toggle-status:
 *   patch:
 *     summary: Activar o pausar un evento
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Cambia el estado de un evento entre activo y pausado.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único del evento.
 *         example: 5f8d04b8a1b2c3d4e5f6g7h8
 *     responses:
 *       200:
 *         description: Estado del evento actualizado exitosamente
 *       400:
 *         description: Solicitud inválida (ID de evento no proporcionado o formato incorrecto)
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al actualizar el estado del evento.
 */
eventRouter.patch("/toggle-status", isAdmin, eventController.toggleEventStatus);



export default eventRouter;