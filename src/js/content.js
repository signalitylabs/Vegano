var veganoEnabled = false;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "toggle_vegano") {
      veganoEnabled = !veganoEnabled;
      replaceText();
    }
  }
);

function replaceText() {
  // List of meat options and their replacements
  var replacements = {
      "beef": ["tempeh", "mushroom", "lentil", "chickpeas", "vegetables"],
      "chicken": ["tofu", "seitan", "vegetables", "quinoa", "lentils"],
      "pork": ["jackfruit", "mushroom", "lentil", "vegetables", "chickpeas"],
      "lamb": ["lentils", "tempeh", "mushroom", "vegetables", "chickpeas"],
      "bison": ["tempeh", "vegetables", "lentils", "tofu", "seitan"],
      "goat": ["vegetables", "lentils", "tempeh", "mushroom", "chickpeas"],
      "steak": ["vegetables", "tofu", "seitan", "tempeh", "mushroom"],
      "milk": ["almond milk", "soy milk", "oat milk", "coconut milk", "cashew milk"],
      "cheese": ["vegan cheese", "cashew cheese", "tofu cheese", "nutritional yeast", "vegan cream cheese"],
      "butter": ["vegan butter", "coconut oil", "olive oil", "vegan margarine", "avocado"],
      "turkey": ["tofu", "vegetables", "seitan", "quinoa", "lentils"],
      "duck": ["tofu", "vegetables", "seitan", "quinoa", "lentils"],
      "ham": ["vegetables", "tempeh", "tofu", "lentils", "chickpeas"],
      "bacon": ["vegan bacon", "tempeh bacon", "coconut bacon", "mushroom bacon", "eggplant bacon"],
      "cream": ["vegan cream", "coconut cream", "cashew cream", "tofu cream", "vegan sour cream"],
      "yogurt": ["vegan yogurt", "coconut yogurt", "soy yogurt", "almond yogurt", "cashew yogurt"],
      "mayonnaise": ["vegan mayonnaise", "aquafaba mayonnaise", "veganaise", "tofu mayonnaise", "cashew mayonnaise"],
      "ice cream": ["vegan ice cream", "coconut ice cream", "soy ice cream", "almond ice cream", "cashew ice cream"],
      "whipping cream": ["vegan whipping cream", "coconut whipping cream", "cashew whipping cream", "soy whipping cream", "almond whipping cream"],
      "sour cream": ["vegan sour cream", "coconut sour cream", "cashew sour cream", "tofu sour cream", "vegan cream cheese"]
    };
          
    var selectedReplacements = {};

    // Check if vegano is enabled
    if (veganoEnabled) {
      // Get all elements in the document
      var elements = document.getElementsByTagName('*');
  
      // Loop through all elements
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
  
        // Loop through all child nodes
        for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];
  
          // Check if the node is a text node
          if (node.nodeType === 3) {
            // Get the text content of the node
            var text = node.nodeValue;
            var replacedText = text;
  
            // Loop through all replacements
            for (var key in replacements) {
              if (!selectedReplacements[key]) {
                var options = replacements[key];
                // Select a random replacement
                selectedReplacements[key] = options[Math.floor(Math.random() * options.length)];
              }
            }
  
            // Loop through all replacements
            for (var key in selectedReplacements) {
              // Replace the text with the replacement
              var selectedOption = selectedReplacements[key];
              // Create a regular expression to find the key
              var regex = new RegExp(key, "gi");
              // Replace the text with the replacement
              replacedText = replacedText.replace(regex, function(match) {
                  // Check if the match is uppercase or lowercase.
                  if (match === match.toUpperCase()) {
                    // If the match is uppercase, make the selectedOption uppercase.
                    return selectedOption.toUpperCase();
                  } else if (match === match.toLowerCase()) {
                    // If the match is lowercase, make the selectedOption lowercase.
                    return selectedOption.toLowerCase();
                  } else if(match.charAt(0) == match.charAt(0).toUpperCase) {
                    // If the match is capitalized, make the first letter of the selectedOption uppercase.
                    return selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);
                  } else {
                    // If the match is capitalized, make the first letter of the selectedOption uppercase.
                    return selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);
                  }
                });
            }
  
            // Check if the text was replaced
            if (replacedText !== text) {
              // Replace the text in the element
              element.replaceChild(document.createTextNode(replacedText), node);
            }
          }
        }
      }
    } else {
      // Reload the page to remove the replacements
      location.reload();
    }
}
