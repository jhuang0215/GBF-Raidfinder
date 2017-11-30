console.log('index.js is starting');

let Twit = require('twit');
let twitConfig = require('./config');
let raidConfig = require('./raids.json');

let keywords = '';

for (let i = 0; i < raidConfig.length; i++) {
    keywords += raidConfig[i].english + ',' + raidConfig[i].japanese;
    if (i !== raidConfig.length - 1) {
        keywords += ',';
    }
}





let T = new Twit(twitConfig);

// steam a sample of public statuses
let param = {
    track: keywords
}
let stream = T.stream('statuses/filter', param);

stream.on('tweet', function (tweet) {
    console.log(tweet);

})

/*
function isValidTweet (data) {
    let result = false;
    if()
}
*/