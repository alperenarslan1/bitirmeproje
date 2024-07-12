const express = require("express");
const router = express.Router();
const RequireLogin = require("../middleware/RequireLogin");
const { saveUserScore, getUserScores } = require("../controllers/scoreController");
const { getLeaderboard } = require("../controllers/scoreController");

router.post("/save", RequireLogin, saveUserScore);
router.get("/:userId", RequireLogin, getUserScores);

router.get("/leaderboard/:game", getLeaderboard);

module.exports = router;
