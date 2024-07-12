const express = require("express");
const router = express.Router();
const RequireLogin = require("../middleware/RequireLogin");
const { getUserProfile } = require("../controllers/userController");
const { updateUserProfile } = require("../controllers/userController");

router.get("/profile/:userId", RequireLogin, getUserProfile);

router.put("/profile/:userId", RequireLogin, updateUserProfile);

module.exports = router;
