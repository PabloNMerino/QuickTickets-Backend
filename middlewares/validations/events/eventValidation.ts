const { body } = require("express-validator");

export const eventValidation = [
    body('name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('event name must be at least 3 characters long'),
    body('description')
        .isString()
        .isLength({ min: 3 })
        .withMessage('event description must be at least 3 characters long') ,
    body('imageUrl')
        .isString()
        .isLength({ min: 20 })
        .withMessage('event image url must be at least 20 characters long'),
    body('price')
        .isInt()
        .isLength({ min: 1 })
        .withMessage('price must be type number'),
    body('capacity')
        .isInt()
        .isLength({ min: 1 })
        .withMessage('capacity must be type number'),
    body('location')
        .isString()
        .isLength({ min: 3 })
        .withMessage('location must be at least 3 characters long'),
    body('latitude')
        .isFloat()
        .isLength({ min: 1 })
        .withMessage('latitude must be type number'),
    body('longitude')
        .isFloat()
        .isLength({ min: 1 })
        .withMessage('longitude must be type number'),
];