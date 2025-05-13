 // Quiz questions
 const questions = [
    {
        question: "1 + 1 = ?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1 // Index of correct option (0-based)
    },
    {
        question: "5 × 3 = ?",
        options: ["8", "10", "15", "20"],
        correctAnswer: 2
    },
    {
        question: "10 - 4 = ?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1
    },
    {
        question: "12 ÷ 4 = ?",
        options: ["2", "3", "4", "6"],
        correctAnswer: 1
    },
    {
        question: "7 + 8 = ?",
        options: ["12", "14", "15", "16"],
        correctAnswer: 2
    },
    {
        question: "16 ÷ 4 =?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2
    },
    {
        question: "2 × 5 =?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 0
    },
    {
        question: "1 windu = ?.. bulan ",
        options: ["100", "90", "95", "96"],
        correctAnswer: 3
    },
    {
        question: "1 triwulan =?.. bulan ",
        options: ["1", "4", "3", "5"],
        correctAnswer: 2
    },
    {
        question: "1 tahun =?.. bulan ",
        options: ["12", "13", "14", "15"],
        correctAnswer: 0
    },
    {
        question: "1 rim = ... lembar",
        options: ["400", "500", "120", "300"],
        correctAnswer: 1
    },
    {
        question: "125 x 8 =?..",
        options: ["1000", "950", "990", "940"],
        correctAnswer: 0
    },
    {
        question: "1000 x 10 =?..",
        options: ["10000", "10001", "10002", "10003"],
        correctAnswer: 0
    },
    {
        question: "1 minggu = ... detik",
        options: ["604800", "604801", "604802", "604803"],
        correctAnswer: 0
    },
    {
        question: "1 jam =... detik",
        options: ["3600", "3601", "3602", "3603"],
        correctAnswer: 0
    },
    {
        question: "1 hari =... detik",
        options: ["86400", "86401", "86402", "86403"],
        correctAnswer: 0
    },
    {
        question: "1 tahun =... detik",
        options: ["31536000", "31536001", "31536002", "31536003"],
        correctAnswer: 0
    },
    {
        question: "1 kg =... gram",
        options: ["1000", "1001", "1002", "1003"],
        correctAnswer: 0
    },
    {
        question: "1 liter =... ml",
        options: ["1000", "1001", "1002", "1003"],
        correctAnswer: 0
    },
    {
        question: "45 : 3 =?..",
        options: ["15", "16", "17", "18"],
        correctAnswer: 0
    }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
const totalQuestions = questions.length;

// DOM elements
const loginSection = document.getElementById('login-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const loginForm = document.getElementById('loginForm');
const playerNameInput = document.getElementById('playerName');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const progressBar = document.getElementById('progress-bar');
const scoreElement = document.getElementById('score');
const maxScoreElement = document.getElementById('max-score');
const resultNameElement = document.getElementById('result-name');
const restartBtn = document.getElementById('restart-btn');
const exitBtn = document.getElementById('exit-btn');

// Event listeners
loginForm.addEventListener('submit', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
exitBtn.addEventListener('click', exitQuiz);

// Start quiz when login form is submitted
function startQuiz(e) {
    e.preventDefault();
    
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert("Please enter your name");
        return;
    }
    
    // Hide login, show quiz
    loginSection.style.display = 'none';
    quizSection.style.display = 'block';
    
    // Initialize quiz
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Display current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    
    // Update progress
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    totalQuestionsElement.textContent = totalQuestions;
    progressBar.style.width = `${((currentQuestionIndex) / totalQuestions) * 100}%`;
    
    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if answer is correct
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    }
    
    // Move to next question or show results
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    quizSection.style.display = 'none';
    resultSection.style.display = 'flex';
    scoreElement.textContent = score;
    maxScoreElement.textContent = totalQuestions;
    resultNameElement.textContent = playerName;
    
    // Update progress bar to 100%
    progressBar.style.width = '100%';
}

// Restart quiz
function restartQuiz() {
    resultSection.style.display = 'none';
    loginSection.style.display = 'block';
    playerNameInput.value = playerName;
    playerNameInput.focus();
}

// Exit quiz
function exitQuiz() {
    alert(`Thank you for playing, ${playerName}!`);
    resultSection.style.display = 'none';
    loginSection.style.display = 'block';
    playerNameInput.value = '';
}