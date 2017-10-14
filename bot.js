// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');
var uniqueRandomArray = require('unique-random-array');
var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var queryString = uniqueRandomArray([
        'healthcare', 'health care', 'wisconsin health care', 'wisconsin healthcare', 'obamacare', 'affordable care act', 'aca',
        'wisconsin', 'health insurance', '#obamacare', '#healthcare', '#aca', '@WiHealthNews'
    ]);
    var resultType = uniqueRandomArray([
        'mixed', 'recent', 'popular'
    ]);
    var params = {
        q: queryString(), // REQUIRED
        result_type: resultType(),
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log(err.message + ": " + Date.now);
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 5 minutes <-- 5 minutes dev only!
setInterval(retweet, 300000);