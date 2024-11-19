import express from "express";
import { cloudinaryController, uploadMiddleware } from "../controller/cloudinaryController";
//import { isAuthenticated } from "../../middlewares";

const cloudinaryRouter = express.Router();

/**
 * @swagger
 * /image/upload:
 *   post:
 *     summary: Subir imagen a Cloudinary
 *     tags: [Cloudinary]
 *     description: Permite subir una imagen a Cloudinary y devuelve la URL de la imagen cargada.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen a cargar.
 *     responses:
 *       200:
 *         description: Imagen cargada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL de la imagen cargada en Cloudinary.
 *                   example: https://res.cloudinary.com/demo/image/upload/v1633021125/sample.jpg
 *       400:
 *         description: Solicitud inválida (archivo no proporcionado o formato incorrecto)
 *       500:
 *         description: Error al subir la imagen a Cloudinary.
 */
cloudinaryRouter.post('/upload', uploadMiddleware, cloudinaryController.uploadImage);

export default cloudinaryRouter;