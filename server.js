const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes = require("./routes");


// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 3001;
const app = express();

// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Have every request go through our route middleware
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/nytScrape", {
// });




app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
