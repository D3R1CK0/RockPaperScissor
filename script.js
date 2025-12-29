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