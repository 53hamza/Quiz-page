let correctAnswer;
let click2;
let incorrectAnswers;
let questions;
let i = 0;
let questionIndex = 0;
let marks = 0;
let totalMarks = 0;
let test;

//timer of 10minutes :
// Set the timer duration to 10 minutes (in seconds)
const timerDuration = 10 * 60; // 10 minutes * 60 seconds

// Function to update the timer display
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timerDisplay = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.getElementById('timer').textContent = timerDisplay;
}

// Function to display a message when the timer is up
function displayTimeOverMessage() {
    document.getElementById('message').textContent = 'Time Over!';
}

// Initialize the timer
let timer = timerDuration;
updateTimerDisplay(timer);

// Start the countdown
const interval = setInterval(function () {
    timer--;
    updateTimerDisplay(timer);

    if (timer === 0) {
        clearInterval(interval); // Stop the countdown
        displayTimeOverMessage();
    }
}, 1000); // Update the timer every 1 second


// Function to get the value of a query parameter from the URL
function getQueryParam(parameterName) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(parameterName);
}

// Get the selected category from the URL
const selectedCategory = getQueryParam('category');

if (selectedCategory) {
    // Load the quiz API based on the selected category
    myApi(selectedCategory);
} else {
    // Handle the case where no category is selected
    console.error('No category selected.');
}

async function myApi(category) {
    let result = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`);
    let data = await result.json();
    questions = await data.results[questionIndex];

    document.getElementById('p1').innerText = 'Question No.' + (questionIndex + 1);

    const questionNo1 = questions.question;
    document.getElementById('p2').innerText = questionNo1;
    incorrectAnswers = questions.incorrect_answers;
    correctAnswer = questions.correct_answer;

    let arrays = [incorrectAnswers[0], incorrectAnswers[1], incorrectAnswers[2], correctAnswer];
    let elements = document.getElementsByClassName('answers');

    for (i = 0; i <= 3; i++) {
        elements[i].innerText = arrays[i];
    }
}

var items = document.getElementsByClassName('answers');
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function () {
        for (let j = 0; j < items.length; j++) {
            items[j].classList.remove('changing');
        }
        this.classList.add('changing');
        var click1 = document.getElementsByClassName('changing');
        click2 = click1[0].innerText;
    });
}

var nextButton = document.getElementById('button1');
nextButton.addEventListener('click', checkAnswer);
function checkAnswer() {
    if (click2 === correctAnswer) {
        marks = 1;
        totalMarks += marks;
    } else if (incorrectAnswers.includes(click2)) {
        marks = 0;
        totalMarks += marks;
    }
}

nextButton.addEventListener('click', onClickingNext);
async function onClickingNext() {
    questionIndex++;
    let result = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple`);
    let data = await result.json();
    if (questionIndex < data.results.length) {
        questions = await data.results[questionIndex];
        document.getElementById('p1').innerText = 'Question No.' + (questionIndex + 1);
        const questionNo1 = questions.question;
        document.getElementById('p2').innerText = questionNo1;
        incorrectAnswers = questions.incorrect_answers;
        correctAnswer = questions.correct_answer;

        let arrays = [incorrectAnswers[0], incorrectAnswers[1], incorrectAnswers[2], correctAnswer];
        let elements = document.getElementsByClassName('answers');

        for (i = 0; i <= 3; i++) {
            elements[i].innerText = arrays[i];
        }

        var items = document.getElementsByClassName('answers');
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener('click', function () {
                for (let j = 0; j < items.length; j++) {
                    items[j].classList.remove('changing');
                }
                this.classList.add('changing');
                var click1 = document.getElementsByClassName('changing');
                click2 = click1[0].innerText;
            });
        }
        
        totalMarks += marks;
    } else {
        alert("No questions left");
        alert("Your total marks is: " + totalMarks);
    }
}

myApi();

