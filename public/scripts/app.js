$(document).ready(function() {


let initialHide = $(".new-tweet").hide();
console.log(initialHide);

//   $('.container-tweets').hover(
//        function(){ $(this).addClass('hover') },
//        function(){ $(this).removeClass('hover') }
// )



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




  //take in innerHTML of the text area and add it to article.
  //then add aritcle to tweet container (do this step in function?)
  //append header and footer etc.(anything else?)


};



function renderTweets(tweets) {

  // loops through tweets
    // calls createTweetElement for each tweet takes return value and appends it to the tweets container

    $('.container-tweets').html("");
    for(let tweet of tweets){
      let newTweet = createTweetElement(tweet);
      $('.container-tweets').prepend(newTweet)
    }
};

//currently replacing all tweets (deleting pg each time add new one and adding all back)
//in future could do new function (when open pg render renderTweets, but then after this, the
//"on.clicl" success function instead of calling renderTweets would call different function that just
//adds latest tweet (using index[tweetcd.length])))

//renderTweets(data);


let input = $(".new-tweet input");

input.on("click",function() {
  event.preventDefault();

  let targetedForm = $(this).parent();
  let targetedTextArea = $(targetedForm.find(".text-area"));
  let formMessage = targetedTextArea.val();

  if (!formMessage) {
    alert("Please enter a tweet!")
  } else if (formMessage.length > 140) {
    alert("The maximum characters is 140 per tweet!")
  } else {

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: targetedForm.serialize(),
      success: function(response) {
        loadTweets();
        console.log("success!");
      },

    });
  }
})


function loadTweets() {
  $.ajax({
    url: "/tweets ",
    method: "GET",
    dataType: "json",
    success: function(response) {
      console.log("success!");
      renderTweets(response);
    },
    failure: function () {
      console.log("Error!");
    }
  });
}

loadTweets();

let composeButton = $("#nav-bar .compose-button");

composeButton.on("click", function() {
  let body =  $(this).parent().parent();
  let newTweetSection = $(body.find(".new-tweet"));

  // newTweetSection.toggle(
  //   function(){newTweetSection.slideDown("slow")}
  //   function(){newTweetSection.slideUp("slow")}
  //   )

if ( $(newTweetSection).is( ":hidden" ) ) {
    $(newTweetSection).slideDown( "slow" );
  } else {
    $(newTweetSection).hide();
  }





})

});