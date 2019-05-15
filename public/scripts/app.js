$(document).ready(function() {

//   $('.container-tweets').hover(
//        function(){ $(this).addClass('hover') },
//        function(){ $(this).removeClass('hover') }
// )

let input = $(".new-tweet input");


function createTweetElement(tweetObject) {
  let $tweet = $("<article>").addClass("tweet-article");

  let header = $("<header>")

  let headerImage = $("<img>").addClass("profile-picure").attr("src", tweetObject.user.avatars.small);
  let headerH3 = $("<H3>");
  headerH3.text(tweetObject.user.name);
  let handleSpan = $("<span>").addClass("user-Handle");
  handleSpan.text(tweetObject.user.handle);

  header.append(headerImage);
  header.append(headerH3);
  header.append(handleSpan);

  let tweetText = $("<p>").addClass("tweet-message");
  tweetText.text(tweetObject.content.text);

  let footer = $("<footer>");

  let footerSpan = $("<span>");
  footerSpan.text(new Date(tweetObject.created_at)); //moment from now

  let footerDiv = $("<div>").addClass("tweeting-images");

  let footerI1 = $("<i>").addClass("fas fa-flag");
  let footerI2 = $("<i>").addClass("fas fa-retweet");
  let footerI3 = $("<i>").addClass("fas fa-heart");

  footerDiv.append(footerI1).append(footerI2).append(footerI3);

  footer.append(footerDiv).append(footerSpan);

  $tweet.append(header);
  $tweet.append(tweetText);
  $tweet.append(footer);

  return $tweet

  // console.log($tweet);

  // let targetedForm = $(this).parent();
  // console.log(targetedForm);

  // let targetedTextArea = $(targetedForm.find(".text-area"));
  // console.log(targetedTextArea);

  // console.log(targetedTextArea.val());

  // $tweet.innerHTML(targetedTextArea.val());



  //take in innerHTML of the text area and add it to article.
  //then add aritcle to tweet container (do this step in function?)
  //append header and footer etc.(anything else?)


};


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

console.log($tweet); // to see what it looks like

$('.container-tweets').append($tweet);

function renderTweets(tweets) {

  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(let tweet of tweets){
      let newTweet = createTweetElement(tweet);
      $('.container-tweets').append(newTweet)
    }
};


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



renderTweets(data);


});