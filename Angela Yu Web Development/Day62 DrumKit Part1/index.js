const drums = document.querySelectorAll(".drum");

var sound;

// const sound = document.querySelector("#mySound");

function playSound(buttons = "nothing") {
  if (buttons === "nothing") {
    console.log(buttons);
    console.log(`sounds/${this.textContent}.mp3`);
    sound = new Audio(`sounds/${this.textContent}.mp3`);
  } else {
    sound = new Audio(`sounds/${buttons}.mp3`);
  }
  sound.play();
}

for (let drum of drums) {
  console.log(drum);
  drum.addEventListener("click", () => {
    playSound(drum.textContent);
  });
}

const arr = ["w", "a", "s", "d", "j", "k", "l"];

document.addEventListener("keydown", (e) => {
  if (arr.includes(e.key)) {
    playSound(e.key);
  }
});
