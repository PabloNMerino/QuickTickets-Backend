import express from "express";
import { categoryController } from "../controller/categoryController";
import { isAdmin } from "../../middlewares";

const categoryRouter = express.Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Category]
 *     description: Crea una nueva categoría proporcionando un nombre y una descripción.
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
 *                 description: Nombre de la categoría.
 *                 example: Recitales
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría.
 *                 example: de musica clasica
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *       500:
 *         description: Internal server error
 */
categoryRouter.post('', isAdmin, categoryController.createCategory)

/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Category]
 *     description: Devuelve una lista de todas las categorías disponibles.
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *       500:
 *         description: Internal server error
 */
categoryRouter.get('/all', categoryController.getAllCategories)

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Category]
 *     description: Elimina una categoría especificada por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error en el servidor
 */
categoryRouter.delete('/:id', isAdmin, categoryController.deleteCategory)

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     description: Devuelve los detalles de una categoría específica proporcionada su ID.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a obtener.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Categoría obtenida exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error en el servidor
 */
categoryRouter.get('/:id', categoryController.getCategory)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     description: Permite actualizar el nombre y la descripción de una categoría específica.
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar.
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la categoría
 *                 example: "Electrodomésticos"
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la categoría
 *                 example: "Productos de línea blanca y electrodomésticos del hogar"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error en el servidor
 */
categoryRouter.put('/:id', isAdmin, categoryController.updateCategory)

export default categoryRouter;