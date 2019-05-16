$(document).ready(function() {
  let textarea = $(".new-tweet textarea");

  textarea.on("input", function(event) {
    //console.log($(this));

    let targetedForm = $(this).parent();
    let targetedCounter = $(targetedForm.find(".counter")); //already jquerified thing then don't need dollar here again?

    let counterValue = 140 - $(this).val().length;
    targetedCounter.html(counterValue);

    if (counterValue < 0) {
      targetedCounter.addClass("negative");
    } else {
      targetedCounter.removeClass("negative");
    }
  });

  //wrapping it in the dollar and the brackets attaches the power of the jquery library and all the function that come iwth it
  // plain dom element: this.value.length
  //Jqueried element (with library) $(this).val().length).
});
