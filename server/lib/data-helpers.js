"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

        db.tweets.push(newTweet);
        callback(null, true);

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      let databaseArray = db.collection("tweets").find().toArray(callback);
      console.log("databaseArray", databaseArray);
      }
    }

};


//get tweets
//simulateDelay(() => {
      //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      //   callback(null, db.tweets.sort(sortNewestFirst));