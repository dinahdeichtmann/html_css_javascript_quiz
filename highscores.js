// DOM ELEMENTS

const highScoresListElement = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresListElement.innerHTML = highScores
                                        .map(score => {
                                            return `<li class='high-score'><span>${score.name}</span><span>${score.score}</span></li>`;
                                        })
                                        .join("");