import { limitless } from "./gameState";

// Game variables
let balance = 100;
const spinCost = 10;
const symbols = [
  { name: "lemon", image: "lemon.png", value: 10 },
  { name: "grapes", image: "grapes.png", value: 30 },
  { name: "cherries", image: "cherries.png", value: 15 },
  { name: "orange", image: "orange.png", value: 20 },
  { name: "seven", image: "seven.png", value: 100 },
  { name: "watermelon", image: "watermelon.png", value: 50 },
];

const balanceDisplay = document.getElementById("balance");
const spinBtn = document.getElementById("spin-btn");
const resultDisplay = document.getElementById("result");
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3"),
];

function init() {
  updateBalance();
  spinBtn.addEventListener("click", spin);

  slots.forEach((slot) => {
    slot.innerHTML = "";
  });
}

function updateBalance() {
  balanceDisplay.textContent = balance;
  spinBtn.disabled = balance < spinCost;
}

function spin() {
  if (balance < spinCost) return;

  balance -= spinCost;
  updateBalance();

  resultDisplay.textContent = "";
  resultDisplay.className = "result";

  spinBtn.disabled = true;

  const results = [];
  for (let i = 0; i < 3; i++) {
    results.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  animateSlots(results);
}

function animateSlots(results) {
  const spinDuration = 1000;
  const spinInterval = 100;
  const spins = spinDuration / spinInterval;

  let spinsRemaining = spins;

  const spinIntervalId = setInterval(() => {
    slots.forEach((slot, index) => {
      if (spinsRemaining > 0) {
        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];
        slot.innerHTML = `<img src="/assets/${randomSymbol.image}" alt="${randomSymbol.name}">`;
      } else {
        slot.innerHTML = `<img src="/assets/${results[index].image}" alt="${results[index].name}">`;
      }
    });

    spinsRemaining--;

    if (spinsRemaining < 0) {
      clearInterval(spinIntervalId);
      evaluateResults(results);
    }
  }, spinInterval);
}

function evaluateResults(results) {
  const allMatch =
    results[0].name === results[1].name && results[1].name === results[2].name;
  const twoMatch =
    results[0].name === results[1].name ||
    results[1].name === results[2].name ||
    results[0].name === results[2].name;

  let winnings = 0;

  if (allMatch) {
    winnings = results[0].value;
    resultDisplay.textContent = `ჯეკპოტი! თქვენ მოიგეთ $${winnings}!`;
    resultDisplay.classList.add("win");
  } else if (twoMatch) {
    winnings = 5;
    resultDisplay.textContent = `ორი დაემთხვა! თქვენ მოიგეთ $${winnings}!`;
    resultDisplay.classList.add("win");
  } else {
    resultDisplay.textContent = "ჩემი ფეხხები, ვერაფერიც ვერმოიგეთ!";
    resultDisplay.classList.add("lose");
  }

  balance += winnings;
  updateBalance();
}

window.addEventListener("DOMContentLoaded", init);
