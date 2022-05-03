// $("h1").css("color", "red");
const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let isGameStarted = false;
let clickAllowed = true;

const selectedCard = async function (color) {
  playSound(color);
  console.log("i am ready");
  $(`.${color}`).fadeOut(500).fadeIn(500);
};

const playSound = function (color) {
  let audio = new Audio(`sounds/${color}.mp3`);

  audio.play();
};

const animatedPress = function (currentColor) {
  $(`.${currentColor}`).toggleClass("pressed");
  setTimeout(() => $(`.${currentColor}`).toggleClass("pressed"), 100);
};

$(".btn").click(function () {
  if (!clickAllowed) {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1, userChosenColor);
  }
});

const checkAnswer = function (currentLevel, userChosenColor) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct");
    playSound(userChosenColor);
    animatedPress(userChosenColor);
    if (currentLevel === gamePattern.length - 1) {
      console.log("Level Passed");
      setTimeout(nextSequence, 1500);
      clickAllowed = true;
    }
  } else {
    clickAllowed = true;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").toggleClass("game-over"), 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    isGameStarted = false;
    gamePattern = [];
    level = 0;

    console.log("wrong");
  }
};

const nextSequence = function () {
  userClickedPattern = [];

  level++;
  $("h1").text(level);
  const randomPick = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomPick];
  gamePattern.push(randomChosenColor);
  selectedCard(randomChosenColor);
  clickAllowed = false;
};

$(document).on("keypress", function () {
  if (!isGameStarted) {
    isGameStarted = true;
    nextSequence();
  }
});
