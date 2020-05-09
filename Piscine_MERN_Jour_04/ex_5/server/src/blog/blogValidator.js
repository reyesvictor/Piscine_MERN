const { check } = require("express-validator");

exports.blogCreateValidator = [
  check("title").not().isEmpty().withMessage("Title is required."),
  check("title").isLength({ min: 5, max: 50 }).withMessage("Title between 5 and 50 letters is accepted."),
  check("content").not().isEmpty().withMessage("Content is required."),
];


exports.blogDeleteValidator = [
  check("email").not().isEmpty().withMessage("Email is required."),
  check("email").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "i").withMessage("A correct email is required."),
  check("password").not().isEmpty().withMessage("Password is required."),
];
