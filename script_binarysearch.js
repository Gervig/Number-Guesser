"use strict";

window.addEventListener("DOMContentLoaded", main);

// instantiates initial variables
let count;
let comment = ``;
let arrNumbers = [];
let l, min, max, middle;

function main() {
  console.log("JavaScript is running!");

  // add eventlistener for btn_start
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("#btn_start, .btn_start")) {
      startGame();
    }
  });
  // event delegation on the list for low, high and correct buttons
  document
    .querySelector("#guesses")
    .addEventListener("click", handleGuessClick);
}

function startGame() {
  console.log("Game started!");
  // sets values
  arrNumbers = generateData(1, 100);
  l = arrNumbers.length - 1;
  min = arrNumbers[0];
  max = arrNumbers[l];
  middle = findMiddleIndex(arrNumbers);
  // intantiates count as 0, for start and restart
  count = 0;

  const list = document.getElementById("guesses");

  // removes the end message if game was restarted
  const endMsg = document.getElementById("endMessage");
  if (endMsg) endMsg.remove();

  // clear list
  while (list.firstElementChild) {
    list.removeChild(list.firstElementChild);
  }

  // adds new guess
  addGuess(arrNumbers);
}

function handleGuessClick(event) {
  const clickedButton = event.target;
  if (!(clickedButton instanceof HTMLButtonElement)) return;

  const li = clickedButton.closest("li");
  const number = li.dataset.guess; // read stored guess

  if (clickedButton.classList.contains("btn_low")) {
    // too low button
    console.log("TOO LOW");
    li.innerHTML = `I'm guessing ${number} → That was too low!`;
    // check if there is only 1 number left in the array, game over!
    if (l == 1) {
      gameFinished();
      return;
    }
    // the number is in the upperhalf of the array
    upperhalf();
    addGuess(arrNumbers);
  } else if (clickedButton.classList.contains("btn_high")) {
    // too high button
    console.log("TOO HIGH");
    li.innerHTML = `I'm guessing ${number} → That was too high!`;
    // check if there is only 1 number left in the array, game over!
    if (l == 1) {
      gameFinished();
      return;
    }
    // the numbers is in the lowerhalf of the array
    lowerhalf();
    addGuess(arrNumbers);
  } else if (clickedButton.classList.contains("btn_correct")) {
    // correct button
    console.log("CORRECT");
    setComment();
    li.innerHTML = `I'm guessing ${number} → That was correct! I used ${count} ${
      count == 1 ? `guess` : `guesses` // grammar check if count is 1
    }, ${comment}!`;
    gameFinished();
  }
  function gameFinished() {
    setComment();
    if (l == 1) {
      console.log(`Only one number left in the array: ${middle}`);
      li.innerHTML = `I'm guessing ${number} → That is the last option! I used ${count} guesses, ${comment}`;
    }
    document.body.insertAdjacentHTML(
      "beforeend",
      `<p id="endMessage">I'm finally done! :) Would you like to <button id="btn_start">try again?</button> </p>`
    );
  }
}

function addGuess(arr) {
  const list = document.getElementById("guesses");
  // count goes up by one
  count++;

  // inserts html with guess and buttons
  // middle value is always the guess (binary search algorithm)
  list.insertAdjacentHTML(
    "beforeend",
    `<li data-guess="${middle}">
      I'm guessing ${middle} - Is that 
      <button class="btn_low">too low</button> 
      <button class="btn_high">too high</button> 
      <button class="btn_correct">Correct!</button> ?
    </li>`
  );
}

// findes the index of the median (middle value's index) of an array, rounded up
function findMiddleIndex(arr) {
  return Math.floor(arr.length / 2);
}

// generates an array of numbers
function generateData(start, end) {
  let data = [];
  if (start > end) {
    console.log(`Error: Array start value greater than end value!`);
    return data;
  }
  for (let i = start; i <= end; i++) data.push(i);
  return data;
}

// cuts the lowerhalf from the array (so only the upperhalf remains) and saves new values
function upperhalf() {
  if (l <= 1) return false;
  arrNumbers = arrNumbers.slice(
    arrNumbers.indexOf(middle),
    arrNumbers.indexOf(max) + 1
  );
  l = arrNumbers.length - 1;
  min = arrNumbers[0];
  max = arrNumbers[l];
  middle = arrNumbers[findMiddleIndex(arrNumbers)];
  return true;
}

// cuts the upperhalf from the arary (so only the lowerhalf remains, and saves new values
function lowerhalf() {
  if (l <= 1) return false;
  arrNumbers = arrNumbers.slice(
    arrNumbers.indexOf(min),
    arrNumbers.indexOf(middle) + 1
  );
  l = arrNumbers.length - 1;
  min = arrNumbers[0];
  max = arrNumbers[l];
  middle = arrNumbers[findMiddleIndex(arrNumbers) - 1];
  return true;
}

function setComment() {
  if (count <= 3) comment = `Fantastic!`;
  else if (count <= 5) comment = `Good.`;
  else if (count > 5) comment = `Meh.`;
}
