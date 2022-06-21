const authController = require("../app/controllers/authentication.controller");
const { dummyMiddleware } = require("./helpers");

const router = require("express").Router();

// /auth/login
router.post("/login", authController.login);

// router.post("/signup", dummyMiddleware("singup user"));

module.exports = router;
