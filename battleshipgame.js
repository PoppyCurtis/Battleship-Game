var randomLoc = Math.floor(Math.random() * 5);
var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

var view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};
view.displayMessage("Tap tap, is this thing on?");


var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships: [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
  { locations: ["32", "33", "34"], hits: ["", "", ""] },
  { locations: ["63", "64", "65"], hits: ["", "", "hit"] }],
  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
      view.displayMiss(guess);
      view.displayMessage("You missed.");
      return false;
    }
  },
  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
};
var controller = {
  guesses: 0,
  processGuess: function (guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;         
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {               
        view.displayMessage("You sank all my battleships, in " +                                                 
        this.guesses + " guesses"); 
    }
  }
}

};
function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("Oops, that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}

function init() {   
  var fireButton = document.getElementById("fireButton");   
  fireButton.onclick = handleFireButton; 
  var guessInput = document.getElementById("guessInput");   
  guessInput.onkeypress = handleKeyPress; 
}
function handleFireButton() {   
  var guessInput = document.getElementById("guessInput");    
  var guess = guessInput.value; 
  controller.processGuess(guess);
  guessInput.value = "";
}
function handleKeyPress(event) {   
  var fireButton = document.getElementById("fireButton");   
  if (event.keyCode === 13) {      
    fireButton.click();      
    return false;   
  } 
}

window.onload = init;



