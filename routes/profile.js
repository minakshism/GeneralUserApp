const express = require("express");
const router = express.Router();
const {postProfile} = require("../controller/profileController");
const {ValidatToken} = require("../middleware/validateToken");
var upload = require("../middleware/uploader");

router.post('/profile',ValidatToken,upload.single('avatar'), postProfile);

module.exports = router