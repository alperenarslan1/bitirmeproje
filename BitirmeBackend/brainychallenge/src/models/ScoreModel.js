const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      game: {
         type: String,
         required: true,
      },
      score: {
         type: Number,
         required: true,
      },
      date: {
         type: Date,
         default: Date.now,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Scores", ScoreSchema);
