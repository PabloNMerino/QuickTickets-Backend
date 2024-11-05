const { body } = require("express-validator");

export const categoryValidation = [
    body('name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('category name must be at least 3 characters long'),
    body('description')
        .isString()
        .isLength({ min: 3 })
        .withMessage('category description must be at least 3 characters long') ,
    body('imageUrl')
        .isString()
        .isLength({ min: 20 })
        .withMessage('image url must be at least 20 characters long')];