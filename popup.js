var pubs;

$(document).ready(function() {

    //Hide input form until user clicks to add
    $("#newExpanded").hide();

    chrome.storage.sync.get("publications", function(items) { //get the object publications from Chrome storage
        if (!chrome.runtime.error) { //exception handling
            console.log("Runtime error.");
            pubs = items;
        }
        if (items.publications == null) { //if it's null, initalize it as an empty array
            items.publications = [];
            pubs = items;
        }
        for (var i in pubs.publications) { //for each publication, append to HTML w/ remove button
            $("#pubList").append("<p class='pub'>" + pubs.publications[i] + "</p>" + 
                "<button type='button' class='remove'>Remove</button>" +
                "<br />");
        }
        $(".remove").click(function() { //if remove is clicked
            var prevPub = $(this).prev();
            for (var pub in pubs.publications) { //iterate through storage and remove matching publication
                if (pubs.publications[pub].valueOf() == prevPub.text().valueOf()) {
                    console.log("Testing!");
                    pubs.publications.splice(pub, 1);
                }
            }
            prevPub.remove(); //remove the publication element it's attached to
            $(this).remove(); //then remove the button

            chrome.storage.sync.set({
                'publications': pubs.publications
            }, function() { //then resync w/ Chrome's storage
                if (chrome.runtime.error) {
                    console.log("Runtime error.");
                }
            });
        });
    });

    $("#add").click(function() {
        saveChanges(pubs.publications);
    });

    $("#newPub").click(function() {
        newPub();
    });
});

function saveChanges(publications) {

    var userInput = document.getElementById('input').value; //get the user input

    if (!userInput) { //exception handling
        alert('Error: No value specified');
        return;
    } else {
        publications.push(userInput); //add it to the array
        $("#pubList").append("<p class='pub'>" + userInput + "</p>" + //append it in HTML w/ remove button
            "<button type='button' class='remove'>Remove</button>" +
            "<br />");

        //TODO: Make remove into a function that takes in a publications array as a parameter and reuse
        $(".remove").click(function() { //if remove is clicked
            var prevPub = $(this).prev();
            for (var pub in publications) { //iterate through storage and remove matching publications
                if (publications[pub].valueOf() == prevPub.text().valueOf()) {
                    publications.splice(pub, 1);
                }
            }
            prevPub.remove(); //remove the publication li it's attached to
            $(this).remove(); //then remove the button

            chrome.storage.sync.set({
                'publications': publications
            }, function() { //then resync w/ Chrome's storage
                if (chrome.runtime.error) {
                    console.log("Runtime error.");
                }
            });
        });
        chrome.storage.sync.set({
            'publications': publications
        }, function() { //then resync w/ Chrome's storage
            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
        });
    }
}

function newPub() {
    //hide newPub
    $("#newPub").hide();
    //show form
    $("#newExpanded").show();
}
