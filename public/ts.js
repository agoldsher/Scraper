function loadSavedArticles(data) {
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#saved-article").append(`
      <div class="container mt-3">
        <div class="card" >
          <div class="card-header">
            <div class="row">
              <div class="p-2">
                <a href="${data[i].link}">
                  <h4 class="text-body">
                     ${data[i].title}
                  </h4>
                </a>
              </div>
              <div class="ml-auto">
              <button type="button" data-id='${data[i]._id}' class="btn btn-dark float-right delete-button">Delete</button>  
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

$(document).on("click", ".delete-button", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var thiscard = $(this).parents(".card");

    $.ajax({
            method: "PUT",
            url: "/articles/unsave/" + thisId
        })
        .then(function (data) {
            // Log the response
            console.log(data);
            thiscard.remove();

        });
})

// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section

    $("#notes").empty();
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
            // The title of the article

            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input

                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    var urlReq = "/articles/" + thisId;

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: urlReq,
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
    $("#bodyinput").val("");
});