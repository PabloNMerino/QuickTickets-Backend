const { body } = require("express-validator");

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('email syntax is invalid'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long')
];

export const registerValidation = [
    body('first_name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('first_name must be at least 3 characters long'),
    body('last_name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('last_name must be at least 3 characters long') ,
    body('email')
        .isEmail()
        .withMessage('email sintaxis is invalid'),
    body('phone')
        .isInt()
        .isLength({ min: 8 })
        .withMessage('phone number must be at least 8 characters'),
    body('password')
        .isString()
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long')
]