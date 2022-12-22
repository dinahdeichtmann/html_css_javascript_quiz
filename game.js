// DOM ELEMENTS

const questionElement = document.getElementById("question");
const choicesElements = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterElement = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');

// VARIABLES

let currentQuestion;
let acceptingAnswers = false;
let score;
let questionCounter;
let availableQuestions;

// CONSTANTS

const correctBonus = 10;
const maxQuestions = 3;

// DUMMY DATA

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// FUNCTIONS

function startGame() {

    // set variables
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    // display a (new) question
    getNewQuestion();
};


function getNewQuestion() {

    // take the user to the end page if there are no more available questions OR the limit has been reached
    if (availableQuestions === 0 || questionCounter >= maxQuestions) {
        return window.location.assign('/end.html');
    }

    // increment the question counter
    questionCounter++;
    questionCounterElement.innerText = `${questionCounter}/${maxQuestions}`

    // display a question at random
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    // display the question's choices
    choicesElements.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    // remove the current question from available questions
    availableQuestions.splice(questionIndex, 1);

    // let the user select an answer
    acceptingAnswers = true;
};

function incrementScore(number) {
    score += number
    scoreElement.innerText = score;
}

// EVENT LISTENERS

window.addEventListener('load', startGame());

choicesElements.forEach(choice => {

    choice.addEventListener('click', event => {

        // ignore click action if not accepting answers
        if (!acceptingAnswers) {
            return
        };
        
        // stop accepting answers once the user clicked on a choice
        acceptingAnswers = false;

        // check that answer is correct
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // apply fitting HTML class
        selectedChoice.parentElement.classList.add(classToApply);

        //increment score
        if (classToApply == 'correct') {
            incrementScore(correctBonus);
        };

        // remove class and load next question after 1s
        setTimeout( () => {

            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);

    });
});