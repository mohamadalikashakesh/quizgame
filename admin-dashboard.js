function loadUserData() {

    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; 

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length === 0) {
        userTableBody.innerHTML = '<tr><td colspan="3" class="no-users">No users registered yet.</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.highScore || 0}</td>
        `;
        userTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', loadUserData);
