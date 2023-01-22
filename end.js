// DOM ELEMENTS

const usernameElement = document.getElementById("username");
const saveScoreElement = document.getElementById("save-score");
const finalScoreElement = document.getElementById("final-score");

// LOCAL STORAGE

const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScoreElement.innerText = mostRecentScore;

// CONSTANT

const maxHighScores = 5;

// FUNCTION

function saveHighScore(event) {
  event.preventDefault();

  const score = {
    score: mostRecentScore,
    name: usernameElement.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(maxHighScores);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.assign("/");
}

// EVENT LISTENER

usernameElement.addEventListener("keyup", () => {
  saveScoreElement.disabled = !usernameElement.value;
});
