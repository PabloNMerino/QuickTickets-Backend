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
 * /event/creator-name:
 *   get:
 *     summary: Obtiene el nombre del creador del evento
 *     description: Devuelve el nombre del creador del evento especificado por el ID.
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Nombre del creador del evento devuelto correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "Juan Pérez"
 *       500:
 *         description: Error interno del servidor
 */
eventRouter.get("/creator-name", eventController.getCreatorName)
/**
 * @swagger
 * /event/free:
 *   get:
 *     summary: Obtener eventos gratuitos
 *     tags: [Event]
 *     description: Devuelve una lista de eventos cuyo precio sea igual a 0.
 *     responses:
 *       200:
 *         description: Lista de eventos gratuitos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 672272773d5248be4b5964a7
 *                   name:
 *                     type: string
 *                     description: Nombre del evento.
 *                     example: Concierto gratuito en el parque
 *                   description:
 *                     type: string
 *                     description: Descripción del evento.
 *                     example: Un evento cultural abierto a todo el público.
 *                   imageUrl:
 *                     type: string
 *                     format: url
 *                     description: URL de la imagen del evento.
 *                     example: https://example.com/event.jpg
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento.
 *                     example: 2025-06-15T18:00:00.000Z
 *                   price:
 *                     type: number
 *                     description: Precio del evento (debe ser 0).
 *                     example: 0
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad total del evento.
 *                     example: 500
 *                   category:
 *                     type: string
 *                     description: Categoría del evento.
 *                     example: Música
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento.
 *                     example: Parque Central
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación del evento.
 *                     example: 19.4326
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación del evento.
 *                     example: -99.1332
 *                   availability:
 *                     type: integer
 *                     description: Cantidad de tickets disponibles.
 *                     example: 500
 *                   is_active:
 *                     type: boolean
 *                     description: Indica si el evento está activo.
 *                     example: true
 *       404:
 *         description: No se encontraron eventos gratuitos
 *       500:
 *         description: Error al obtener los eventos gratuitos.
 */
eventRouter.get('/free', eventController.getAllFreeEvents);

/**
 * @swagger
 * /event/paid:
 *   get:
 *     summary: Obtener eventos de pago
 *     tags: [Event]
 *     description: Devuelve una lista de eventos cuyo precio es mayor a 0.
 *     responses:
 *       200:
 *         description: Lista de eventos de pago obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 672272773d5248be4b5964a7
 *                   name:
 *                     type: string
 *                     description: Nombre del evento.
 *                     example: Concierto de música clásica
 *                   description:
 *                     type: string
 *                     description: Descripción del evento.
 *                     example: Una noche inolvidable con los mejores músicos clásicos.
 *                   imageUrl:
 *                     type: string
 *                     format: url
 *                     description: URL de la imagen del evento.
 *                     example: https://example.com/event.jpg
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento.
 *                     example: 2025-06-20T20:00:00.000Z
 *                   price:
 *                     type: number
 *                     description: Precio del evento (debe ser mayor a 0).
 *                     example: 5000
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad total del evento.
 *                     example: 1000
 *                   category:
 *                     type: string
 *                     description: Categoría del evento.
 *                     example: Música
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento.
 *                     example: Auditorio Nacional
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación del evento.
 *                     example: 19.4326
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación del evento.
 *                     example: -99.1332
 *                   availability:
 *                     type: integer
 *                     description: Cantidad de tickets disponibles.
 *                     example: 800
 *                   is_active:
 *                     type: boolean
 *                     description: Indica si el evento está activo.
 *                     example: true
 *       404:
 *         description: No se encontraron eventos de pago
 *       500:
 *         description: Error al obtener los eventos de pago.
 */
eventRouter.get('/paid', eventController.getAllPaidEvents);

/**
 * @swagger
 * /event/today:
 *   get:
 *     summary: Obtener eventos que suceden hoy
 *     tags: [Event]
 *     description: Devuelve una lista de eventos cuyo `dateTime` corresponde a hoy.
 *     responses:
 *       200:
 *         description: Lista de eventos de hoy obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 672272773d5248be4b5964a7
 *                   name:
 *                     type: string
 *                     description: Nombre del evento.
 *                     example: Festival de arte
 *                   description:
 *                     type: string
 *                     description: Descripción del evento.
 *                     example: Un evento cultural para toda la familia.
 *                   imageUrl:
 *                     type: string
 *                     format: url
 *                     description: URL de la imagen del evento.
 *                     example: https://example.com/event.jpg
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento.
 *                     example: 2024-11-20T18:00:00.000Z
 *                   price:
 *                     type: number
 *                     description: Precio del evento.
 *                     example: 500
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad total del evento.
 *                     example: 1000
 *                   category:
 *                     type: string
 *                     description: Categoría del evento.
 *                     example: Arte
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento.
 *                     example: Centro de convenciones
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación del evento.
 *                     example: 19.4326
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación del evento.
 *                     example: -99.1332
 *                   availability:
 *                     type: integer
 *                     description: Cantidad de tickets disponibles.
 *                     example: 300
 *                   is_active:
 *                     type: boolean
 *                     description: Indica si el evento está activo.
 *                     example: true
 *       404:
 *         description: No se encontraron eventos para hoy
 *       500:
 *         description: Error al obtener los eventos de hoy.
 */
eventRouter.get('/today', eventController.getEventsToday);

/**
 * @swagger
 * /events/latest:
 *   get:
 *     summary: Obtener los últimos 10 eventos creados
 *     tags: [Event]
 *     description: Devuelve una lista con los últimos 10 eventos creados, ordenados de más reciente a más antiguo.
 *     responses:
 *       200:
 *         description: Lista de los últimos 10 eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 672272773d5248be4b5964a7
 *                   name:
 *                     type: string
 *                     description: Nombre del evento.
 *                     example: Concierto de jazz en vivo
 *                   description:
 *                     type: string
 *                     description: Descripción del evento.
 *                     example: Una noche mágica con los mejores músicos de jazz.
 *                   imageUrl:
 *                     type: string
 *                     format: url
 *                     description: URL de la imagen del evento.
 *                     example: https://example.com/event.jpg
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento.
 *                     example: 2025-05-10T20:00:00.000Z
 *                   price:
 *                     type: number
 *                     description: Precio del evento.
 *                     example: 2000
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad total del evento.
 *                     example: 500
 *                   category:
 *                     type: string
 *                     description: Categoría del evento.
 *                     example: Música
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento.
 *                     example: Sala de conciertos
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación del evento.
 *                     example: 40.7128
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación del evento.
 *                     example: -74.0060
 *                   availability:
 *                     type: integer
 *                     description: Cantidad de tickets disponibles.
 *                     example: 200
 *                   is_active:
 *                     type: boolean
 *                     description: Indica si el evento está activo.
 *                     example: true
 *       404:
 *         description: No se encontraron eventos
 *       500:
 *         description: Error al obtener los últimos eventos.
 */
eventRouter.get('/latest', eventController.getLastTenEvents);

/**
 * @swagger
 * /event/range:
 *   get:
 *     summary: Obtener eventos por rango de fechas
 *     tags: [Event]
 *     description: Devuelve una lista de eventos que ocurren dentro del rango de fechas especificado.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de inicio del rango.
 *         example: 2025-01-01T00:00
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de fin del rango.
 *         example: 2025-01-31T23:59
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
 *                   _id:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 672272773d5248be4b5964a7
 *                   name:
 *                     type: string
 *                     description: Nombre del evento.
 *                     example: Feria Internacional del Libro
 *                   description:
 *                     type: string
 *                     description: Descripción del evento.
 *                     example: Más de 200 editoriales y autores presentan sus obras en esta feria cultural.
 *                   imageUrl:
 *                     type: string
 *                     format: url
 *                     description: URL de la imagen del evento.
 *                     example: https://grafiasmusic.com/wp-content/uploads/2024/05/38020.webp
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento.
 *                     example: 2025-01-22T21:00:00.000Z
 *                   price:
 *                     type: number
 *                     description: Precio del evento.
 *                     example: 15000
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad total del evento.
 *                     example: 3000
 *                   category:
 *                     type: string
 *                     description: Categoría del evento.
 *                     example: Cultura
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento.
 *                     example: Guadalajara, México
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación del evento.
 *                     example: 20.6597
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación del evento.
 *                     example: -103.3496
 *                   availability:
 *                     type: integer
 *                     description: Cantidad de tickets disponibles.
 *                     example: 3000
 *                   is_active:
 *                     type: boolean
 *                     description: Indica si el evento está activo.
 *                     example: true
 *       500:
 *         description: Error al obtener los eventos.
 */
eventRouter.get('/range', eventController.getEventsByDateRange)

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

/**
 * @swagger
 * /event/category/:categoryName:
 *   get:
 *     summary: Obtener eventos filtrados por categoría
 *     tags: [Event]
 *     description: Devuelve una lista de eventos filtrados según el nombre de la categoría especificada.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la categoría por la cual filtrar los eventos.
 *         example: Cultura
 *     responses:
 *       200:
 *         description: Lista de eventos filtrados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único del evento.
 *                     example: 672272773d5248be4b5964a7
 *                   name:
 *                     type: string
 *                     description: Nombre del evento.
 *                     example: Feria Internacional del Libro
 *                   description:
 *                     type: string
 *                     description: Descripción del evento.
 *                     example: Más de 200 editoriales y autores presentan sus obras en esta feria cultural.
 *                   imageUrl:
 *                     type: string
 *                     format: url
 *                     description: URL de la imagen del evento.
 *                     example: https://grafiasmusic.com/wp-content/uploads/2024/05/38020.webp
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del evento.
 *                     example: 2025-01-22T21:00:00.000Z
 *                   price:
 *                     type: number
 *                     description: Precio del evento.
 *                     example: 15000
 *                   capacity:
 *                     type: integer
 *                     description: Capacidad total del evento.
 *                     example: 3000
 *                   category:
 *                     type: string
 *                     description: Categoría del evento.
 *                     example: Cultura
 *                   location:
 *                     type: string
 *                     description: Ubicación del evento.
 *                     example: Guadalajara, México
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación del evento.
 *                     example: 20.6597
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación del evento.
 *                     example: -103.3496
 *                   creatorId:
 *                     type: string
 *                     description: Identificador del creador del evento.
 *                     example: 671fe9661b8f8d3bf35776cc
 *                   availability:
 *                     type: integer
 *                     description: Cantidad de tickets disponibles.
 *                     example: 3000
 *                   is_active:
 *                     type: boolean
 *                     description: Indica si el evento está activo.
 *                     example: true
 *       500:
 *         description: Error al obtener los eventos.
 */
eventRouter.get('/category/:categoryName', eventController.getEventsByCategoryName);



export default eventRouter;