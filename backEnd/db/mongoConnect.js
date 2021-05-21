const mongoose = require("mongoose");
const { secret } = require("../config/secret");

mongoose.connect(
  `mongodb+srv://${secret.userNmaeDb}:${secret.mongoPassword}@cluster0.kcyvk.mongodb.net/shop`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongo connected");
});

module.exports = db;
