const express = require("express");
const router = express();

const profile = require("./profile");
const userSignup = require("./userSignup");

router.use('/user', userSignup);

router.use('/user', profile);

module.exports = router;


