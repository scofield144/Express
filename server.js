const express = require("express");
const cors = require('cors');
const path = require("path");
const app = express();
const {logger} = require("./middleware/logEvents"); // Importing the logging middleware
const errorHandler = require("./middleware/errorHandler"); // Importing the error handling middleware
const { error } = require("console");
  
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.google.com/','https://fabios-folio.web.app/', 'https://miniature-lamp-57wqwjqrxx9cvwp6-4000.app.github.dev', 'http://localhost:3500'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    }else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },   
  optionsSuccessStatus: 200 // For legacy browser support
}


app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public"))); // Serves static files from the public directory

app.get("^/$|/index(.html)?", (req, res) => {
  // res.send('Welcome to the Home Page of Express!');
  res.sendFile(path.join(__dirname, "public", "index.html"));
  res.json({msg:'This is CORS-enabled for all origins!'})
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
  console.log("Redirecting to index.html");
});

// Route handler
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attended to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello world!");
  }
);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  console.log("404 Not Found");
});

app.use(errorHandler); // Using the error handling middleware

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
