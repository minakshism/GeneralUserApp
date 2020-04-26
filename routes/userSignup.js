const express = require("express");
const router = express.Router();
const {registerController, LoginController, verfyTokenController} = require("../controller/authController");

router.post('/signup', registerController);
router.post('/verifyToken', verfyTokenController);
router.post('/login', LoginController);
module.exports = router;