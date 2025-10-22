"use strict";

window.addEventListener("DOMContentLoaded", main);

function main() {
  console.log("JavaScript is running!");

  // add eventlistener for btn_start
  document.querySelector("#btn_start").addEventListener("click", startGame);
  // event delegation on the list
  document
    .querySelector("#guesses")
    .addEventListener("click", handleGuessClick);
}

function startGame() {
  console.log("Game started!");

  const list = document.getElementById("guesses");
  // Clear list
  while (list.firstElementChild) {
    list.removeChild(list.firstElementChild);
  }

  addGuess();
}

function handleGuessClick(event) {
  const clickedButton = event.target;
  if (!(clickedButton instanceof HTMLButtonElement)) return;

  const li = clickedButton.closest("li");
  const number = li.dataset.guess; // read stored guess

  if (clickedButton.classList.contains("btn_low")) {
    console.log("TOO LOW");
    li.innerHTML = `I'm guessing ${number} → That was too low!`;
    addGuess();
  } else if (clickedButton.classList.contains("btn_high")) {
    console.log("TOO HIGH");
    li.innerHTML = `I'm guessing ${number} → That was too high!`;
    addGuess();
  } else if (clickedButton.classList.contains("btn_correct")) {
    console.log("CORRECT");
    li.innerHTML = `I'm guessing ${number} → That was correct!`;
  }
}

function addGuess() {
  const list = document.getElementById("guesses");
  const guess = Math.floor(Math.random() * 100) + 1;

  list.insertAdjacentHTML(
    "beforeend",
    `<li data-guess="${guess}">
      I'm guessing ${guess} - Is that 
      <button class="btn_low">too low</button> 
      <button class="btn_high">too high</button> 
      <button class="btn_correct">Correct!</button> ?
    </li>`
  );
}
