// --- Quiz Data ---
let questions = [
    {
        question: "HTML stands for ?",
        options: ["hyper text markup language", "Hyper text makeup language", "Hyper test markup language", "hyper text makeup langueses"],
        correctAnswer: 0
    },
    {
        question: "Who wrote the code ?",
        options: ["You", "Me", "Coder", "Developer"],
        correctAnswer: 2
    },
    {
        question: "Who is the Father of this quiz ?",
        options: ["You", "Me", "chatGpt", "None of them"],
        correctAnswer: 3
    },
    { 
        question: "Who is BGMI pro ?",
        options: ["sagar", "shubham and pradeep", "Dugesh + OM", "abhishek", "none of them"],
        correctAnswer: 4
    },
    { 
        question: "Who is good in 1 vs 1?",
        options: ["sagar", "shubham and pradeep", "Dugesh + OM", "abhishek", "none of them"],
        correctAnswer: 0
    },
    { 
        question: "Who is good at riding a Bike?",
        options: ["sagar", "shubham and pradeep", "Dugesh + OM", "abhishek", "none of them"],
        correctAnswer: 1
    },
    { 
        question: "A bat and a ball together cost \$1.10 in total. The bat costs \$1.00 more than the ball. How much does the ball cost?",
        options: [" \$1.00 ", "\$0.5", "\$0.15", "\$1.15", "\$0.05"],
        correctAnswer: 4
    },
    {
        question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["5 min", "10min", "1 min", "100 min"],
        correctAnswer: 0
    },
    {
        question: "who can defead us in running ?",
        options: ["sagar", "shubham and pradeep", "Dugesh + OM", "Abhishek", "none of them"],
        correctAnswer: 3
    },
    {
        question: "_______ can learn anything ?",
        options: ["sagar", "shubham and pradeep", "Dugesh + OM", "Abhishek", "One"],
        correctAnswer: 4
    }
];

// --- State Variables ---
let userName = "";
let selectedAnswer = [];
let currentQuestion = 0;
let quizSubmitted = false;

// --- DOM Elements ---
const NameScreen = document.getElementById("UsernameScreen");
const QuizScreen = document.getElementById("quizScreen");
const LeaderboardScreen = document.getElementById("leaderboardScreen");

const Playquizbtn = document.getElementById("playQuiz");
const playerNameInput = document.getElementById("playerName");
const submitbtn = document.getElementById("submit");
const forwardBtn = document.querySelector("#forwardbtn");
const backbtn = document.querySelector('#backwardbtn');
const questionCounter = document.querySelector('.counterqn');
const darkmodebtn = document.querySelector("#darkMode");
const restartBtn = document.getElementById("restartBtn");
const leaderBoardRowElement = document.getElementById("leaderBoardrow");

// --- Screen Navigation ---
function showTheScreen(showToScreen) {
    [NameScreen, QuizScreen, LeaderboardScreen].forEach(screen => screen.classList.remove("active"));
    showToScreen.classList.add("active");
}

// --- Event Listeners: Initialization & Authentication ---
Playquizbtn.addEventListener("click", () => {
    userName = playerNameInput.value.trim();
    if (!userName) return alert("Please enter your name!");
    
    resetQuizState(); 
    showQuestions();
    showTheScreen(QuizScreen);
});

// --- Quiz Engine Logic ---
function showQuestions() {
    let questionData = questions[currentQuestion];
    let questionbox = document.querySelector('.questionss');
    questionbox.textContent = questionData.question;

    let optionContainer = document.querySelector('.optionss');
    optionContainer.innerHTML = "";
    
    questionData.options.forEach(function(option, index) {
        let optionElement = document.createElement("div");
        optionElement.innerText = option;

        // Apply visual markers for states
        if (selectedAnswer[currentQuestion] === index) {
            optionElement.classList.add("selected");
        }
        if (quizSubmitted) {
            optionElement.classList.add("disabled");
        }

        optionElement.addEventListener("click", function() {
            if (quizSubmitted) return;
            selectedAnswer[currentQuestion] = index;
            showQuestions();
        });
        
        optionContainer.append(optionElement);
    });

    // Update operational info metrics
    questionCounter.innerText = `${currentQuestion + 1}/${questions.length}`;

    // Show submit button only on the last question if not already submitted
    if (currentQuestion === questions.length - 1 && !quizSubmitted) {
        submitbtn.style.display = "block";
    } else {
        submitbtn.style.display = "none";
    }
}

forwardBtn.addEventListener("click", function() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestions();
    }
});

backbtn.addEventListener("click", function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestions();
    }
});

// --- Scoring & Evaluation Engine ---
function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (selectedAnswer[i] === questions[i].correctAnswer) {
            score++;
        }
    }
    return score;
}

submitbtn.addEventListener("click", function() {
    let confirmed = confirm("Do you want to submit ?");
    if (confirmed) {
        let score = calculateScore();
        quizSubmitted = true;
        
        let resultshow = document.querySelector(".result");
        resultshow.innerText = `Your Score ${score}/${questions.length}`;
        submitbtn.style.display = "none";
        
        // Save local stats, process rankings, shift screen layout view
        saveScore(userName, score);
        displayLeaderboard();
        showTheScreen(LeaderboardScreen);
    }
});

// --- Local Storage Leaderboard Logic ---
function saveScore(name, score) {
    const highscores = JSON.parse(localStorage.getItem("quiz_leaderboard")) || [];
    highscores.push({ name: name, score: score });
    
    // Sort items high score to low score
    highscores.sort((a, b) => b.score - a.score);
    
    // Clip arrays to capture the top 5 records
    const topScores = highscores.slice(0, 5);
    localStorage.setItem("quiz_leaderboard", JSON.stringify(topScores));
}

function displayLeaderboard() {
    const highscores = JSON.parse(localStorage.getItem("quiz_leaderboard")) || [];
    
    if (leaderBoardRowElement) {
        leaderBoardRowElement.innerHTML = highscores.map((entry, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}/${questions.length}</td>
            </tr>
        `).join("");
    }
}

// --- Lifecycle State Engine Reset ---
function resetQuizState() {
    selectedAnswer = [];
    currentQuestion = 0;
    quizSubmitted = false;
    let resultshow = document.querySelector(".result");
    if (resultshow) resultshow.innerText = "";
}

restartBtn.addEventListener("click", function() {
    playerNameInput.value = ""; 
    showTheScreen(NameScreen); 
});

// --- Global Custom Interface Elements ---
darkmodebtn.addEventListener("click", function() {
    document.body.classList.toggle("darkMode");
});

// Initial boot logic setup configuration setup
showQuestions();
