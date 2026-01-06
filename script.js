let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loss: 0,
  tie: 0,
};
function determineResult(playerMove) {
  let computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") result = "You Lose";
    else if (computerMove === "paper") result = "You Win";
    else {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") result = "You Win";
    else if (computerMove === "paper") result = "Tie";
    else result = "You Lose";
  } else if (playerMove === "rock") {
    if (computerMove === "rock") result = "Tie";
    else if (computerMove === "paper") result = "You Lose";
    else result = "You Win";
  }
  if (result == "You Win") {
    score.wins += 1;
  } else if (result == "You Lose") {
    score.loss += 1;
  } else if (result === "Tie") {
    score.tie += 1;
  }
  document.querySelector(".disResult").innerHTML = result;
  document.querySelector(
    ".disMove"
  ).innerHTML = `You <img class="playImg" src="./assets/${playerMove}-emoji.png" />
      <img class="playImg" src="./assets/${computerMove}-emoji.png" alt="" />Computer`;
  showScore();

  localStorage.setItem("score", JSON.stringify(score));
}

function pickComputerMove() {
  let randomNumber = Math.random();

  if (randomNumber < 1 / 3) return "rock";
  else if (randomNumber < 2 / 3) return "paper";
  else return "scissors";
}
function resetScore() {
  score.wins = 0;
  score.loss = 0;
  score.tie = 0;
  localStorage.setItem("score", JSON.stringify(score));
  showScore();
}
function showScore() {
  document.querySelector(
    ".disScore"
  ).innerHTML = `wins:${score.wins} Losses:${score.loss} Tie:${score.tie}`;
}
let isAutoPlaying = false;
let intervalId;
function autoPly() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      determineResult(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector(".rockBtnEvent").addEventListener("click", () => {
  determineResult("rock");
});
document.querySelector(".paperBtnEvent").addEventListener("click", () => {
  determineResult("paper");
});
document.querySelector(".scissorsBtnEvent").addEventListener("click", () => {
  determineResult("scissors");
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r" ) {
    determineResult("rock");
  } else if (event.key === "p") {
    determineResult("paper");
  } else if (event.key === "s") {
    determineResult("scissors");
  }
});
