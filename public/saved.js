// this file went obsolete but I tried so hard to get the modals to work
function loadSavedArticles(data) {
  for (var i = 0; i < data.length; i++) {

    $("#saved-article").append(`
      <div class="container mt-3">
        <div class="card" >
          <div class="card-header">
            <div class="row">
              <div class="col-md-9">
                <a href="${data[i].link}">
                  <h4 class="text-body">
                     ${data[i].title}
                  </h4>
                </a>
              </div>
          
            </div>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p data-id='${data[i]._id}'>
         
                  ${data[i].summary}
     
              </p>
            </blockquote>
          </div>
        </div>
      </div>
      `);
  }
}
$.getJSON("/saved-articles", function (data) {
  // For each one
  loadSavedArticles(data);
});
$(".note-button").on("click", function () {
  console.log("getting here");



  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  // Now make an ajax call for the Article
  $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);


    });
});

$("#scrape").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function () {
    $.getJSON("/articles", function (data) {
      // For each one
      loadArticles(data);
    });
  })
});
$("#clear").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/delete"
  })
  location.reload();

});
$(".saved-articles").on("click", function (e) {
  // e.preventDefault()

  $.ajax({
    method: "GET",
    url: "/saved-articles"
  }).then(function (data) {
    // console.log(data);
    loadSavedArticles(data);
  })
});

// When you click the savenote button
$(".save-note-button").on("click", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // var currentArticle = $(this)
  // .parents(".card")
  // .data();


  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {

        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});