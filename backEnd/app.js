const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const mongodb = require("./db/mongoConnect");
const { secret } = require("./config/secret");
const { fileUploadAccess, routersInit } = require("./routes/app_routers");
app.use(
  cors({
    origin: secret.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

fileUploadAccess(app);

routersInit(app);

const port = process.env.PORT || 3004;

http.listen(port, () => console.log(`Listening on port ${port}...`));
