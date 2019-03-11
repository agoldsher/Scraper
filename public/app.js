// file is used for index page
function loadArticles(data) {
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(`
    <div class="container mt-3">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-md-9">
              <a href="${data[i].link}">
                <h4 class="text-body">
                   ${data[i].title}
                </h4>
              </a>
            </div>
            <div class="col-md-3">
              <button type="button" data-id='${data[i]._id}' class="btn btn-dark float-right save-button">Save Article</button>  
            </div>
          </div>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p data-id='${data[i]._id}'>
              <h6>
                ${data[i].summary}
              </h6>
            </p>
          </blockquote>
        </div>
      </div>
    </div>`);
  }
}


// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  loadArticles(data);
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
$(".clear-button").on("click", function () {
  $.ajax({
    method: "GET",
    url: "/delete"
  })
  location.reload();

});
$(document).on("click", ".save-button", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var thiscard = $(this).parents(".card");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "PUT",
      url: "/articles/" + thisId,
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      thiscard.remove();

    });

});