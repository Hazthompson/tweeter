$(document).ready(function() {
  let textarea = $(".new-tweet textarea");

  textarea.on("input", function(event) {
    let targetedForm = $(this).parent();
    let targetedCounter = $(targetedForm.find(".counter"));

    let counterValue = 140 - $(this).val().length;
    targetedCounter.html(counterValue);

    if (counterValue < 0) {
      targetedCounter.addClass("negative");
    } else {
      targetedCounter.removeClass("negative");
    }
  });
});

//function that impliments character counter for tweets- and turns this counter red when goes below 0.
