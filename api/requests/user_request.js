const { param, body, validationResult } = require("express-validator");
const { escape } = require("../db/mysql/db");

module.exports = {
    registerValidation: [
        body('username')
        .trim()
        .escape()
        .not().isEmpty().withMessage('Name is required')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),//<========= naudoti jei reikia
        body("email")
        .trim()
        .escape()
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
        body("password")
        .trim()
        .escape()
        .not().isEmpty().withMessage('Password is required')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        body("confirm_password")
        .trim()
        .escape()
        .not().isEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            return value === req.body.password;
          }).withMessage("Passwords don't match"),
    ],
    updateValidation: [
        body('username')
        .trim()
        .escape()
        .optional({ checkFalsy: true })
        .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),//<========= naudoti jei reikia
        body("email")
        .trim()
        .escape()
        .optional({ checkFalsy: true })
        .isEmail().withMessage('Email must be valid'),
        body("role")
        .trim()
        .escape()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Role must be a number')
    ], 
    updatePasswordValidation: [
        body("password")
        .trim()
        .escape()
        .not().isEmpty().withMessage('Password is required')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        body("confirm_password")
        .trim()
        .escape()
        .not().isEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage("Passwords don't match"),
    ]
}