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

stream.on('tweet', function(tweet){
    console.log(tweet);
    if (isValidTweet(tweet)){
        console.log('valid');
        let raidInfo = getTweetMessage(tweet);
        console.log(JSON.stringify(raidInfo));
    }

})


function isValidTweet(data) {
    if(data.source !== '<a href="http://granbluefantasy.jp/" rel="nofollow">グランブルー ファンタジー</a>'){
        console.log('invalid tweet source');
        return false;
    } 
    if(data.text === null){
        console.log('tweet no text');
        return false;
    }


    return true;
}

function getTweetMessage(tweet) {
    let result = {
        raidID: "",
        user: "@" + tweet.user.screen_name,            
        time: tweet.created_at,
        raidType: searchTextForRaids(tweet.text),
        message: "No Twitter Message",
        language: "ja",
        status: "unclicked"
    };

    /*
    // Splitting the twitter 'text' string
    // Example: 
    // INPUT: 'tweeterMessage A1B8BBC8 :Battle ID\nI need backup!\nLvl 75 Celeste Omega\nhttps://t.co/cgqe3pUhC2'
    // OUTPUT:  ['tweeterMessage A1B8BBC8 :Battle ID',
    //           'I need backup!',
    //           'Lvl 75 Celeste Omega',
    //           'https://t.co/cgqe3pUhC2']
    */
    let splitStrnig = tweet.text.split("\n");

    // getting raid ID & tweet message
    try{
        let temp = splitStrnig[0].split(":");

        // string manipulation on the twitter data to get raidID
        result.raidID = temp[0].substr(temp[0].length - 9, 8); 

        if(temp[0].length - 9 > 0){     //have a twitter emssage
            result.message = temp[0].substr(0, temp[0].length - 10);
        }
    }catch (error){
        console.log(error);
    }

    result.language = tweet.lang;

    return result;
}

function searchTextForRaids(text) {
    let result = null;

    for(let i = 0; i < raidConfig.length; i++){
        if(text.indexOf(raidConfig[i].english) !== -1 || 
        text.indexOf(raidConfig[i].japanese) !== -1){
            result = raidConfig[i].room;
            break;
        }
    }

    return result;
}