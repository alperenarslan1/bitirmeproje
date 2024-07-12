const express = require("express");
const router = express.Router();
const Auth = require("./Auth");
const User = require("./user");
const Scores = require("./scores");

router.use("/auth", Auth);
router.use("/user", User);
router.use("/scores", Scores);

module.exports = router;
