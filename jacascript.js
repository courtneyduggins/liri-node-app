var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 252f996260524d3fadc4ac0e3bc3dd7e,
  secret: e9e8aa043e42451484a7ecbd3e75c7e7
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

//Request function for OMDB...
var request = require('request');
request('http://www.omdbapi.com/?i=tt3896198&apikey=7c887434', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

//Requet function for Bands In Town...
var request = require('request');
request('rest.bandsintown.com\/event\/13088979', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

