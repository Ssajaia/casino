import { symbols, updateBalance, spinCost, getBalance } from "./gameState.js";
import { updateUI, showResult } from "./uiManager.js";

export function spin() {
  if (getBalance() < spinCost) return;

  updateBalance(-spinCost);
  updateUI();

  const results = generateRandomResults();
  animateSlots(results);
}

function generateRandomResults() {
  const results = [];
  for (let i = 0; i < 3; i++) {
    results.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  return results;
}

function animateSlots(results) {
  const spinDuration = 1000;
  const spinInterval = 100;
  const spins = spinDuration / spinInterval;

  let spinsRemaining = spins;
  const slots = [
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3"),
  ];

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
    showResult(`ჯეკპოტი! თქვენ მოიგეთ $${winnings}!`, "win");
  } else if (twoMatch) {
    winnings = 5;
    showResult(`ორი დაემთხვა! თქვენ მოიგეთ $${winnings}!`, "win");
  } else {
    showResult("ჩემი ფეხხები, ვერაფერიც ვერმოიგეთ!", "lose");
  }

  updateBalance(winnings);
  updateUI();
}
