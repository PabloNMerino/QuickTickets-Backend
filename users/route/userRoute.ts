import express, { Request, Response } from "express";
import { userController } from "../controller/userController";
import { isAuthenticated, isAdmin } from "../../middlewares";

const usersRouter = express.Router();

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Actualizar información de un usuario
 *     tags: [User] 
 *     security:
 *       - bearerAuth: []
 *     description: Actualiza la información del usuario. Requiere autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *                 example: Pablo
 *               last_name:
 *                 type: string
 *                 description: Nuevo apellido del usuario
 *                 example: Merino
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario
 *                 example: pablonicolas@hotmail.com
 *               password:
 *                 type: string
 *                 description: Nueva clave de autenticacion de usuario
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Información del usuario actualizada exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
usersRouter.put("/update", isAuthenticated, userController.updateUser);

/**
 * @swagger
 * /user/delete:
 *   patch:
 *     summary: Eliminar un usuario (soft delete)
 *     tags: [User] 
 *     security:
 *       - bearerAuth: []
 *     description: Marca a un usuario como eliminado cambiando su estado a inactivo.
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
usersRouter.patch("/delete", isAuthenticated, userController.softDeleteUser);

/**
 * @swagger
 * /user/information:
 *   get:
 *     summary: Obtener información de un usuario
 *     tags: [User] 
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve la información del usuario especificado por el ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario cuya información se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID del usuario
 *                   example: 12345
 *                 first_name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: Pablo
 *                 last_name:
 *                   type: string
 *                   description: Apellido del usuario
 *                   example: Merino
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: pablonicolas@hotmail.com
 *                 role:
 *                   type: string
 *                   description: Rol del usuario
 *                   example: admin
 *       500:
 *         description: Internal Server Error
 */
usersRouter.get("/information", isAuthenticated, userController.getUserInformation);

usersRouter.get("/information-by-email", userController.getUserInformationByEmail);

/**
 * @swagger
 * /user/full-delete/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [User] 
 *     security:
 *       - bearerAuth: []
 *     description: Elimina un usuario permanentemente de la base de datos.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       403:
 *         description: Cannot delete admin user
 *       404:
 *         description: Usuario no encontrado
 */
usersRouter.delete("/full-delete/:id", isAdmin, userController.fullDeleteUser);

/**
 * @swagger
 * /user/update-password:
 *   patch:
 *     summary: Actualizar contraseña de usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Permite a un usuario autenticado actualizar su contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual del usuario.
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *                 example: newPassword456
 *               repeatedNewPassword:
 *                 type: string
 *                 description: Nueva contraseña repetida del usuario.
 *                 example: newPassword456
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Solicitud inválida (contraseñas nuevas diferentes)
 *       500:
 *         description: Error al actualizar la contraseña.
 */
usersRouter.patch("/update-password", isAuthenticated, userController.updatePassword);

usersRouter.get('/all-customers', isAdmin, userController.getAllCustomers)

export default usersRouter;