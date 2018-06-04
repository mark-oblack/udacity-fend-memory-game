
const card = document.getElementsByClassName("card");
const cards = [...card];
const deck = document.getElementById("card-deck");
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
    isClicked = false;
    clickEvents();
    count = 0;
    moves.innerHTML = count;
    $("#card-deck").children().css("background", "#485460");
    $(".card").children().css("display", "none");
	let shuffledCards = shuffle(cards);
	for (var i= 0; i < shuffledCards.length; i++){
	    cards.forEach.call(shuffledCards, function(item){
	    	deck.appendChild(item);
	    });
   }
}

document.body.onload = startGame();

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

function matched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].style.backgroundColor = "#0be881";
        openCards[i].removeEventListener("click", displayCard);
        openCards[i].removeEventListener("click", cardOpen);
    }
    openCards=[];
}

function unmatched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].style.backgroundColor = "#ff3838";
        // openCards[i].classList.add("unmatched");
    }
    setTimeout(function() {
        openCards[0].style.backgroundColor = "#485460";
        openCards[1].style.backgroundColor = "#485460";
        openCards=[];
    }, 1100);
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

function clickEvents() {
    for(var i = 0; i < cards.length; i++) {
        if(isClicked === true) {
            cards[i].removeEventListener("click", displayCard);
            cards[i].removeEventListener("click", cardOpen);

        } else {
            cards[i].addEventListener("click", displayCard);
            cards[i].addEventListener("click", cardOpen);
        }
    }

}













