const jwt = require("jsonwebtoken");
const AuthModel = require("../models/AuthModel");
const SECRET_KEY =
   "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjU1MjMyMywiaWF0IjoxNzE2NTUyMzIzfQ.8CD63jjD9_tX-0CtQ8bapI8u3AXkv7jzKriHe";

module.exports = (req, res, next) => {
   const { authorization } = req.headers;
   if (!authorization) {
      return res.status(401).json({ error: "Giriş yapmalısınız." });
   }
   const token = authorization.replace("Bearer ", "");
   jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
         return res.status(401).json({ error: "Giriş yapmalısınız." });
      }
      const { _id } = payload;
      AuthModel.findById(_id).then((userdata) => {
         req.user = userdata;
         next();
      });
   });
};
