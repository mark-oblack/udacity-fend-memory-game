
let card = document.getElementsByClassName("card");
const cards = [...card];
const deck = document.querySelector(".deck");

let star = document.getElementsByClassName("fa-star");
const stars = [...star];

let moves = document.querySelector(".moves");
let count = 0;

let openCards = [];
let matchedTotal = 0;

let stopwatch = document.querySelector(".stopwatch");
let minutes = 0;
let seconds = 0;
let time;
let finishTime;

let congratsPopup = document.querySelector(".popup");

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
    for (var i =0; i < cards.length; i++) {
        cards[i].classList.remove("open", "matched", "disabled");
    }
    clickEvents();
    startTimer();

}

document.body.onload = startGame();

function displayCard() {
    this.classList.remove("unopen");
	this.classList.add("open", "disabled");
    count += 1;
    //counts every 2 card clicks as 1 move and then writes move to HTML
    if (count % 2 === 0) {
        moves.innerHTML = count/2;
    }
    starRating();
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

//operates off of count value, so 0-10 moves is 3 stars; 11-15 moves is 2 stars; 16 or more moves is 1 star
function starRating() {
    if(count >= 22 && count <= 30) {
        stars[0].style.display = "none";
    } else if (count >= 32) {
        stars[1].style.display = "none";
    } 
}

function congratulations() {
    if (matchedTotal === 8) {
        // setTimeout(function () {
        //     alert("Congratulations, you won!");
        // }, 1100);
        stopTimer();
        congratsPopup.classList.add("show");
    }
}

function matched() {
    for(var i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("matched", "disabled");
        openCards[i].classList.remove("open");
        openCards[i].removeEventListener("click", displayCard);
        openCards[i].removeEventListener("click", cardOpen);
    }
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
    }, 1100);
}

function clickEvents() {
    for(var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", displayCard);
        cards[i].addEventListener("click", cardOpen);
    }

}

function startTimer() {
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














