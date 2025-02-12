const express = require("express");

const authControllers = require("../controllers/authController");
const protectRoute=require("../Middlewares/protectRoute.js")

const router = express.Router();

router.get("/me", protectRoute, authControllers.getMe);

router.post("/signup", authControllers.signup);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

module.exports = router;