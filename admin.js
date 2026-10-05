/* =========================================
   FITNESS TRACKER - ADMIN MODULE
========================================= */


/* =========================
   DEMO ADMIN LOGIN
========================= */

const ADMIN_EMAIL = "admin@fitnesstracker.com";
const ADMIN_PASSWORD = "admin123";


/* =========================
   DEMO DATABASE
========================= */

let users = JSON.parse(localStorage.getItem("fitnessUsers")) || [

    {
        id: 1,
        name: "Vamsee Krishna",
        email: "vamsee@gmail.com",
        age: 20,
        goal: "Muscle Gain",
        status: "Active"
    },

    {
        id: 2,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        age: 21,
        goal: "Fat Loss",
        status: "Active"
    },

    {
        id: 3,
        name: "Priya Reddy",
        email: "priya@gmail.com",
        age: 20,
        goal: "Fat Loss",
        status: "Active"
    },

    {
        id: 4,
        name: "Arjun Kumar",
        email: "arjun@gmail.com",
        age: 22,
        goal: "Muscle Gain",
        status: "Inactive"
    },

    {
        id: 5,
        name: "Sneha Rao",
        email: "sneha@gmail.com",
        age: 21,
        goal: "Maintenance",
        status: "Active"
    }

];


let exercises = [

    {
        name: "Bench Press",
        category: "Chest",
        equipment: "Barbell",
        level: "Intermediate"
    },

    {
        name: "Squat",
        category: "Legs",
        equipment: "Barbell",
        level: "Intermediate"
    },

    {
        name: "Deadlift",
        category: "Back",
        equipment: "Barbell",
        level: "Advanced"
    },

    {
        name: "Lat Pulldown",
        category: "Back",
        equipment: "Cable",
        level: "Beginner"
    },

    {
        name: "Lateral Raise",
        category: "Shoulders",
        equipment: "Dumbbell",
        level: "Beginner"
    },

    {
        name: "Bicep Curl",
        category: "Arms",
        equipment: "Dumbbell",
        level: "Beginner"
    },

    {
        name: "Tricep Pushdown",
        category: "Arms",
        equipment: "Cable",
        level: "Beginner"
    },

    {
        name: "Plank",
        category: "Core",
        equipment: "Bodyweight",
        level: "Beginner"
    }

];


let nutrition = [

    {
        name: "Chicken Breast",
        calories: 165,
        protein: 31,
        category: "Protein"
    },

    {
        name: "Brown Rice",
        calories: 112,
        protein: 2.3,
        category: "Carbohydrate"
    },

    {
        name: "Greek Yogurt",
        calories: 59,
        protein: 10,
        category: "Dairy"
    },

    {
        name: "Oats",
        calories: 389,
        protein: 17,
        category: "Grains"
    },

    {
        name: "Almonds",
        calories: 579,
        protein: 21,
        category: "Nuts"
    },

    {
        name: "Banana",
        calories: 89,
        protein: 1.1,
        category: "Fruit"
    }

];


/* =========================
   SAVE USERS
========================= */

function saveUsers() {

    localStorage.setItem(
        "fitnessUsers",
        JSON.stringify(users)
    );

}


/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();


    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        document
            .getElementById("loginScreen")
            .classList.add("hidden");

        document
            .getElementById("adminApp")
            .classList.remove("hidden");

        loadDashboard();

        showToast("Admin login successful!");

    } else {

        showToast("Invalid admin email or password.");

    }

});


/* =========================
   LOGOUT
========================= */

document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

        document
            .getElementById("adminApp")
            .classList.add("hidden");

        document
            .getElementById("loginScreen")
            .classList.remove("hidden");

        document
            .getElementById("loginForm")
            .reset();

    });


/* =========================
   NAVIGATION
========================= */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener("click", function() {

            const page =
                this.dataset.page;

            showPage(page);

        });

    });


function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove("active-page");

        });


    document
        .getElementById(page + "Page")
        .classList.add("active-page");


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove("active");

        });


    const activeButton =
        document.querySelector(
            `.nav-item[data-page="${page}"]`
        );

    if (activeButton) {

        activeButton.classList.add("active");

    }


    const titles = {

        dashboard: "Dashboard",

        users: "User Management",

        exercises: "Exercise Database",

        nutrition: "Nutrition Database",

        reports: "Reports & Analytics"

    };


    document.getElementById("pageTitle").textContent =
        titles[page];


    if (page === "dashboard") {
        loadDashboard();
    }

    if (page === "users") {
        renderUsers();
    }

    if (page === "exercises") {
        renderExercises();
    }

    if (page === "nutrition") {
        renderNutrition();
    }

    if (page === "reports") {
        loadReports();
    }

}


/* =========================
   DASHBOARD
========================= */

function loadDashboard() {

    const total =
        users.length;

    const active =
        users.filter(
            user => user.status === "Active"
        ).length;


    document.getElementById("totalUsers").textContent =
        total;

    document.getElementById("activeUsers").textContent =
        active;

    document.getElementById("totalWorkouts").textContent =
        total * 8 + 14;

    document.getElementById("totalNutrition").textContent =
        nutrition.length;


    renderRecentUsers();

}


/* =========================
   RECENT USERS
========================= */

function renderRecentUsers() {

    const table =
        document.getElementById("recentUsersTable");

    table.innerHTML = "";


    users.slice(-5).reverse().forEach(user => {

        table.innerHTML += `

            <tr>

                <td>
                    <div class="user-name">
                        ${user.name}
                    </div>
                </td>

                <td>
                    <span class="user-email">
                        ${user.email}
                    </span>
                </td>

                <td>
                    ${user.goal}
                </td>

                <td>
                    <span class="status ${user.status.toLowerCase()}">
                        ${user.status}
                    </span>
                </td>

            </tr>

        `;

    });

}


/* =========================
   USERS
========================= */

function renderUsers() {

    const table =
        document.getElementById("usersTable");

    const search =
        document
            .getElementById("userSearch")
            .value
            .toLowerCase();

    const status =
        document
            .getElementById("statusFilter")
            .value;


    table.innerHTML = "";


    const filteredUsers =
        users.filter(user => {

            const matchesSearch =
                user.name
                    .toLowerCase()
                    .includes(search) ||

                user.email
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all" ||
                user.status === status;


            return matchesSearch &&
                   matchesStatus;

        });


    filteredUsers.forEach(user => {

        table.innerHTML += `

            <tr>

                <td>
                    <div class="user-name">
                        ${user.name}
                    </div>
                </td>

                <td>
                    <span class="user-email">
                        ${user.email}
                    </span>
                </td>

                <td>
                    ${user.age}
                </td>

                <td>
                    ${user.goal}
                </td>

                <td>
                    <span class="status ${user.status.toLowerCase()}">
                        ${user.status}
                    </span>
                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="toggleUser(${user.id})"
                    >
                        ${user.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteUser(${user.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });

}


/* =========================
   TOGGLE USER
========================= */

function toggleUser(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    user.status =
        user.status === "Active"
            ? "Inactive"
            : "Active";


    saveUsers();

    renderUsers();

    loadDashboard();

    showToast("User status updated.");

}


/* =========================
   DELETE USER
========================= */

function deleteUser(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    if (
        confirm(
            `Delete ${user.name}?`
        )
    ) {

        users =
            users.filter(
                user => user.id !== id
            );


        saveUsers();

        renderUsers();

        loadDashboard();

        showToast("User deleted.");

    }

}


/* =========================
   USER MODAL
========================= */

function openUserModal() {

    document
        .getElementById("userModal")
        .classList.remove("hidden");

}


function closeUserModal() {

    document
        .getElementById("userModal")
        .classList.add("hidden");

}


/* =========================
   ADD USER
========================= */

document
    .getElementById("userForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const newUser = {

            id: Date.now(),

            name:
                document
                    .getElementById("newName")
                    .value,

            email:
                document
                    .getElementById("newEmail")
                    .value,

            age:
                document
                    .getElementById("newAge")
                    .value,

            goal:
                document
                    .getElementById("newGoal")
                    .value,

            status:
                document
                    .getElementById("newStatus")
                    .value

        };


        users.push(newUser);

        saveUsers();

        this.reset();

        closeUserModal();

        renderUsers();

        loadDashboard();

        showToast("New user created.");

    });


/* =========================
   EXERCISES
========================= */

function renderExercises() {

    const grid =
        document.getElementById("exerciseGrid");

    const search =
        document
            .getElementById("exerciseSearch")
            .value
            .toLowerCase();


    grid.innerHTML = "";


    exercises
        .filter(exercise =>
            exercise.name
                .toLowerCase()
                .includes(search)
        )
        .forEach(exercise => {

            grid.innerHTML += `

                <div class="content-card">

                    <div class="content-icon">
                        💪
                    </div>

                    <h3>
                        ${exercise.name}
                    </h3>

                    <p>
                        Category: ${exercise.category}
                    </p>

                    <div class="content-info">

                        <span>
                            Equipment
                        </span>

                        <strong>
                            ${exercise.equipment}
                        </strong>

                    </div>

                    <div class="content-info">

                        <span>
                            Level
                        </span>

                        <strong>
                            ${exercise.level}
                        </strong>

                    </div>

                </div>

            `;

        });

}


function addExercise() {

    const name =
        prompt("Enter exercise name:");

    if (!name) return;


    const category =
        prompt("Enter category:");

    if (!category) return;


    const equipment =
        prompt("Enter equipment:");

    if (!equipment) return;


    exercises.push({

        name,
        category,
        equipment,
        level: "Beginner"

    });


    renderExercises();

    showToast("Exercise added.");

}


/* =========================
   NUTRITION
========================= */

function renderNutrition() {

    const grid =
        document.getElementById("nutritionGrid");

    const search =
        document
            .getElementById("nutritionSearch")
            .value
            .toLowerCase();


    grid.innerHTML = "";


    nutrition
        .filter(food =>
            food.name
                .toLowerCase()
                .includes(search)
        )
        .forEach(food => {

            grid.innerHTML += `

                <div class="content-card">

                    <div class="content-icon">
                        🥗
                    </div>

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        Category: ${food.category}
                    </p>

                    <div class="content-info">

                        <span>
                            Calories
                        </span>

                        <strong>
                            ${food.calories} kcal
                        </strong>

                    </div>

                    <div class="content-info">

                        <span>
                            Protein
                        </span>

                        <strong>
                            ${food.protein} g
                        </strong>

                    </div>

                </div>

            `;

        });

}


function addNutrition() {

    const name =
        prompt("Enter food name:");

    if (!name) return;


    const calories =
        prompt("Enter calories per 100g:");

    if (!calories) return;


    const protein =
        prompt("Enter protein per 100g:");

    if (!protein) return;


    nutrition.push({

        name,

        calories:
            Number(calories),

        protein:
            Number(protein),

        category: "Other"

    });


    renderNutrition();

    showToast("Nutrition item added.");

}


/* =========================
   REPORTS
========================= */

function loadReports() {

    const active =
        users.filter(
            user => user.status === "Active"
        ).length;


    const activeRate =
        users.length
            ? Math.round(
                (active / users.length) * 100
              )
            : 0;


    document.getElementById("reportActiveRate")
        .textContent =
        activeRate + "%";


    document.getElementById("reportUsers")
        .textContent =
        users.length;


    document.getElementById("reportActive")
        .textContent =
        active;


    document.getElementById("reportExercises")
        .textContent =
        exercises.length;


    document.getElementById("reportNutrition")
        .textContent =
        nutrition.length;

}


/* =========================
   THEME
========================= */

document
    .getElementById("themeBtn")
    .addEventListener("click", function() {

        document.body.classList.toggle("light-mode");

        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            this.textContent = "☾";

        } else {

            this.textContent = "☀";

        }

    });


/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   INITIAL STATE
========================= */

function initialize() {

    /*
       Admin login is shown first.
       After successful login,
       dashboard will load.
    */

}


initialize();