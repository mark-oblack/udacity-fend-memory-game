/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const card = document.getElementsByClassName("card");
const cards = [...card];
const deck = document.getElementById("card-deck");
let moves = document.getElementById("moves");
let count = 0;

function startGame() {
    moves.innerHTML = 0;
    $("#card-deck").children().css("background", "#485460");
    $(".card").children().css("display", "none");
	let shuffledCards = shuffle(cards);
	for (var i= 0; i < shuffledCards.length; i++){
	    cards.forEach.call(shuffledCards, function(item){
	    	deck.appendChild(item);
	    });
   }
}

function displayCard() {
	$(this).children().css("display", "block");
	$(this).css("background", "#0abde3");
    moves.innerHTML = count += 1;
    if(count > 16 && count < 24) {
        starRating();
    } else if (count > 24) {
        starRating();
    } 
}

function starRating() {
    if(count > 16 && count < 24) {
        $(".stars li:nth-child(1)").css("display", "none");
    } else if (count > 24) {
        $(".stars li:nth-child(2)").css("display", "none");
    } 
}


for (var i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", displayCard);
}



 window.onload = startGame();












