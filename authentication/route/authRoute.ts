import express from "express";
import { authController } from "../controller/authController";

const authRouter = express.Router();

const { body } = require("express-validator");
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     description: Permite a los usuarios iniciar sesión proporcionando email y password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales incorrectas
 *       404:
 *         description: User not found
 */
authRouter.post("/login", [body('email').isEmail().withMessage('email sintaxis is invalid'),
                           body('password').isString().isLength({ min: 8 }).withMessage('password must be at least 8 characters long')], authController.login);


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth] 
 *     description: Permite registrar un nuevo usuario proporcionando nombre, apellido, correo electrónico, contraseña y rol.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Pablo
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Merino
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: pablonicolas@hotmail.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: admin123
 *               role:
 *                 type: string
 *                 description: Rol del usuario (por ejemplo, admin o customer)
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */
authRouter.post("/register", [body('first_name').isString().isLength({ min: 3 }).withMessage('first_name must be at least 3 characters long'),
                              body('last_name').isString().isLength({ min: 3 }).withMessage('last_name must be at least 3 characters long') ,
                              body('email').isEmail().withMessage('email sintaxis is invalid'),
                              body('phone').isInt().isLength({ min: 8 }).withMessage('phone number must be at least 8 characters'),
                              body('password').isString().isLength({ min: 8 }).withMessage('password must be at least 8 characters long')], authController.register);

export default authRouter;