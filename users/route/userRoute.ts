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

usersRouter.patch('/subscription', isAuthenticated, userController.toggleUserSubscription);

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

/**
 * @swagger
 * /user/all-customers:
 *   get:
 *     summary: Obtener todos los clientes tipo "customers"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista de todos los clientes con tipo "customers".
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identificador único del cliente.
 *                     example: 63f1b8e4f1a7c2d1e3b4567c
 *                   first_name:
 *                     type: string
 *                     description: Nombre del cliente.
 *                     example: Juan
 *                   last_name:
 *                     type: string
 *                     description: Apellido del cliente.
 *                     example: Pérez
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del cliente.
 *                     example: juan.perez@example.com
 *                   phone:
 *                     type: string
 *                     description: Teléfono del cliente.
 *                     example: +541112345678
 *                   role:
 *                     type: string
 *                     description: Tipo de cliente.
 *                     example: customer
 *                   is_active:
 *                     type: boolean
 *                     description: cliente activo o pausado.
 *                     example: true
 *       401:
 *         description: No autorizado (falta token o es inválido)
 *       500:
 *         description: Error al obtener la lista de clientes.
 */
usersRouter.get('/all-customers', isAdmin, userController.getAllCustomers)

/**
 * @swagger
 * /user/toggle-status:
 *   patch:
 *     summary: Alternar el estado de un usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     description: Cambia el estado de un usuario (activo o inactivo) basado en su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Identificador único del usuario.
 *                 example: 63f1b8e4f1a7c2d1e3b4567c
 *     responses:
 *       200:
 *         description: Estado del usuario actualizado exitosamente
 *       400:
 *         description: Solicitud inválida (ID de usuario no proporcionado o inválido)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el estado del usuario.
 */
usersRouter.patch('/toggle-status', isAdmin, userController.toggleUserStatus)

/**
 * @swagger
 * /user/send-forgot-password-email:
 *   post:
 *     summary: Enviar email para recuperar contraseña
 *     tags: [User]
 *     description: Envía un email con instrucciones para recuperar la contraseña a la dirección proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario que solicita la recuperación de contraseña.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email enviado exitosamente
 *       400:
 *         description: Solicitud inválida (correo no proporcionado o con formato incorrecto)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al enviar el email.
 */
usersRouter.post('/send-forgot-password-email', userController.sendForgotPasswordEmail)

/**
 * @swagger
 * /user/new-password:
 *   patch:
 *     summary: Restablecer contraseña
 *     tags: [User]
 *     description: Permite restablecer la contraseña del usuario utilizando un token de recuperación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña deseada.
 *                 example: newPassword123
 *               newPasswordRepeated:
 *                 type: string
 *                 description: Repetición de la nueva contraseña para verificación.
 *                 example: newPassword123
 *               token:
 *                 type: string
 *                 description: Token de recuperación enviado al email del usuario.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       400:
 *         description: Solicitud inválida (contraseñas no coinciden o token inválido)
 *       401:
 *         description: Token de recuperación no autorizado o expirado
 *       500:
 *         description: Error al restablecer la contraseña.
 */
usersRouter.patch('/new-password', userController.generateNewPassword)

export default usersRouter;