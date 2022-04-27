const player1Img = document.querySelector(".img1");
const player2Img = document.querySelector(".img2");

const resultHeading = document.querySelector(".container h1");

const gameRun = function () {
  const randomNum1 = Math.floor(Math.random() * 6) + 1;
  const randomNum2 = Math.floor(Math.random() * 6) + 1;

  console.log(randomNum1);
  console.log(typeof randomNum1);

  player1Img.setAttribute("src", `images/dice${randomNum1}.png`);
  player2Img.setAttribute("src", `images/dice${randomNum2}.png`);

  if (randomNum1 > randomNum2) {
    resultHeading.textContent = "🚩 Player 1 Wins!";
  } else if (randomNum1 < randomNum2) {
    resultHeading.textContent = " Player 2 Wins! 🚩";
  } else {
    resultHeading.textContent = "DRAW!";
  }
};

gameRun();
