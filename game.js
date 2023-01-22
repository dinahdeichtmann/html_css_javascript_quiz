// DOM ELEMENTS

const questionElement = document.getElementById("question");
const choicesElements = Array.from(
  document.getElementsByClassName("choice-text")
);
const progressTextElement = document.getElementById("progress-text");
const scoreElement = document.getElementById("score");
const innerProgressBarElement = document.getElementById("inner-progress-bar");
const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");

// VARIABLES
let currentQuestion;
let acceptingAnswers = false;
let score;
let questionCounter;
let availableQuestions;
let questions = [];

// CONSTANTS

const correctBonus = 10;
const maxQuestions = 5;

// API

const url =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

      const answerChoices = [...loadedQuestion.incorrect_answers];

      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });
    startGame();
  })
  .catch((error) => {
    console.error(error);
  });

// FUNCTIONS

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();

  gameElement.classList.remove("hidden");
  loaderElement.classList.add("hidden");
}

function getNewQuestion() {
  if (availableQuestions === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressTextElement.innerText = `Question ${questionCounter}/${maxQuestions}`;

  innerProgressBarElement.style.width = `${
    (questionCounter / maxQuestions) * 100
  }%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  choicesElements.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

function incrementScore(number) {
  score += number;
  scoreElement.innerText = score;
}

// EVENT LISTENERS

choicesElements.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) {
      return;
    }

    acceptingAnswers = false;

    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    if (classToApply == "correct") {
      incrementScore(correctBonus);
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
