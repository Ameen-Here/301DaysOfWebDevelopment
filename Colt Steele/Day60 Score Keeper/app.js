const p1 = {
  score: 0,
  button: document.querySelector(".p1Btn"),
  heading: document.querySelector("#p1Player"),
};

const p2 = {
  score: 0,
  button: document.querySelector(".p2Btn"),
  heading: document.querySelector("#p2Player"),
};

const resetBtn = document.querySelector(".reset");
const winningScoreSelectBtn = document.querySelector("#playTo");

let isGameOver = false;

let winningScore = 3;

// Updating Score (Main Function)
const updateScore = function (player, opponent) {
  player.score += 1;
  if (player.score <= winningScore && !isGameOver) {
    updateDisplay();

    if (player.score === winningScore) {
      isGameOver = true;
      player.heading.classList.add("has-text-success");
      opponent.heading.classList.add("has-text-danger");
      disableBtn();
    }
  }
};

// Updating Display
const updateDisplay = function () {
  p1.heading.textContent = p1.score;
  p2.heading.textContent = p2.score;
};

// Disable Buttons function
const disableBtn = () => {
  p1.button.disabled = true;
  p2.button.disabled = true;
};

// Reset Function
const reset = function () {
  for (let p of [p1, p2]) {
    p.score = 0;
    p.heading.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }

  isGameOver = false;

  updateDisplay();
};

// Button Listener

winningScoreSelectBtn.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

p1.button.addEventListener("click", function () {
  updateScore(p1, p2);
});

p2.button.addEventListener("click", function () {
  updateScore(p2, p1);
});

resetBtn.addEventListener("click", reset);
