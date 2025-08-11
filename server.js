const { log } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // Passes control to the next middleware function
});

app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public"))); // Serves static files from the public directory

app.get("^/$|/index(.html)?", (req, res) => {
  // res.send('Welcome to the Home Page of Express!');
  // console.log('Hello world!');
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
  console.log("Redirecting to index.html");
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  console.log("404 Not Found");
});

// app.use((req, res, next) => {
//   console.log(
//     `[Logger] Request received: Method=${req.method}, URL=${req.url}`
//   ); // Logs the HTTP method and URL [16-18, 37]
//   next(); // Passes control to the next middleware function
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString(); // Adds a timestamp to the request
//   next();
// });

// app.get("/", (req, res) => {
//   res.send(`Hello from Express! Request received at: ${req.requestTime}`); // Sends a simple text response [30, 41, 42]
//   console.log("Hello world!");
// });

// app.post("/", (req, res) => {
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log("[API] Received JSON data:", req.body);
//     res.json({
//       message: "Data received successfully",
//       yourData: req.body,
//     }); // Responds with the received JSON data
//   } else {
//     res.status(400).json("No JSON data provided or invalid json");
//   }
// });

// // error
// app.use((err, req, res, next) => {
//   console.error("An error occurred", err.stack);
//   res.status(500).send("Something broke!");
// });

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
