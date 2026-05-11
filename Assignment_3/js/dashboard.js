/* ============================================
   dashboard.js — Dashboard + Portfolio Logic
   ============================================
   How it works:
   - Checks if user is logged in (via "loggedInUser" in LocalStorage)
   - Shows welcome message with username
   - Skills & Projects are stored per-user in LocalStorage
   - Add / Delete items dynamically without page reload
   ============================================ */

// -------- Check Login --------
var currentUser = localStorage.getItem('loggedInUser');
if (!currentUser) {
    // Not logged in — redirect to login page
    window.location.href = 'index.html';
}

// -------- DOM Elements --------
var welcomeMsg = document.getElementById('welcomeMsg');
var bannerName = document.getElementById('bannerName');
var logoutBtn = document.getElementById('logoutBtn');

// Skills
var skillInput = document.getElementById('skillInput');
var addSkillBtn = document.getElementById('addSkillBtn');
var skillList = document.getElementById('skillList');
var skillEmpty = document.getElementById('skillEmpty');

// Projects
var projectNameInput = document.getElementById('projectNameInput');
var projectDescInput = document.getElementById('projectDescInput');
var addProjectBtn = document.getElementById('addProjectBtn');
var projectList = document.getElementById('projectList');
var projectEmpty = document.getElementById('projectEmpty');

// -------- Show Welcome Message --------
welcomeMsg.textContent = 'Hello, ' + currentUser;
bannerName.textContent = 'Welcome, ' + currentUser + '!';

// ============================================
// LocalStorage Keys (unique per user)
// ============================================
var skillsKey = 'skills_' + currentUser;
var projectsKey = 'projects_' + currentUser;

// ============================================
// Helper: Get / Save arrays from LocalStorage
// ============================================
function getData(key) {
    var data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return [];
}

function saveData(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

// ============================================
// SKILLS — Render, Add, Delete
// ============================================
function renderSkills() {
    var skills = getData(skillsKey);
    skillList.innerHTML = '';

    if (skills.length === 0) {
        skillEmpty.style.display = 'block';
        return;
    }
    skillEmpty.style.display = 'none';

    skills.forEach(function (skill, index) {
        var li = document.createElement('li');
        li.innerHTML =
            '<span class="item-name">' + skill + '</span>' +
            '<button class="delete-btn" data-index="' + index + '" data-type="skill">&#10005;</button>';
        skillList.appendChild(li);
    });
}

addSkillBtn.addEventListener('click', function () {
    var value = skillInput.value.trim();
    if (value === '') return;

    var skills = getData(skillsKey);
    skills.push(value);
    saveData(skillsKey, skills);

    skillInput.value = '';
    renderSkills();
});

// Allow pressing Enter to add skill
skillInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addSkillBtn.click();
});

// ============================================
// PROJECTS — Render, Add, Delete
// ============================================
function renderProjects() {
    var projects = getData(projectsKey);
    projectList.innerHTML = '';

    if (projects.length === 0) {
        projectEmpty.style.display = 'block';
        return;
    }
    projectEmpty.style.display = 'none';

    projects.forEach(function (proj, index) {
        var li = document.createElement('li');
        li.innerHTML =
            '<span class="item-name"><strong>' + proj.name + '</strong> — ' + proj.desc + '</span>' +
            '<button class="delete-btn" data-index="' + index + '" data-type="project">&#10005;</button>';
        projectList.appendChild(li);
    });
}

addProjectBtn.addEventListener('click', function () {
    var name = projectNameInput.value.trim();
    var desc = projectDescInput.value.trim();
    if (name === '') return;

    var projects = getData(projectsKey);
    projects.push({ name: name, desc: desc || 'No description' });
    saveData(projectsKey, projects);

    projectNameInput.value = '';
    projectDescInput.value = '';
    renderProjects();
});

// Allow pressing Enter in project description to add
projectDescInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addProjectBtn.click();
});

// ============================================
// DELETE items — Event Delegation
// ============================================
document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete-btn')) return;

    var index = parseInt(e.target.getAttribute('data-index'));
    var type = e.target.getAttribute('data-type');

    if (type === 'skill') {
        var skills = getData(skillsKey);
        skills.splice(index, 1);
        saveData(skillsKey, skills);
        renderSkills();
    } else if (type === 'project') {
        var projects = getData(projectsKey);
        projects.splice(index, 1);
        saveData(projectsKey, projects);
        renderProjects();
    }
});

// ============================================
// LOGOUT
// ============================================
logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});

// -------- Initial Render --------
renderSkills();
renderProjects();
