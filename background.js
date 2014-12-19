document.addEventListener('DOMContentLoaded', function () {

//React when a browser action's icon is clicked
	chrome.browserAction.onClicked.addListener(function(tab) {
		var metaURL = tab.url;//grab URL to feed into API
		//alert(metaURL);
		var script =
		'alert("'+metaURL+'");'
		+ '$("<p>Score!</p>").insertAfter(".metascore_w");
		';
		chrome.tabs.executeScript({
			code : script;
		});
	});
});