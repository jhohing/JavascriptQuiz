// pull in page elements
var highscoreDiv = document.querySelector("#highscore");
var gameTimerEl = document.querySelector("#gameTimer");
var mainEl = document.querySelector("#details");

// set global variables
var score = 0;
var quiz = [
    {
        question: "Inside which HTML element do you put Javascript?",
        answers: ["A: <head>", "B: <script>", "C: <meta>", "D: <style>"],
        correctAnswer: "b"
    },
    {
        question: "Which of the following is the correct syntax to display \"Coding is fun!!\" in an alert box using JavaScript?",
        answers: ["A: alert-box(\"Coding is fun!!\");", "B: confirm(\"Coding is fun!!\");", "C: alert(\"Coding is fun!!\");"],
        correctAnswer: "c"
    },
    {
        question: "What are the types of Pop up boxes available in JavaScript?",
        answers: ["A: Alert", "B: Prompt", "C: Confirm", "D: All of the above"],
        correctAnswer: "d"
    },
    {
        question: "Javascript string using double quotes is exactly the same as a string using single quotes?",
        answers: ["A: True", "B: False"],
        correctAnswer: "a"
    },
    {
        question: "What should appear at the very end of your JavaScript?",
        answers: ["A: The END Statement", "B: The </script>", "C: The <script>"],
        correctAnswer: "b"
    },
    {
        question: "Which of the following is not a way to select an element in a document?",
        answers: ["A: document.selector()", "B: document.querySelector()", "C: document.getElementById()", "D: document.getElementsByClassName()"],
        correctAnswer: "a"
    },

];

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

// create instructions
main();

// function to display instructions
function main() {
    clearDetails();
    reset();

    // creates elements with the instructions for the game
    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = "You will have 60 seconds to answer 6 questions. For each incorrect answer you will lose 10 seconds.";

    // creates button to start the game
    let startQuiz = document.createElement("button");
    startQuiz.setAttribute("id", "startQuiz");
    startQuiz.setAttribute("class", "btn btn-secondary");
    startQuiz.textContent = "Start Quiz";

    mainEl.appendChild(instructions);
    mainEl.appendChild(startQuiz);

    startQuiz.addEventListener("click", function () {
        playQuiz(quiz);
    });
}


// function to clear details element of all children
function clearDetails() {
    mainEl.innerHTML = "";
}

function reset() {
    score = 0;

    gameDuration = 0;
    gameSecElapsed = 0;
    gameInterval;
}

//start game
function playQuiz() {

    // displays timers
    gameTimerEl.setAttribute("style", "visibility: visible;");

    // Start timers here
    gameDuration = 60;

    startGameTimer();
    renderTime();

    //go to first question
    presentQuestion();
}

// function to redraw screen with  question 
function presentQuestion() {

    //reset time allows to answer question
    questionSecElapsed = 0;

    // checks for no more questions and exits
    if (quiz.length === 0) {
        endOfGame();
        return;
    }

    curQuestion = quiz.pop();

    //clears instructions to display questions
    clearDetails();

    // add question to screen
    //build out display for new item
    var question = document.createElement("h1");
    // adds data value
    question.setAttribute("question", curQuestion.question);
    question.textContent = curQuestion.question;
    mainEl.appendChild(question)

    // create list as container to listen for answers
    var choiceBox = document.createElement("ul");
    choiceBox.setAttribute("id", "choiceBox");
    mainEl.appendChild(choiceBox);

    //adds answers to screen
    for (var i = 0; i < curQuestion.answers.length; i++) {
        // creates variable for each choice item
        var listChoice = document.createElement("li");
        // adds data value
        listChoice.setAttribute("choice-value", curQuestion.answers[i]);
        listChoice.setAttribute("id", "questionNum-" + i);
        listChoice.textContent = curQuestion.answers[i];
        //add choice to page
        choiceBox.appendChild(listChoice)
    }

    // get answer from user
    // using the anymous function delays the invocation of the scoreAnswer
    choiceBox.addEventListener("click", function () {
        scoreAnswer();
    });
    // calls for the next questions
}

function scoreAnswer(event) {

    event.preventDefault();

    selectedItem = event.target.value;

    // ensure that the selected choice matches the correct answer
    if (selectedItem === quiz.correctAnswer) 
    {
        score += gameDuration - gameSecElapsed;
    }
    else 
    {
         //penelty for being wrong
        gameDuration -= 10;
    }

        showAnswers(cur);
}

function showAnswers(cur) {
    for (var i = 0; i < cur.answers.length; i++) {

        var questionid = "#questionNum-" + i;
        var questionrow = document.querySelector(questionid);

        if (cur.answers[i] !== cur.correctAnswer) {
            questionrow.setAttribute("style", "background-color: red");
        }
        else {
            questionrow.setAttribute("style", "background-color: green");
        }
    }
    // pause so user can see results
    setTimeout(presentQuestion, 500);
}

// function to set time for game timer
function setGameTime() {
    clearInterval(gameInterval);
    gameSeconds = gameDuration;
}


function renderTime() {

    gameTimerEl.textContent = gameDuration - gameSecElapsed;

    if ((gameDuration - gameSecElapsed) < 1) {
        endOfGame();
    }
}

function startGameTimer() {
    setGameTime();

    gameInterval = setInterval(function () {
        gameSecElapsed++;
        renderTime();
    }, 1000);
}

function stopTime() {
    gameSeconds = 0;
    clearInterval(gameInterval);
}

// function of end of game
function endOfGame() {
    stopTime();
    clearDetails();

    gameTimerEl.setAttribute("style", "visibility: hidden;");

    var heading = document.createElement("p");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "GAME OVER - I hope you have enjoyed this";

    // creates elements with the instructions for the game
    var instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = " Your score is " + score;

    // creates button to start the game
    var playAgain = document.createElement("button");
    playAgain.setAttribute("id", "playAgain");
    playAgain.setAttribute("class", "btn btn-secondary");
    playAgain.textContent = "Play again";

    // creates input for user to add initials
    var par = document.createElement("p");

    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for", "userInitials");
    initialsLabel.textContent = "Enter Initials: ";

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id", "userInitials");
    initialsInput.setAttribute("name", "userInitials");
    initialsInput.setAttribute("minlength", "3");
    initialsInput.setAttribute("maxlength", "3");
    initialsInput.setAttribute("size", "3");


    mainEl.appendChild(heading);
    mainEl.appendChild(instructions);
    mainEl.appendChild(initialsLabel);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(par);
    mainEl.appendChild(playAgain);

    playAgain.addEventListener("click", init);

    initialsInput.addEventListener("input", function () {
        initialsInput.value = initialsInput.value.toUpperCase();
        if (initialsInput.value.length === 3) {

            //create object for this score
            var thisScore = [{ name: initialsInput.value, score: score }];

            //get highscores from memory
            var storedScores = JSON.parse(localStorage.getItem("highScores"));
            if (test) { console.log("storedScore", storedScores); }

            if (storedScores !== null) {
                storedScores.push(thisScore[0]);
            } else {
                storedScores = thisScore;
            }

            localStorage.setItem("highScores", JSON.stringify(storedScores));
            highScores();
        }
    });
}

function highScores() {
    stopTime();
    clearDetails();

    gamertimerEl.setAttribute("style", "visibility: hidden;");

    //get scores from storage
    var storedScores = JSON.parse(localStorage.getItem("highScores"));

    // create heading
    var heading = document.createElement("h2");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "Top 5 High Score Hall of Fame";

    mainEl.appendChild(heading);

    // Render a new li for each score
    if (storedScores !== null) {
        // sort scores
        storedScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

        // sets the number of scores to display to 5 or the number of games played. Which ever is less
        let numScores2Display = 5;
        if (storedScores.length < 5) {
            numScores2Display = storedScores.length;
        }

        for (var i = 0; i < numScores2Display; i++) {
            var s = storedScores[i];

            var p = document.createElement("p");
            p.textContent = s.name + " " + s.score;
            mainEl.appendChild(p);
        }
    } else {
        var p = document.createElement("p");
        p.textContent = "Your Initials Here!"
        mainEl.appendChild(p);
    }


    // creates button to start the game
    let playAgain = document.createElement("button");
    playAgain.setAttribute("id", "playAgain");
    playAgain.setAttribute("class", "btn btn-secondary");
    playAgain.textContent = "Play!";

    mainEl.appendChild(playAgain);

    playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);