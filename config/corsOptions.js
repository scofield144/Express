const express = require("express");
const app = express();

const whitelist = [
  "https://www.google.com/",
  "https://fabios-folio.web.app/",
  "https://miniature-lamp-57wqwjqrxx9cvwp6-4000.app.github.dev",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

module.exports = corsOptions;
