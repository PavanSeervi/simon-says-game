let gameSequence = [];
let userSequence = [];
const buttons = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

const h2 = document.querySelector("h2");
const highScoreElement = document.getElementById("high-score");

highScoreElement.textContent = highScore;

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function flashButton(button) {
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 250);
}

function userFlashButton(button) {
  button.classList.add("userflash");
  setTimeout(() => button.classList.remove("userflash"), 250);
}

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randomColor = buttons[Math.floor(Math.random() * buttons.length)];
  const randomButton = document.getElementById(randomColor);
  gameSequence.push(randomColor);
  flashButton(randomButton);
}

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 150);
    updateHighScore();
    resetGame();
  }
}

function handleButtonClick() {
  const button = this;
  userFlashButton(button);

  const userColor = button.id;
  userSequence.push(userColor);

  checkAnswer(userSequence.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", handleButtonClick));

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);
    highScoreElement.textContent = highScore;
  }
}

function resetGame() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
