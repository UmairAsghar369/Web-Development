# Portfolio Website — Web Technologies Assignment 3

> **CLO-3**: Illustrate the concepts of server-side technologies for secure database interactions.

This project is a **secure and interactive portfolio website** built with HTML, CSS, Bootstrap 5, and JavaScript. It uses **LocalStorage** as a simulated database.

---

## 📁 Folder Structure

```
Assignment_3/
├── index.html          ← Login / Signup page (entry point)
├── dashboard.html      ← Dashboard with portfolio management
├── answers.html        ← Theory answers (Questions a-d)
├── css/
│   └── style.css       ← All custom styles (dark theme)
├── js/
│   ├── auth.js         ← Login/Signup logic & validation
│   └── dashboard.js    ← Skills/Projects CRUD & logout
└── README.md           ← This file
```

---

## 🚀 How to Run

1. Open the `Assignment_3` folder.
2. Double-click **`index.html`** to open it in any browser.
3. That's it — no server or installation needed!

---

## 📋 Features Covered (Task-by-Task)

### Task 1 — Login / Signup Page (`index.html` + `js/auth.js`)

| Requirement | How it's done |
|---|---|
| Username & password fields | Both login and signup forms have these fields |
| Password strength rules | Min 6 chars, 1 uppercase, 1 number — shown with a color bar |
| JavaScript validation | All fields are validated on button click before saving |
| Store in LocalStorage | Users are saved as a JSON array under `localStorage["users"]` |

**Flow:**
- Open `index.html` → You see the **Login** form.
- Click "Sign Up" link → Switch to the **Signup** form.
- Fill in details → Click "Create Account" → User is saved to LocalStorage.
- Switch back to Login → Enter credentials → Redirected to `dashboard.html`.

---

### Task 2 — Dashboard Page (`dashboard.html` + `js/dashboard.js`)

| Requirement | How it's done |
|---|---|
| Welcome message | Navbar shows "Hello, username" and banner shows "Welcome, username!" |
| Portfolio content | Skills and Projects sections are displayed |
| Logout functionality | "Logout" button removes `loggedInUser` and redirects to `index.html` |

**Login Guard:** If someone tries to open `dashboard.html` without logging in, they are automatically redirected back to `index.html`.

---

### Task 3 — Portfolio Management (`dashboard.html` + `js/dashboard.js`)

| Requirement | How it's done |
|---|---|
| Add skills/projects | Form inputs + "Add" buttons at top of each section |
| Display dynamically | Items are rendered from LocalStorage arrays using JavaScript |
| Delete without reload | Click ✕ button → item is removed from array and re-rendered instantly |

**Per-user data:** Skills and projects are stored with user-specific keys (e.g., `skills_John`, `projects_John`), so each user has their own portfolio.

---

### Task 4 — Theory Answers (`answers.html`)

All four questions are answered on a dedicated page accessible from the dashboard navbar:

- **(a)** How logic would shift to PHP + MySQL
- **(b)** CRUD operations at server side
- **(c)** Importance of server-side authentication
- **(d)** Difference between LocalStorage & Database

---

## 🔧 Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and semantic elements |
| **CSS3** | Custom dark theme with glassmorphism effects |
| **Bootstrap 5** | Responsive grid and table styling (via CDN) |
| **JavaScript** | Form validation, DOM manipulation, LocalStorage CRUD |
| **LocalStorage** | Simulated database for users, skills, and projects |

---

## 📝 How LocalStorage Works Here

```
localStorage
├── "users"           → [ {username, email, password}, ... ]
├── "loggedInUser"    → "John"          (set on login, removed on logout)
├── "skills_John"     → ["HTML", "CSS", "JS"]
└── "projects_John"   → [ {name, desc}, ... ]
```

- **Signup** → pushes a new user object into the `users` array.
- **Login** → finds matching user and sets `loggedInUser`.
- **Add Skill/Project** → pushes into the user-specific array.
- **Delete** → removes from array by index using `splice()`.
- **Logout** → removes `loggedInUser` key.

---

## ⚠️ Important Notes

- This is a **client-side simulation**. In a real application, you would use PHP + MySQL for secure server-side storage and authentication.
- Passwords are stored in **plain text** in LocalStorage for demo purposes. A real app must hash passwords on the server.
- Clearing browser data will erase all stored information.
