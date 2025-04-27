function loadUserData() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; 

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};
    
    if (users.length === 0) {
        userTableBody.innerHTML = '<tr><td colspan="4" class="no-users">No users registered yet.</td></tr>';
        return;
    }

    users.forEach(user => {
        const userScoreData = userScores[user.username] || { highScore: 0, lastScore: 0 };
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${userScoreData.highScore || 0}</td>
            <td>${userScoreData.lastScore || 0}</td>
        `;
        userTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    
    document.getElementById("logoutBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
