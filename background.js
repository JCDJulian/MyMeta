document.addEventListener('DOMContentLoaded', function () {

//React when a browser action's icon is clicked
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.executeScript({
			script:'toggle.js'
		});
	});
});