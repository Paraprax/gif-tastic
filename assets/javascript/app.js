$(document).ready(function(){

    // VARIABLES ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    // default array of characters
    var topics = ["Homer Simpson", "Marge Simpson", "Otto Man", "Clancy Wiggum", "Edna Krabappel", "Mr. Largo", "Waylon Smithers", "Monty Burns", "Lunchlady Doris", "Krusty The Clown"];
    //placeholder var to be defined with input inside the on-click
    var springfielder = ""; 
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

    renderButtons(); // call on doc ready to display initial buttons

    // BIG FUNCTION for generating buttons and adding the gif functionality via AJAX = = = = = = = = = = = = =
    function renderButtons() {

      console.log("♫ The Simpsons ♫"); //make sure renderButtons ran on pageload

      // empties the simps-buttons div to prevent accumulating repeated buttons each run
      $("#simps-buttons").empty();

      // loop through the 'springfielders' array
      for (var i = 0; i < topics.length; i++) {

        var simp = $("<button>");  // generate a button for each character in the array
        
        simp.addClass("btn-simp"); // add attributes 
        simp.attr("data-character", topics[i]); // ''
        simp.text(topics[i]); // ''

        $("#simps-buttons").append(simp); // add to the buttons div once given all the above attributes
      }
      
      //event function for clicking any character button - - - - - - - - - - - - -
      $("button").on("click", function() {
        var character = $(this).attr("data-character");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          character + "&api_key=dc6zaTOxFJmzC&limit=10&tag=red"; // "limit = 10" so only the first ten gifs are returned
  
      $.ajax({ // AJAX call to Giphy to get gif data
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {

            var gifsArray = response.data; //array of gifs returned by the call 

            for (var g = 0; g < gifsArray.length; g++) { //loop to return gifs
              var gifDiv = $("#gif-div");
              
              var rating = gifsArray[g].rating;

              var p = $("<p>").text("Rating: " + rating); //includes the MPAA rating included in the JSON response

              var simpsImage = $("<img>");
              simpsImage.attr("src", gifsArray[g].images.fixed_height.url); //formats the gif from the array

            
              gifDiv.prepend(p); //adds each rating to the beginning of the div (prepend)
              gifDiv.prepend(simpsImage); //ditto each gif
             

            }
        }); // end of "then"-function

      }); // end of on-click event function - - - - - - - - - - - - - - - 

    } // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  


    // function for turning user input into a new button by adding submission 
    // to the array of characters which buttons are rendered from. * * * * * * * * * * * * 
    $("#add-springfielder").on("click", function(event) { 

      console.log("smarch"); //check if function is happening onclick

      event.preventDefault(); //prevent page refresh (in this case)

      if ($("#simps-input").val() === "") { //prevents it from accepting an empty textbox
        alert("Please enter a Simpsons character!");
        return;
      } 
      // okay, onwards to the actual purpose of this function....

      springfielder = $("#simps-input").val().trim(); // trim the user's text input and turn it into a new variable

      topics.push(springfielder); // push the new var object to the springfielders array

      // finally, call renderButtons to update the array of buttons with the new one and post them to the page
      renderButtons();

    }); //* * * * * * * * * * * * * *

    //function for starting and pausing gifs when clicking them : : : : : : : : : : :

    
    // : : : : : : : : : : : : : : 
   

}); // end of docready function