var metaURL = window.location.href;
var scores = null;

$("<p>"+metaURL+"</p>").insertAfter(".metascore_w");


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
    	console.log(data);
    	arbitrate(data);
    }
});

//checks the reviews for favorited publications and calculates custom score
function arbitrate(data) {
	var arbScore = null;
	return arbScore;
};