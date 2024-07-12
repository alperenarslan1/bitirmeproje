const User = require("../models/AuthModel");
const bcrypt = require("bcryptjs");

exports.getUserProfile = async (req, res) => {
   try {
      const user = await User.findById(req.params.userId).select("-password");
      if (!user) {
         return res.status(404).json({ error: "Kullanıcı bulunamadı." });
      }
      res.json(user);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server hatası" });
   }
};

exports.updateUserProfile = async (req, res) => {
   const { userId } = req.params;
   const { newUsername, newEmail, oldPassword, newPassword } = req.body;

   try {
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }

      if (newPassword) {
         if (!oldPassword) {
            return res.status(400).json({ message: "eski şifre gerekli" });
         }
         const isMatch = await user.comparePassword(oldPassword);
         if (!isMatch) {
            return res.status(400).json({ message: "Eski şifre hatalı" });
         }
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(newPassword, salt);
      }

      if (newUsername) user.firstName = newUsername;
      if (newEmail) user.email = newEmail;

      await user.save();
      res.json({ message: "Profil başarıyla güncellendi" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server hatası" });
   }
};
