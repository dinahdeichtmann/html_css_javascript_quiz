// DOM ELEMENTS

const usernameElement = document.getElementById('username');
const saveScoreElement = document.getElementById('save-score');
const finalScoreElement = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScoreElement.innerText = mostRecentScore;

// FUNCTIONS

function saveHighScore(event) {
    //
};

// EVENT LISTENERS

usernameElement.addEventListener('keyup', () => {
    saveScoreElement.disabled = !usernameElement.value;
});