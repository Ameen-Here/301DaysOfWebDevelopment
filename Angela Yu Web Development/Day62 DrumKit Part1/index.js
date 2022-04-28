const drums = document.querySelectorAll(".drum");

var sound;
const arr = ["w", "a", "s", "d", "j", "k", "l"];

function playSound(buttons) {
  sound = new Audio(`sounds/${buttons}.mp3`);
  sound.play();
}

// Event Listeners
document.addEventListener("keydown", (e) => {
  if (arr.includes(e.key)) {
    playSound(e.key);
  }
});

for (let drum of drums) {
  console.log(drum);
  drum.addEventListener("click", () => {
    playSound(drum.textContent);
  });
}
