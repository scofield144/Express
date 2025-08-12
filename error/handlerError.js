const express = require("express");
const path = require("path");
const router = express.Router();

router.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attended to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello world!");
  }
);

router.get("/*(.html)?", (req, res) => {
  res.status(404).sendFile(path.join(__dirname,'..',"public", "404.html"));
  console.log("404 Not Found");
});


module.exports = router;
