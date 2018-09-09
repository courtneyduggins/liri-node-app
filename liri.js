var request = require("dotenv").config();
var request = require('request');
var command = process.argv[2];
// var search = process.argv.slice(3).join(" ");

var keys = require("./key.js")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");



// console.log(command);


// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

//perform movie search if command is "movie-this"....
if (command === "movie-this") {

    var movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < process.argv.length; i++) {

        if (i > 3 && i < process.argv.length) {

            movieName = movieName + "+" + process.argv[i];

        }

        else {

            movieName += process.argv[i];

        }
    }


    if (!movieName) {

        movieName = "Mr. Nobody";
    }


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {


            // console.log(body);
            var movieData = JSON.parse(body);
            console.log(movieData);

            for (i = 0; i < movieData.Ratings.length; i++) {

                if (movieData.Ratings[i].Source === "Internet Movie Database") {

                    var IMBDrating = movieData.Ratings[i].Value;

                }

                if (movieData.Ratings[i].Source === "Rotten Tomatoes") {

                    var RottenTomatoes = movieData.Ratings[i].Value;
                }

            }

            //         // //* Title of the movie.
            //         // //* Year the movie came out.
            //         // //* IMDB Rating of the movie.
            //         //     ${IMBDrating}
            //         // //* Rotten Tomatoes Rating of the movie.
            //         //     ${RottenTomatoes}
            //         // //* Country where the movie was produced
            //         // //* Language of the movie.
            //         // //* Plot of the movie.
            //         // //* Actors in the movie.

            console.log(`

        *Movie Title: ${movieData.Title}
        *Release Year: ${movieData.Year}
        *IMBD Rating: ${IMBDrating}
        *Rotten Tomotoes Raing: ${RottenTomatoes}
        *Produced In: ${movieData.Country}
        *Language: ${movieData.Language}
        *Plot: ${movieData.Plot}
        *Actors: ${movieData.Actors}
        \n------------------------------------------------------------\n\n
    `);



        } else {
            console.log(error);
        }

    });

    //perform search if command is "spotify-this-song"....    

} else if (command === "spotify-this-song") {

    var songTitle = "";

    for (var i = 3; i < process.argv.length; i++) {

        if (i > 3 && i < process.argv.length) {

            songTitle = songTitle + "+" + process.argv[i];

        }

        else {

            songTitle += process.argv[i];

        }

    }

    if (!songTitle) {

        songTitle = "The Sign";
    }

    spotify.search({ type: 'track', query: songTitle, limit: 6 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {


            var songInfo = data.tracks.items[5];

            // console.log(songInfo);
            // var Artists = JSON.parse(songInfo.album.artists.length);

            console.log(`
            
            Artist(s): ${songInfo.artists[0].name}
            Song Title: ${songInfo.name}
            Link: ${songInfo.preview_url}
            Album: ${songInfo.album.name}
            \n------------------------------------------------------------\n\n
            
            `);
        }


    });

    //perform search if command is concert-this...

} else if (command === "concert-this") {

    var bandName = "";

    for (var i = 3; i < process.argv.length; i++) {

        if (i > 3 && i < process.argv.length) {

            bandName = bandName + "+" + process.argv[i];

        }

        else {

            bandName += process.argv[i];

        }
    }

    if (!bandName) {

        bandName = "Ace of Base";
    }


    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var concertInfo = JSON.parse(body);
            var currentCity = concertInfo[0];

            // console.log(concertInfo);

            //Name of the venue
            //Venue location
            //Date of the Event (use moment to format this as "MM/DD/YYYY")

            console.log(`
            Name of Venue: ${currentCity.venue.name}
            Venue Location: ${currentCity.venue.city}
            Date of the Event: ${moment(currentCity.venue.datetime).format('MM DD YYYY')}
            \n------------------------------------------------------------\n\n
            
            `);
        }

    })





}


if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var textArray = data.split(",");


        text = textArray[1];
        // console.log(name);

        spotify.search({ type: 'track', query: text, limit: 1 }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
            }

            // console.log(JSON.stringify(data, null, 2));
            // console.log(data);
            var songInfo = data.tracks.items[0];
            console.log(` 
            Artist(s): ${songInfo.artists[0].name}
            Song Title: ${songInfo.name}
            Link: ${songInfo.preview_url}
            Album: ${songInfo.album.name}
				\n------------------------------------------------------------\n\n
			`);
        })

    });
}










//Request function for OMDB...




//Requet function for Bands In Town...
// var request = require('request');
// request('rest.bandsintown.com\/event\/13088979', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

