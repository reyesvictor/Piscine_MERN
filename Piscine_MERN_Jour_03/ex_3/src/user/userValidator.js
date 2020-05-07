const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("login").not().isEmpty().withMessage("Login is required."),
  check("login").isLength({min:5, max:20}).withMessage("Login between 5 and 20 letters is accepted."),
  check("email").not().isEmpty().withMessage("Email is required."),
  check("email").isEmail().withMessage("A correct email is required."),
  check("password").not().isEmpty().withMessage("Password is required."),
  check("confirmationPassword").not().isEmpty().withMessage("ConfirmationPassword is required."),
];
