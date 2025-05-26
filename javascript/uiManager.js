import { getBalance, spinCost } from "./gameState.js";

// DOM elements
const balanceDisplay = document.getElementById("balance");
const spinBtn = document.getElementById("spin-btn");
const multiplierBtn = document.getElementById("unlimited");
const resultDisplay = document.getElementById("result");

// Export updateUI function
export function updateUI() {
  balanceDisplay.textContent = getBalance();
  spinBtn.disabled = getBalance() < spinCost;
}

export function showResult(message, className) {
  resultDisplay.textContent = message;
  resultDisplay.className = "result";
  resultDisplay.classList.add(className);
}

export function initializeUI() {
  updateUI();
  spinBtn.addEventListener("click", () => {
    import("./slotMachine.js").then(({ spin }) => spin());
  });

  if (multiplierBtn) {
    multiplierBtn.addEventListener("click", () => {
      import("./gameState.js").then(({ multiplyBalance }) => {
        multiplyBalance(100);
        updateUI();
        showResult("BALANCE 100X! 🚀", "win");
      });
    });
  }
}
