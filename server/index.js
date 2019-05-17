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

// The in-memory database of tweets. It's a basic object with an array in it.
// const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
//

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

// Mount the tweets routes at the "/tweets" path prefix:

// app.post(Content-Type: application/x-www-form-urlencoded,(req, res) {

// });
