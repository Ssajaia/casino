export const symbols = [
  { name: "lemon", image: "lemon.png", value: 20 },
  { name: "grapes", image: "grapes.png", value: 60 },
  { name: "cherries", image: "cherries.png", value: 30 },
  { name: "orange", image: "orange.png", value: 40 },
  { name: "seven", image: "seven.png", value: 1000 },
  { name: "watermelon", image: "watermelon.png", value: 500 },
];

const b = document.getElementById("unlimited");

export const spinCost = 10;
let balance = 100;

export function getBalance() {
  return balance;
}

export function multiplyBalance() {
  balance *= 1000;
  return balance;
}

export function updateBalance(amount) {
  balance += amount;
  return balance;
}
