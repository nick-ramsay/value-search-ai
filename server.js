const tracer = require('dd-trace').init({
  service: "value-search-ai-server",
  debug: true,
  logInjection: true
});

const express = require("express");
var bodyparser = require("body-parser");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config();

const keys = require('./keys');

const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyparser.json({limit: '500kb'}));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Setting headers for CORS Policies
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Add routes, both API and view 
app.use(routes);

// Connect to the Mongo DB

const connection = (process.env.NODE_ENV === "production" ? process.env.MONGO_URI : keys.mongodb.mongo_uri);

if (process.env.NODE_ENV === "production") {
  mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
} else {
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/value-search", { useNewUrlParser: true, useUnifiedTopology: true }); // <-- Dev/Prod connection
  //mongoose.connect(process.env.MONGO_URI || "mongodb://mongo/value-search", { useNewUrlParser: true, useUnifiedTopology: true }); // <-- Docker build connection
}

//Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});