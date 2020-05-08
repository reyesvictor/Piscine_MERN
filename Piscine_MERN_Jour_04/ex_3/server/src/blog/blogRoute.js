const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { register } = require("./blogController");
const { login } = require("./blogController");
const { blogRegisterValidator, blogLoginValidator } = require("./blogValidator");
const { runValidation } = require("../validation");

router
  .get("/", (req, res) => {
    res.json({
      data: "You hit the Blog GET endpoint !",
    });
  })
//   .post("/register", blogRegisterValidator, runValidation, register);

// router.post("/login", blogLoginValidator, runValidation, login);

module.exports = router;
