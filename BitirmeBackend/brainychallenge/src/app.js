const express = require("express");
require("dotenv").config();
const app = express();
const port = 5001;
const mongoose = require("mongoose");
const routerIndex = require("./routers/index");
const morgan = require("morgan");
const cors = require("cors");

mongoose.set("strictQuery", true);
mongoose.connect(
   "mongodb+srv://alperenmarley2:alperen1905aA.@brainychallenge.04vqg6i.mongodb.net/BitirmeProjesi"
);

app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use("/", routerIndex);

app.listen(port, () => {
   console.log(`Server ${port} portunda başlatıldı.`);
});
