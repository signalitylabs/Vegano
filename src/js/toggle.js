window.onload = function () {
    // Check if the button is clicked
    document.getElementById('toggle_button').onclick = function () {

        // Change the button label
        var label = document.getElementById('toggle_button').innerHTML;
        document.getElementById('toggle_button').innerHTML = (label == "Enable") ? "Disable" : "Enable";

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "toggle_vegano"});
        });
    };
}