document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    if (showRegister) {
        showRegister.addEventListener('click', () => {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', () => {
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;

            if (password !== confirm) {
                alert("Passwords do not match.");
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const existing = users.find(user => user.email === email);
            if (existing) {
                alert("Email already registered.");
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert("Account created successfully!");
            window.location.href = 'index.html';
        });
    }

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (email === 'admin@quiz.com' && password === 'admin123') {
                alert("Welcome Admin!");
                window.location.href = 'admin-dashboard.html';
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const found = users.find(user => user.email === email && user.password === password);

            if (found) {
                alert(`Welcome back, ${found.username}!`);
                window.location.href = 'user-dashboard.html';
            } else {
                alert("Invalid credentials.");
            }
        });
    }
});
