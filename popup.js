function saveChanges(){

var theValue = document.getElementById('input').value;
if (!theValue) {
	message('Error: No value specified');
	return;
}
/*else {
	chrome.storage.sync.set({'pubList['+n+']': theValue}),
	message('Publication added!')
}*/
}