const { param, body, validationResult } = require("express-validator");
const { escape } = require("../db/mysql/db");

module.exports = {
    addEventValidation:[
        body('title')
        .trim()
        .escape()
        .not().isEmpty().withMessage('Name is required')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters long')//<========= naudoti jei reikia
    ]
}