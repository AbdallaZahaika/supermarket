const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const auth = require("../middleware/auth");
const { UserModel } = require("../models/user");

const FOLDERPATH = "public/items/";
const SIZE = 5 * 1024 * 1024;

router.post("/", auth, (req, res) => {
  if (req.userToken.admin === false) {
    return res.status(400).json({ errors: "you are not admin!" });
  }
  const myFile = req.files.image;
  const extensionName = path.extname(myFile.name);
  if (!myFile) {
    return res.status(400).json({ errors: "you must send file!" });
  }

  if (!fs.existsSync(FOLDERPATH)) {
    fs.mkdirSync(FOLDERPATH);
  } else if (myFile.size >= SIZE) {
    return res.status(400).json({
      errors: `Error, file zise is too big the maximum size ${SIZE}mb`,
    });
  } else if (
    extensionName !== ".png" &&
    extensionName !== ".jpg" &&
    extensionName !== ".JPG" &&
    extensionName !== ".jpeg" &&
    extensionName !== ".gif" &&
    extensionName !== ".psd" &&
    extensionName !== ".jfif"
  ) {
    return res
      .status(400)
      .json({ errors: "only .png .jpg .jpeg .gif .psd .jfif" });
  }
  const name = myFile.name.split(".");
  const newName = name[0].replace(/\s+/g, "") + "-" + Date.now();
  const IMAGE_PATH = FOLDERPATH + newName + extensionName;

  myFile.mv(IMAGE_PATH, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json({ file: { path: "/" + IMAGE_PATH } });
  });
});

router.put("/", auth, async (req, res) => {
  if (req.userToken.admin === false) {
    return res.status(400).json({ errors: "you are not admin!" });
  }
  const path = req.body.image.file.path;
  const checkUser = await UserModel.findOne({
    _id: req.userToken._id,
    admin: true,
  });

  if (checkUser) {
    fs.unlink(`${__dirname}/..${path}`, (err) => {
      if (err) {
        return res.json({ error: err.message });
      } else {
        return res.send("deleted ");
      }
    });
  } else {
    res.json({ errors: "you are not admin  don't try again" });
  }
});
module.exports = router;
