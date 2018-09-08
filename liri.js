var request = require("dotenv").config();
var request = require('request');
var nodeArgs = process.argv;

// var keys = require("./key.js")
// var spotify = new Spotify(keys.spotify);
// var Spotify = require('node-spotify-api');

var command = nodeArgs[2];
// console.log(command);

var input = "";
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

for (i = 3; i < nodeArgs[i]; i++) {

    input = input + " " + nodeArgs[i];
}

input = input.trim().replace(" ", "+");


// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

// console.log(data); 
// });

//Request function for OMDB...


if (command === "movie-this") {

    var movieName = "";


    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        }

        else {

            movieName += nodeArgs[i];

        }
    }

    if (movieName === "") {

        movieName = "Mr. Nobody";
    }


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(body);

            //* Title of the movie.
            //* Year the movie came out.
            //* IMDB Rating of the movie.

            for (i = 0; i < JSON.parse(body).Ratings.length; i++) {

                if (JSON.parse(body).Ratings[i].Source === "Internet Movie Database") {

                    var IMBDrating = JSON.parse(body).Ratings[i].Value;

                }

                if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {

                    var RottenTomatoes = JSON.parse(body).Ratings[i].Value;
                }

            }
            //* Rotten Tomatoes Rating of the movie.
            //* Country where the movie was produced
            //* Language of the movie.
            //* Plot of the movie.
            //* Actors in the movie.

            console.log(`

        *Movie Title: ${JSON.parse(body).Title}
        *Release Year: ${JSON.parse(body).Year}
        *IMBD Rating: ${IMBDrating}
        *Rotten Tomatoes Rating: ${RottenTomatoes}
        *Produced In: ${JSON.parse(body).Country}
        *Language: ${JSON.parse(body).Language}
        *Plot: ${JSON.parse(body).Plot}
        *Actors: ${JSON.parse(body).Actors}
        
        `);



        }

    });

}

//Requet function for Bands In Town...
// var request = require('request');
// request('rest.bandsintown.com\/event\/13088979', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

