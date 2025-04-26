function loadQuizzes() {
    const quizList = document.getElementById('quiz-list');
    const userScores = document.getElementById('user-scores');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const userScoresData = JSON.parse(localStorage.getItem('userScores')) || {};
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    if (quizzes.length === 0) {
        quizzes = [
            {
                title: "Quiz Title",
                description: "Quiz Description",
                questions: [
                    {
                        question: "Question text",
                        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                        correctAnswer: 0
                    }
                ]
            },
            {
                title: "General Knowledge",
                description: "Test your general knowledge with this quiz",
                questions: [
                    {
                        question: "What is the capital of France?",
                        options: ["London", "Berlin", "Paris", "Madrid"],
                        correctAnswer: 2
                    },
                    {
                        question: "Which planet is known as the Red Planet?",
                        options: ["Venus", "Mars", "Jupiter", "Saturn"],
                        correctAnswer: 1
                    }
                ]
            },
            {
                title: "Science Quiz",
                description: "Test your science knowledge",
                questions: [
                    {
                        question: "What is the chemical symbol for water?",
                        options: ["H2O", "CO2", "O2", "H2"],
                        correctAnswer: 0
                    },
                    {
                        question: "What is the largest organ in the human body?",
                        options: ["Heart", "Liver", "Skin", "Brain"],
                        correctAnswer: 2
                    }
                ]
            }
        ];
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
    }

    userScores.innerHTML = `
        <h3>Welcome, ${currentUser.username}!</h3>
        <p>Your High Score: ${userScoresData[currentUser.username]?.highScore || 0}</p>
    `;

    quizList.innerHTML = quizzes.map((quiz, index) => `
        <li class="quiz-item">
            <div class="quiz-info">
                <h3>${quiz.title}</h3>
                <p>${quiz.description || 'Test your knowledge!'}</p>
                <p>Questions: ${quiz.questions.length}</p>
            </div>
            <button onclick="startQuiz(${index})" class="start-quiz-btn">Start Quiz</button>
        </li>
    `).join('');
}

function startQuiz(quizIndex) {
    localStorage.setItem('currentQuizIndex', quizIndex);
    window.location.href = 'quizpage.html';
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuizzes();
    
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem('currentUser');
        window.location.href = "index.html";
    });
});