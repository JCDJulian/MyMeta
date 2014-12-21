var metaURL = window.location.href;
var scores = null;
var faveList = null;
var arbScore = 0;

chrome.storage.sync.get("publications", function(items) { //get the object publications from Chrome storage
        if (chrome.runtime.error) { //exception handling
            console.log("Runtime Error");
        }
        if (items.publications == null) { //if it's null, initalize it as an empty array
            console.log("null!")
            items.publications = [];
        }
        else {
            faveList = items.publications;
        }
    });

$.ajax({//Get critic scores from  a MetaCritic API on Mashape
    url: "https://byroredux-metacritic.p.mashape.com/reviews",
    method: "GET",
    headers: {
        "X-Mashape-Key": "WqziWX02llmshfglmw2DnpQLEXScp1RtQXSjsn5yFssRXb3gF0"
    },
    data: {
        sort: "publication",
        url: metaURL
    },
    dataType: "json",
    success: function(data)
    {
    	arbScore = arbitrate(data.result, faveList);
        insert(arbScore)
    }
});

//checks the reviews for favorited publications and calculates custom score
function arbitrate(data, faveList) {
	var arbScore = null;
    var pubCounter = 0;
    var matchIndex;

    if (faveList == null) //if no favorited pubications
    {
        alert("No favorite publications found. Click the Arbitrator icon to add one!")
        console.log("null!")
        return null;
    }

    for (review in data) {//iterate throught the data

        matchIndex = $.inArray(data[review].critic, faveList);
        if (matchIndex != -1){//if the publication is in the favorite's list
            arbScore += parseInt(data[review].score, 10);//add it to the arbscore
            pubCounter++; //increment pubCounter
        }
    }
    arbScore = (arbScore/pubCounter);    //divide final arbScore by pubCounter to get new average
    return arbScore;
}

function getFaveList()
{
    var faveList;
    chrome.storage.sync.get("publications", function(items) { //get the object publications from Chrome storage
        if (chrome.runtime.error) { //exception handling
            console.log("Runtime Error");
            return null;
        }
        if (items.publications == null) { //if it's null, initalize it as an empty array
            console.log("null!")
            items.publications = [];
            return null;
        }
        else {
            faveList = items.publications;
            return faveList;
        }
    });
    console.log(faveList);
    return faveList;
}

function insert(arbScore){
    if(isNaN(arbScore)){
        $("<p>No scores found from favorite publications.</p>").insertAfter(".xlarge");
    }
    else {
    $("<p>Score From Your Favorite Publications: "+arbScore+"</p>").insertAfter(".xlarge");
    }
}