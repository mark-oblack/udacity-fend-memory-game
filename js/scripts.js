
let card = document.getElementsByClassName("card");
const cards = [...card];
let star = document.getElementsByClassName("fa-star");
const stars = [...star];
const deck = document.querySelector(".deck");
let moves = document.querySelector(".moves");
let count = 0;
let openCards = [];
let isClicked;

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

function startGame() {
	let shuffledCards = shuffle(cards);
	for (var i = 0; i < shuffledCards.length; i++){
	    cards.forEach.call(shuffledCards, function(item){
	    	deck.appendChild(item);
	    });
    }
    count = 0;
    moves.innerHTML = count;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.display = "block";
    }
    clickEvents();

}

document.body.onload = startGame();

function displayCard() {
    this.classList.remove("unopen");
	this.classList.add("open");
    moves.innerHTML = count += 1;
    if(count > 16 && count < 24) {
        starRating();
    } else if (count > 24) {
        starRating();
    } 
}

function cardOpen() {
    openCards.push(this);
    let length = openCards.length;
    if(length === 2) {
        if(openCards[0].type === openCards[1].type) {
            console.log("match");
            matched();
        } else {
            console.log("no match");
            unmatched();
        }

    }
}

function starRating() {
    if(count > 16 && count < 24) {
        stars[0].style.display = "none";
    } else if (count > 24) {
        stars[1].style.display = "none";
    } 
}

function matched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("matched");
        openCards[i].classList.remove("open");
        openCards[i].removeEventListener("click", displayCard);
        openCards[i].removeEventListener("click", cardOpen);
    }
    openCards=[];
}

function unmatched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("unmatched");
    }
    setTimeout(function() {
        openCards[0].classList.remove("unmatched");
        openCards[0].classList.add("unopen");
        openCards[1].classList.remove("unmatched");
        openCards[1].classList.add("unopen");
        openCards=[];
    }, 1100);
}

function clickEvents() {
    for(var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", displayCard);
        cards[i].addEventListener("click", cardOpen);
    }

}














