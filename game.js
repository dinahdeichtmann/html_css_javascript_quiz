// DOM ELEMENTS

const questionElement = document.getElementById("question");
const choicesElements = Array.from(document.getElementsByClassName("choice-text"));
//console.log(choicesElements);

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

    // (re)set the question counter and score
    questionCounter = 0;
    score = 0;
    // make a copy of the questions array
    availableQuestions = [...questions];
    // display a (new) question         
    getNewQuestion();
};

function getNewQuestion() {

    // take the user to the end page if there are no more available questions OR the set number of questions for this game has been reached
    if (availableQuestions === 0 || questionCounter >= maxQuestions) {
        // go to the end page
        return window.location.assign('/end.html');
    }

    // increment the question counter
    questionCounter++;

    // get a random number between 0 and [the maximum of questions]
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // get a question based on the random number 
    currentQuestion = availableQuestions[questionIndex];
    // display the text of the question on the page
    questionElement.innerText = currentQuestion.question;

    choicesElements.forEach(choice => {
        // get the number from the dataset property (referencing the HTML custom attribute 'data-number')
        const number = choice.dataset['number'];
        // display the text of the choice[1, 2, 3, 4] (see dummy data)
        choice.innerText = currentQuestion['choice' + number];
    });

    // remove the current question from the available questions so that it doesn't show up again in this session
    availableQuestions.splice(questionIndex, 1);
    // let user select an answer now that the question is fully loaded
    acceptingAnswers = true;
};

// EVENT LISTENERS

window.addEventListener('load', startGame());

choicesElements.forEach(choice => {

    choice.addEventListener('click', event => {

        // ignore click action if not accepting answers
        if (!acceptingAnswers) {
            return
        };
        
        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // once the current question is answered, get a new one
        getNewQuestion();

    });
});