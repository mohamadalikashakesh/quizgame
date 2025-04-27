let currentQuestionIndex = 0;
let score = 0;
let quizData = null;

async function loadQuiz() {
    try {
        const response = await fetch('quizzes.json');
        const data = await response.json();
        const quizIndex = localStorage.getItem('currentQuizIndex');
        quizData = data.quizzes[quizIndex];
        
        if (!quizData) {
            document.getElementById('quiz-container').innerHTML = '<p>Quiz not found. Please try again.</p>';
            return;
        }

        document.getElementById('quiz-title').textContent = quizData.title;
        document.getElementById('quiz-description').textContent = quizData.description;
        displayQuestion();
    } catch (error) {
        console.error('Error loading quiz:', error);
        document.getElementById('quiz-container').innerHTML = '<p>Error loading quiz. Please try again later.</p>';
    }
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = quizData.questions[currentQuestionIndex];
    
    if (!currentQuestion) {
        showResults();
        return;
    }

    questionContainer.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1} of ${quizData.questions.length}</h3>
            <p>${currentQuestion.question}</p>
        </div>
        <div class="options">
            ${currentQuestion.options.map((option, index) => `
                <button class="option-btn" onclick="checkAnswer(${index})">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(button => button.disabled = true);
    
    optionButtons.forEach((button, index) => {
        if (index === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedIndex && index !== currentQuestion.correctAnswer) {
            button.classList.add('wrong');
        }
    });

    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const questionContainer = document.getElementById('question-container');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
    
    if (!userScores[currentUser.username] || score > userScores[currentUser.username].highScore) {
        userScores[currentUser.username] = {
            highScore: score,
            lastScore: score
        };
        localStorage.setItem('userScores', JSON.stringify(userScores));
    }

    questionContainer.innerHTML = `
        <div class="results">
            <h2>Quiz Complete!</h2>
            <p>Your score: ${score} out of ${quizData.questions.length}</p>
            <p>High Score: ${userScores[currentUser.username]?.highScore || 0}</p>
            <button onclick="window.location.href='user-dashboard.html'" class="return-btn">Return to Dashboard</button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadQuiz);
