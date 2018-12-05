const express = require("express");
const path = require("path");

const app = express();

// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 8080;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets our server to use the public directory for static assets
app.use(express.static(path.join(__dirname, "public")));

// Routes
// -----------------

require("./routes/html-routes.js")(app);

// Starts our server on the predefined PORT
app.listen(PORT, function() {
  console.log(`App is now listening on PORT ${PORT}`);
});
