$(document).ready(function(){
    
    console.log("Hello, Newman");

    // default array of characters
    var springfielders = ["Homer Simpson", "Marge Simpson", "Otto Man", "Clancy Wiggum", "Mr. Largo", "Waylon Smithers", "Monty Burns", "Edna Krabappel", "Lunchlady Doris"];

    // function for generating new character buttons
    function renderButtons() {

        // empties the div to prevent accumulating repeated buttons each run
        $("#buttons").empty();

        // loop through the array of springfielders
        for (var i = 0; i < springfielders.length; i++) {

          var simp = $("<button>");  // generate a button for each character in the array
          
          simp.addClass("btn-simp");
          
          simp.attr("data-character", springfielders[i]);
          
          simp.text(springfielders[i]);

          $("#simps-buttons").append(simp); // add to the HTML once given all the above-attributes
        }
    }

    renderButtons(); // call on doc ready to display initial buttons
    

    // function for getting and posting gifs on button-click
    $("button").on("click", function() {
        var character = $(this).attr("data-character");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          character + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        $.ajax({ // AJAX call to Giphy to get gif data
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {

            var gifsArray = response.data; //array of gifs returned by the call 
  
            for (var g = 0; g < gifsArray.length; g++) {
              var gifDiv = $("#gif-viewer");
  
              var rating = gifsArray[g].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var personImage = $("<img>");
              personImage.attr("src", gifsArray[g].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
  
              $("#gifs-appear-here").prepend(gifDiv);
            }
        });

    });

}); // end of docready function