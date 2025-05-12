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