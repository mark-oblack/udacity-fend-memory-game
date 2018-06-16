
//The following GitHub repository was used as a resource for the JS code: https://github.com/sandraisrael/Memory-Game-fend

let card = document.getElementsByClassName("card");
const cards = [...card];
const deck = document.querySelector(".deck");

let star = document.getElementsByClassName("fa-star");
let currentStars = 3;
let totalStars = document.querySelector(".totalStars");
const stars = [...star];

let count;
let moves = document.querySelector(".moves");
let totalMoves = document.querySelector(".totalMoves");

let openCards;
let matchedTotal = 0;

let stopwatch = document.querySelector(".stopwatch");
let minutes;
let seconds;
let time;
let finishTime;
let totalTime = document.querySelector(".totalTime");

let congratsPopup = document.querySelector(".popup");
let overlay = document.querySelector(".overlay");

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

function disable() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add("disabled");
    }
}

function enable() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("disabled");
    }
}

function startGame() {
    congratsPopup.classList.remove("show");
    congratsPopup.classList.add("hide");
    overlay.classList.remove("show");
    overlay.classList.add("hide");
    enable();
	let shuffledCards = shuffle(cards);
	for (var i = 0; i < shuffledCards.length; i++){
	    cards.forEach.call(shuffledCards, function(item){
	    	deck.appendChild(item);
	    });
    }
    openCards = [];
    matchedTotal = 0;
    count = 0;
    moves.innerHTML = count + " moves";
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.display = "block";
    }
    for (var i =0; i < cards.length; i++) {
        cards[i].classList.remove("open", "matched", "disabled");
    }
    clickEvents();
    clearInterval(time);
    startTimer();
}

document.body.onload = startGame();

function displayCard() {
    this.classList.remove("unopen");
	this.classList.add("open", "disabled");
    count += 1;
    console.log(count);
    //counts every 2 card clicks as 1 move and then writes move to HTML
    if (count % 2 === 0) {
        moves.innerHTML = count/2 + " moves";
    }
    starRating();
}

function cardOpen() {
    openCards.push(this);
    let length = openCards.length;
    if(length === 2) {
        disable();
        if(openCards[0].type === openCards[1].type) {
            console.log("match");
            matched();
        } else {
            console.log("no match");
            unmatched();
        }

    }
}

//operates off of count value, so 0-12 moves is 3 stars; 13-18 moves is 2 stars; 19 or more moves is 1 star
function starRating() {
    if(count >= 26 && count <= 36) {
        stars[0].style.display = "none";
        currentStars = 2;
    } else if (count >= 38) {
        stars[1].style.display = "none";
        currentStars = 1;
    } 
}

function congratulations() {
    if (matchedTotal === 8) {
        stopTimer();
        congratsPopup.classList.remove("hide");
        congratsPopup.classList.add("show");
        overlay.classList.remove("hide");
        overlay.classList.add("show");
        totalMoves.innerHTML = count/2;
        totalTime.innerHTML = finishTime;
        totalStars.innerHTML = currentStars;
    }
}

function matched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("matched", "disabled");
        openCards[i].classList.remove("open");
        openCards[i].removeEventListener("click", displayCard);
        openCards[i].removeEventListener("click", cardOpen);
    }
    enable();
    openCards=[];
    matchedTotal += 1;
    congratulations();
}

function unmatched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("unmatched");
    }
    setTimeout(function() {
        for (var i = 0; i < openCards.length; i++) {
            openCards[i].classList.remove("unmatched", "disabled");
            openCards[i].classList.add("unopen");
        }
        openCards=[];
        enable();
    }, 1100);
}

function clickEvents() {
    for(var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", displayCard);
        cards[i].addEventListener("click", cardOpen);
    }

}

function startTimer() {
    seconds = 0;
    minutes = 0;
    time = setInterval(function() {
        stopwatch.innerHTML = minutes + " mins " + seconds + " secs";
        seconds++;
        if(seconds === 60) {
            minutes ++;
            seconds = 0;
        }   
    }, 1000);
}

function stopTimer() {
    finishTime = stopwatch.innerHTML;
    console.log(finishTime);
    //clearInterval stops the time interval
    clearInterval(time);
}














