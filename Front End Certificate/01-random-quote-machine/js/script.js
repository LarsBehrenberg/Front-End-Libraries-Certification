// Creating a random number between 0 and the quote array length
let rndQuoteNumber = Math.floor(Math.random() * rndQuotesJS.length);

function displayQuote(number) {
    // Selecting text and author and displaying a random quote from the quote array
    document.getElementById("text").innerHTML = rndQuotesJS[number].quote;
    document.getElementById("author").innerHTML = rndQuotesJS[number].name;

    // Creating a new twitter link with the quote text plus author encoded as URL (whitespaces become %20)
    document.getElementById("tweet-quote").setAttribute("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(rndQuotesJS[number].quote.trim()) + ' By ' + encodeURIComponent(rndQuotesJS[number].name.trim()));
}


// When firing up the document this function gets called, and calls then the displayQuote function with a random number
$(document).ready(function () {
    displayQuote(rndQuoteNumber);
});


// This function gets called when the new quote button is clicked
$("#new-quote").click(function () {

    // A new random number has to be created to not display the same quote again
    let rndQuoteNumber = Math.floor(Math.random() * rndQuotesJS.length);

    // If the new random quote is not equal the old one that is currently display in #text then a new quote will be displayed
    if (rndQuotesJS[rndQuoteNumber].quote != document.getElementById("text").innerHTML) {
        displayQuote(rndQuoteNumber);
    }
});