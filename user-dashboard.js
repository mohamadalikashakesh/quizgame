async function loadQuizzes() {
    const quizList = document.getElementById('quiz-list');
    const userScores = document.getElementById('user-scores');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userScoresData = JSON.parse(localStorage.getItem('userScores')) || {};
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('quizzes.json');
        const data = await response.json();
        const quizzes = data.quizzes;

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
    } catch (error) {
        console.error('Error loading quizzes:', error);
        quizList.innerHTML = '<p>Error loading quizzes. Please try again later.</p>';
    }
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