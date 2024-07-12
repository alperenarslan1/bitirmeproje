const Score = require("../models/ScoreModel");

exports.saveUserScore = async (req, res) => {
   const { game, score } = req.body;
   const userId = req.user._id;

   try {
      const existingScore = await Score.findOne({ user: userId, game: game });

      if (existingScore) {
         existingScore.score = score;
         await existingScore.save();
         return res.json({ message: "Score başarıyla güncellendi." });
      } else {
         const newScore = new Score({
            user: userId,
            game,
            score,
         });
         await newScore.save();
         return res.json({ message: "Score başarıyla kaydedildi" });
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server hatası" });
   }
};

exports.getUserScores = async (req, res) => {
   const userId = req.params.userId;

   try {
      const userScores = await Score.find({ user: userId });
      res.json(userScores);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server hatası" });
   }
};
exports.getLeaderboard = async (req, res) => {
   const { game } = req.params;
   const page = parseInt(req.query.page) || 1; // Sayfa numarasını al, eğer belirtilmemişse varsayılan olarak 1 kullan

   try {
      const perPage = 10; // Her sayfada gösterilecek rekor sayısı
      const totalScores = await Score.countDocuments({ game }); // Toplam rekor sayısını al
      const totalPages = Math.ceil(totalScores / perPage); // Toplam sayfa sayısını hesapla

      let scoresQuery = Score.find({ game }).populate("user", "userName");

      if (game === "reaction") {
         // Sadece reaksiyon testi için skorları küçükten büyüğe sırala
         scoresQuery = scoresQuery.sort({ score: 1 });
      } else {
         // Diğer oyunlar için skorları büyükten küçüğe sırala
         scoresQuery = scoresQuery.sort({ score: -1 });
      }

      const scores = await scoresQuery
         .skip((page - 1) * perPage) // İlgili sayfaya uygun kayıtları atla
         .limit(perPage); // Her sayfada belirtilen sayıda kayıt al

      res.json({ scores, totalPages });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server hatası" });
   }
};
