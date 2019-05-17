"use strict";
//external depencies
const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

//required from within project documents
const makeDataHelpers = require("./lib/data-helpers.js");
const makeTweetRoutes = require("./routes/tweets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  const DataHelpers = makeDataHelpers(db);
  const tweetsRoutes = makeTweetRoutes(DataHelpers);
  app.use("/tweets", tweetsRoutes);

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  //db.close(); //do I have to keep restarting server?
});

