const answers = {
  1: "echo",
  2: "42",
  3: "future",
  4: "64"
};

const puzzlePoints = 25;

window.onload = function () {
  updateScoreBox();

  if (document.getElementById("finalScore")) {
    showFinalScore();
  }
};

function getScore() {
  return Number(localStorage.getItem("aiPuzzleScore")) || 0;
}

function setScore(score) {
  localStorage.setItem("aiPuzzleScore", score);
}

function updateScoreBox() {
  const scoreBox = document.getElementById("scoreBox");
  if (scoreBox) {
    scoreBox.textContent = "Score: " + getScore();
  }
}

function checkAnswer(puzzleNumber) {
  const input = document.getElementById("answerInput");
  const resultMsg = document.getElementById("resultMsg");

  if (!input || !resultMsg) return;

  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = answers[puzzleNumber];

  if (userAnswer === "") {
    resultMsg.textContent = "Please type your answer first.";
    resultMsg.className = "result-msg wrong";
    return;
  }

  const solvedKey = "puzzle" + puzzleNumber + "Solved";

  if (userAnswer === correctAnswer) {
    if (localStorage.getItem(solvedKey) !== "true") {
      let newScore = getScore() + puzzlePoints;
      setScore(newScore);
      localStorage.setItem(solvedKey, "true");
    }

    resultMsg.textContent = "Correct! AI confirms your answer.";
    resultMsg.className = "result-msg correct";
    input.disabled = true;
  } else {
    resultMsg.textContent = "Wrong answer. Think again like an AI.";
    resultMsg.className = "result-msg wrong";
  }

  updateScoreBox();
}

function showFinalScore() {
  const score = getScore();

  const finalScore = document.getElementById("finalScore");
  const scoreTitle = document.getElementById("scoreTitle");
  const scoreMessage = document.getElementById("scoreMessage");

  finalScore.textContent = score;

  if (score === 100) {
    scoreTitle.textContent = "Genius Level!";
    scoreMessage.textContent = "Excellent! You solved every puzzle correctly.";
  } else if (score >= 75) {
    scoreTitle.textContent = "Smart Thinker!";
    scoreMessage.textContent = "Great work! Your logic power is strong.";
  } else if (score >= 50) {
    scoreTitle.textContent = "Good Attempt!";
    scoreMessage.textContent = "You solved some puzzles. Try again to improve your score.";
  } else if (score >= 25) {
    scoreTitle.textContent = "Keep Practicing!";
    scoreMessage.textContent = "Your puzzle journey has started. Play again and improve.";
  } else {
    scoreTitle.textContent = "Try Again!";
    scoreMessage.textContent = "AI believes you can do better. Restart and solve again.";
  }
}

function resetGame() {
  localStorage.removeItem("aiPuzzleScore");
  localStorage.removeItem("puzzle1Solved");
  localStorage.removeItem("puzzle2Solved");
  localStorage.removeItem("puzzle3Solved");
  localStorage.removeItem("puzzle4Solved");
    }
