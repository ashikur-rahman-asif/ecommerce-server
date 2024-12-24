const express = require("express");
const { register } = require("../controllers/registerController");
const { login } = require("../controllers/loginController");

const router = express.Router();

router.post("/register", register);
router.get("/login", login);

module.exports = router;
