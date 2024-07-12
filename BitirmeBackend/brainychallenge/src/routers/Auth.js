const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretToken =
   "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjU1MjMyMywiaWF0IjoxNzE2NTUyMzIzfQ.8CD63jjD9_tX-0CtQ8bapI8u3AXkv7jzKriHe";

const AuthModel = require("../models/AuthModel");

router.post("/register", (req, res) => {
   const { userName, email, password } = req.body;

   if (!userName || !email || !password) {
      return res
         .status(422)
         .json({ error: "Lütfen tüm alanları doldurunuz.", reqBody: req.body });
   }
   AuthModel.findOne({ email: email })
      .then((savedUser) => {
         if (savedUser) {
            return res.status(422).json({ error: "Bu eposta adresi zaten kayıtlı." });
         }
         bcrypt.hash(password, 12).then((hashedpassword) => {
            const user = new AuthModel({
               userName: userName,
               email: email,
               password: hashedpassword,
            });
            user
               .save()
               .then((user) => {
                  res.json({ message: "Kayıt oluşturuldu." });
               })
               .catch((error) => {
                  console.log(error);
               });
         });
      })
      .catch((err) => {
         console.log(err);
      });
});

router.post("/login", (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(422).json({ error: "Lütfen email ve şifreyi giriniz." });
   }
   AuthModel.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
         return res.status(422).json({ error: "Geçersiz email/şifre" });
      }
      bcrypt
         .compare(password, savedUser.password)
         .then((doMatch) => {
            if (doMatch) {
               const token = jwt.sign({ _id: savedUser._id }, secretToken, {
                  expiresIn: "1h",
               });

               const { _id, userName, email, password } = savedUser;
               res.json({ token: token, user: { _id, userName, email, password } });
            } else {
               return res.status(422).json({ error: "Geçersiz email/şifre" });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   });
});

module.exports = router;
