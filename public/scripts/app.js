$(document).ready(function() {
  //hide compose tweet section and tweet error mesage when page is loaded:
  let initialHide = $(".new-tweet").hide();
  $(".no-text").hide();
  $(".too-long").hide();

  //function to build tweet box once new tweet is submitted:
  function createTweetElement(tweetObject) {
    let $tweet = $("<article>").addClass("tweet-article");
    let header = $("<header>");
    let headerImage = $("<img>")
      .addClass("profile-picure")
      .attr("src", tweetObject.user.avatars.small);
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
    let date = moment(new Date(tweetObject.created_at)).fromNow();

    footerSpan.text(date);

    let footerDiv = $("<div>").addClass("tweeting-images");
    let footerI1 = $("<i>").addClass("fas fa-flag");
    let footerI2 = $("<i>").addClass("fas fa-retweet");
    let footerI3 = $("<i>").addClass("fas fa-heart");

    footerDiv
      .append(footerI1)
      .append(footerI2)
      .append(footerI3);

    footer.append(footerDiv).append(footerSpan);

    $tweet //check this!!!
      .append(header)
      .append(tweetText)
      .append(footer);

    return $tweet;
  }

  //function to delete all current tweets in container,then loop through all tweets in DB, create, render and display these.
  function renderTweets(tweets) {
    $(".container-tweets").html("");
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $(".container-tweets").prepend(newTweet);
    }
  }

  function loadTweets() {
    $.ajax({
      url: "/tweets ",
      method: "GET",
      dataType: "json",
      success: function(response) {
        renderTweets(response);
      },
      failure: function() {
        console.log("Error!");
      }
    });
  }

  loadTweets(); //load all tweets on page when page loaded.

  //on click for "tweet" input trigger functions on this page to create,render and display tweets (including new tweet added) on page.
  let input = $(".new-tweet input");
  input.on("click", function() {
    event.preventDefault();

    let targetedForm = $(this).parent();
    let targetedTextArea = $(targetedForm.find(".text-area"));
    let formMessage = targetedTextArea.val();

    if (!formMessage) {
      $(".too-long").hide();
      $(".no-text").slideDown("slow");
    } else if (formMessage.length > 140) {
      $(".no-text").hide();
      $(".too-long").slideDown("slow");
    } else {
      $(".no-text").hide();
      $(".too-long").hide();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: targetedForm.serialize(),
        success: function(response) {
          loadTweets();
        }
      });

      $(".text-area").val("");
    }
  });

  //when click compose button show/hide new-tweet section:
  let composeButton = $("#nav-bar .compose-button");
  composeButton.on("click", function() {
    let body = $(this)
      .parent()
      .parent();
    let newTweetSection = $(body.find(".new-tweet"));

    if ($(newTweetSection).is(":hidden")) {
      $(newTweetSection).slideDown("slow");
      $(".text-area").focus();
    } else {
      $(newTweetSection).slideUp("slow");
    }
  });
});
