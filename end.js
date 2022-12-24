// DOM ELEMENTS

const usernameElement = document.getElementById('username');
const saveScoreElement = document.getElementById('save-score');
const finalScoreElement = document.getElementById('final-score');

finalScoreElement.innerText = mostRecentScore;

// LOCAL STORAGE

const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// CONSTANT

const maxHighScores = 5;

// FUNCTION

function saveHighScore(event) {
    
    event.preventDefault();

    // create a score object with the user's score and username
    const score = {
        score: mostRecentScore,
        name: usernameElement.value
    };

    // add that object to the high scores list
    highScores.push(score);

    // sort the scores from highest to lowest and limit them to the top [maxHighScores]
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(maxHighScores);

    // save the top high scores to local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // redirect to the home page
    window.location.assign('/');
};

// EVENT LISTENER

usernameElement.addEventListener('keyup', () => {
    saveScoreElement.disabled = !usernameElement.value;
});