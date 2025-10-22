"use strict";

window.addEventListener("DOMContentLoaded", main);

const number = 42;

function main() {
  console.log("JavaScript is running!");

  document.querySelector("#btn_guess").addEventListener("click", buttonClicked);
}

function buttonClicked() {
  console.log("Button clicked!");
  // recieve guess
  const guess = document.querySelector("#guess").valueAsNumber;
  console.log(guess);
  // compare guess with number
  if (guess > number) {
    console.log("That was too high");
    document
      .querySelector("#guesses")
      .insertAdjacentHTML(
        "beforeend",
        `<li>You guessed ${guess} - that was too high!</li>`
      );
  }
  // handle too high
  // handle too low
  // handle correct guess
  if (guess == number) {
    //TODO: also write that the guess was correct
    document
      .querySelector("#btn_guess")
      .removeEventListener("click", buttonClicked);
  }
}
