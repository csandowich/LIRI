var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require("request");
var fs = require('fs');
var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);
var input = process.argv[2];
var songOrMovie = process.argv[3];


// Twitter my-tweets START
var params = {
  screen_name: 'csdummyaccount',
  count: 20
};
if (input === 'my-tweets') {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log('fix this');
    }
    for (i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      console.log(tweets[i].created_at);
    }

  });
}
// Twitter my-tweets END

// Spotify spotify-this-song START
if (input === 'spotify-this-song' && songOrMovie) {
  spotify.search({
    type: 'track',
    query: songOrMovie,
    limit: 1
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //console.log (data);
    var info = data.tracks.items;
    for (i = 0; i < info.length; i++) {
      console.log('Song Title: ' + info[i].name +
        ('\nArtist: ') + info[i].artists[0].name +
        ('\nPreview: ') + info[i].preview_url +
        ('\nAlbum: ') + info[i].album.name);
    }


return;
  });
}
// Spotify spotify-this-song END

//OMDB begins
if (input === 'movie-this' && songOrMovie) {

  request("http://www.omdbapi.com/?t=" + songOrMovie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log('\nThe title of the movie is: ' + JSON.parse(body).Title +
        '\nThe year the movie came out is: ' + JSON.parse(body).Year +
        "\nThe Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value +
        '\nThe country this was made in: ' + JSON.parse(body).Country +
        '\nMovie Language: ' + JSON.parse(body).Language +
        '\nThis is the Plot: ' + JSON.parse(body).Plot +
        '\nThese are the Actors: ' + JSON.parse(body).Actors);
    }
  });
}
//OMDB ends
