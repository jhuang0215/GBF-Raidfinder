console.log('index.js is starting');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

// steam a sample of public statuses
var param = {
    track: 'Lvl 75 Celeste Omega'
}
var stream = T.stream('statuses/filter', param);

stream.on('tweet', function (tweet) {
    console.log(tweet)
})