$(document).ready(function(){

    // default array of characters
    var springfielders = ["Homer Simpson", "Marge Simpson", "Otto Man", "Clancy Wiggum", "Edna Krabappel", "Mr. Largo", "Waylon Smithers", "Monty Burns", "Lunchlady Doris", "Krusty The Clown"];
    var springfielder = ""; //placeholder var to be defined with input inside the on-click

    renderButtons(); // call on doc ready to display initial buttons

    // function for generating new character buttons
    function renderButtons() {

      console.log("♫ The Simpsons ♫"); //make sure renderButtons ran on pageload

      // empties the simps-buttons div to prevent accumulating repeated buttons each run
      $("#simps-buttons").empty();

      // loop through the 'springfielders' array
      for (var i = 0; i < springfielders.length; i++) {

        var simp = $("<button>");  // generate a button for each character in the array
        
        simp.addClass("btn-simp"); // add attributes 
        simp.attr("data-character", springfielders[i]); // ''
        simp.text(springfielders[i]); // ''

        $("#simps-buttons").append(simp); // add to the buttons div once given all the above attributes
      }
      
      //function for submitting a new character button
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

          for (var g = 0; g < 10; g++) { //loop to return only 10 gifs
            var gifDiv = $("#gif-viewer");

            var rating = gifsArray[g].rating;

            var p = $("<p>").text("Rating: " + rating); //includes the MPAA rating included in the JSON response

            var simpsImage = $("<img>");
            simpsImage.attr("src", gifsArray[g].images.fixed_height.url); //formats the gif from the array

            gifDiv.prepend(p); //adds each rating to the beginning of the div (prepend)
            gifDiv.prepend(simpsImage); //ditto each gif
          }
      });

    });
    }

    // function for turning user input into a new button    
    $("#add-springfielder").on("click", function(event) { 

      console.log("smarch"); //check if function is happening onclick

      event.preventDefault(); //prevent page refresh (in this case)

      if ($("#simps-input").val() === "") { //prevents it from accepting an empty textbox
        alert("Please enter a Simpsons character!");
        return;
      } 
      // okay on to the actual purpose of this function....

      //**** (use 'this'?)
      springfielder = $("#simps-input").val().trim(); // trim the text input and turn it into a new variable

      springfielders.push(springfielder); // push the new var object to the springfielders array

       // call renderButtons to update the array of buttons with the new one and post them to the page
       renderButtons();

    });
   

}); // end of docready function