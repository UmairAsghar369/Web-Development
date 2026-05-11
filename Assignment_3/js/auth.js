/* ============================================
   auth.js — Login / Signup Logic
   ============================================
   How it works:
   - Users are stored in LocalStorage as an array under key "users"
   - Each user object: { username, email, password }
   - On successful login, current username is saved under key "loggedInUser"
   ============================================ */

// -------- DOM Elements --------
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const alertBox = document.getElementById('alertBox');

// Login fields
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');

// Signup fields
const signupUsername = document.getElementById('signupUsername');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');
const signupBtn = document.getElementById('signupBtn');

// Password strength elements
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');

// Toggle links
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// -------- If already logged in, go to dashboard --------
if (localStorage.getItem('loggedInUser')) {
    window.location.href = 'dashboard.html';
}

// ============================================
// Toggle between Login and Signup forms
// ============================================
showSignup.addEventListener('click', function () {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    hideAlert();
    clearErrors();
});

showLogin.addEventListener('click', function () {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    hideAlert();
    clearErrors();
});

// ============================================
// Helper: Show / Hide Alert Messages
// ============================================
function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = 'alert-box show ' + (type === 'success' ? 'alert-success' : 'alert-error');
}

function hideAlert() {
    alertBox.className = 'alert-box';
}

// ============================================
// Helper: Show / Hide Error Text Under Inputs
// ============================================
function showError(inputEl, errorEl) {
    inputEl.classList.add('input-error');
    errorEl.classList.add('visible');
}

function hideError(inputEl, errorEl) {
    inputEl.classList.remove('input-error');
    errorEl.classList.remove('visible');
}

function clearErrors() {
    var inputs = document.querySelectorAll('input');
    var errors = document.querySelectorAll('.error-text');
    inputs.forEach(function (el) { el.classList.remove('input-error'); });
    errors.forEach(function (el) { el.classList.remove('visible'); });
}

// ============================================
// Helper: Get users array from LocalStorage
// ============================================
function getUsers() {
    var data = localStorage.getItem('users');
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ============================================
// Password Strength Checker
// ============================================
signupPassword.addEventListener('input', function () {
    var value = signupPassword.value;
    var score = 0;

    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    // Update the visual bar
    var percent = (score / 5) * 100;
    strengthBar.style.width = percent + '%';

    if (score <= 1) {
        strengthBar.style.background = '#ef4444';
        strengthLabel.textContent = 'Weak — add uppercase, numbers & symbols';
    } else if (score <= 3) {
        strengthBar.style.background = '#f59e0b';
        strengthLabel.textContent = 'Medium — getting better!';
    } else {
        strengthBar.style.background = '#22c55e';
        strengthLabel.textContent = 'Strong — great password!';
    }

    if (value.length === 0) {
        strengthBar.style.width = '0%';
        strengthLabel.textContent = 'Password strength';
    }
});

// ============================================
// Validate Email Format
// ============================================
function isValidEmail(email) {
    // Simple check: must have text@text.text
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// SIGNUP — Validate and Save User
// ============================================
signupBtn.addEventListener('click', function () {
    clearErrors();
    hideAlert();
    var valid = true;

    var username = signupUsername.value.trim();
    var email = signupEmail.value.trim();
    var password = signupPassword.value;
    var confirm = signupConfirm.value;

    // 1. Username must be at least 3 characters
    if (username.length < 3) {
        showError(signupUsername, document.getElementById('signupUsernameError'));
        valid = false;
    }

    // 2. Email must be valid
    if (!isValidEmail(email)) {
        showError(signupEmail, document.getElementById('signupEmailError'));
        valid = false;
    }

    // 3. Password rules: min 6 chars, 1 uppercase, 1 number
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        showError(signupPassword, document.getElementById('signupPasswordError'));
        document.getElementById('signupPasswordError').textContent =
            'Min 6 chars, 1 uppercase letter, and 1 number required';
        valid = false;
    }

    // 4. Passwords must match
    if (password !== confirm) {
        showError(signupConfirm, document.getElementById('signupConfirmError'));
        valid = false;
    }

    if (!valid) return;

    // 5. Check if username already exists
    var users = getUsers();
    var exists = users.some(function (u) {
        return u.username.toLowerCase() === username.toLowerCase();
    });

    if (exists) {
        showAlert('Username already taken. Please choose another.', 'error');
        return;
    }

    // 6. Save new user
    users.push({ username: username, email: email, password: password });
    saveUsers(users);

    showAlert('Account created successfully! You can now sign in.', 'success');

    // Switch to login form after a short delay
    setTimeout(function () {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        hideAlert();
    }, 1500);
});

// ============================================
// LOGIN — Validate and Authenticate User
// ============================================
loginBtn.addEventListener('click', function () {
    clearErrors();
    hideAlert();
    var valid = true;

    var username = loginUsername.value.trim();
    var password = loginPassword.value;

    // 1. Fields must not be empty
    if (username === '') {
        showError(loginUsername, document.getElementById('loginUsernameError'));
        valid = false;
    }
    if (password === '') {
        showError(loginPassword, document.getElementById('loginPasswordError'));
        valid = false;
    }
    if (!valid) return;

    // 2. Find user in LocalStorage
    var users = getUsers();
    var found = users.find(function (u) {
        return u.username.toLowerCase() === username.toLowerCase() && u.password === password;
    });

    if (!found) {
        showAlert('Invalid username or password.', 'error');
        return;
    }

    // 3. Save logged-in state and redirect
    localStorage.setItem('loggedInUser', found.username);
    window.location.href = 'dashboard.html';
});
