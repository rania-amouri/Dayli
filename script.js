// ==========================================
// DAYLI — APPLICATION
// ==========================================

let tasks = JSON.parse(
    localStorage.getItem("dayliTasks")
) || [];

let currentFilter = "all";
let editingTaskId = null;
let deletingTaskId = null;


// ==========================================
// ELEMENTS HTML
// ==========================================

const addTaskButton = document.querySelector("#addTaskButton");
const emptyAddButton = document.querySelector("#emptyAddButton");

const taskModal = document.querySelector("#taskModal");
const closeModal = document.querySelector("#closeModal");
const cancelButton = document.querySelector("#cancelButton");

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskPriority = document.querySelector("#taskPriority");
const taskCategory = document.querySelector("#taskCategory");
const taskDate = document.querySelector("#taskDate");

const modalTitle = document.querySelector("#modalTitle");

const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");

const searchInput = document.querySelector("#searchInput");

const totalTasks = document.querySelector("#totalTasks");
const activeTasks = document.querySelector("#activeTasks");
const completedTasks = document.querySelector("#completedTasks");
const overdueTasks = document.querySelector("#overdueTasks");

const taskCounter = document.querySelector("#taskCounter");

const currentDate = document.querySelector("#currentDate");

const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const progressMessage = document.querySelector("#progressMessage");

const activeFilterText =
    document.querySelector("#activeFilterText");

const navButtons =
    document.querySelectorAll(".nav-button");

const themeButton =
    document.querySelector("#themeButton");

const themeIcon =
    document.querySelector("#themeIcon");

const themeText =
    document.querySelector("#themeText");


// DELETE MODAL

const deleteModal =
    document.querySelector("#deleteModal");

const closeDeleteModal =
    document.querySelector("#closeDeleteModal");

const cancelDelete =
    document.querySelector("#cancelDelete");

const confirmDelete =
    document.querySelector("#confirmDelete");


// ==========================================
// SAUVEGARDE
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "dayliTasks",
        JSON.stringify(tasks)
    );

}


// ==========================================
// DATE ACTUELLE
// ==========================================

function displayCurrentDate() {

    const today = new Date();

    currentDate.textContent =
        today.toLocaleDateString(
            "fr-FR",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


// ==========================================
// OUVRIR MODAL AJOUT
// ==========================================

function openAddModal() {

    editingTaskId = null;

    modalTitle.textContent =
        "Ajouter une tâche";

    taskInput.value = "";

    taskPriority.value =
        "medium";

    taskCategory.value =
        "personal";

    taskDate.value = "";

    taskModal.classList.remove(
        "hidden"
    );

    setTimeout(
        function () {

            taskInput.focus();

        },
        50
    );

}


// ==========================================
// OUVRIR MODAL MODIFICATION
// ==========================================

function openEditModal(task) {

    editingTaskId = task.id;

    modalTitle.textContent =
        "Modifier la tâche";

    taskInput.value =
        task.title;

    taskPriority.value =
        task.priority || "medium";

    taskCategory.value =
        task.category || "personal";

    taskDate.value =
        task.dueDate || "";

    taskModal.classList.remove(
        "hidden"
    );

    setTimeout(
        function () {

            taskInput.focus();

        },
        50
    );

}


// ==========================================
// FERMER MODAL
// ==========================================

function closeTaskModal() {

    taskModal.classList.add(
        "hidden"
    );

    taskForm.reset();

    editingTaskId = null;

}


// ==========================================
// AJOUT / MODIFICATION
// ==========================================

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const title =
            taskInput.value.trim();

        const priority =
            taskPriority.value;

        const category =
            taskCategory.value;

        const dueDate =
            taskDate.value;


        if (!title) {

            return;

        }


        // ==================================
        // MODIFICATION
        // ==================================

        if (
            editingTaskId !== null
        ) {

            tasks =
                tasks.map(
                    function (task) {

                        if (
                            task.id ===
                            editingTaskId
                        ) {

                            return {

                                ...task,

                                title:
                                    title,

                                priority:
                                    priority,

                                category:
                                    category,

                                dueDate:
                                    dueDate

                            };

                        }

                        return task;

                    }
                );

        }


        // ==================================
        // NOUVELLE TÂCHE
        // ==================================

        else {

            const newTask = {

                id:
                    Date.now(),

                title:
                    title,

                priority:
                    priority,

                category:
                    category,

                dueDate:
                    dueDate,

                completed:
                    false,

                createdAt:
                    new Date().toISOString()

            };

            tasks.unshift(
                newTask
            );

        }


        saveTasks();

        renderTasks();

        closeTaskModal();

    }
);


// ==========================================
// AFFICHER LES TÂCHES
// ==========================================

function renderTasks() {

    taskList.innerHTML = "";

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredTasks =
        tasks.filter(
            function (task) {

                const matchesSearch =
                    task.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        );


                let matchesFilter = true;


                if (
                    currentFilter ===
                    "active"
                ) {

                    matchesFilter =
                        !task.completed;

                }


                if (
                    currentFilter ===
                    "completed"
                ) {

                    matchesFilter =
                        task.completed;

                }


                if (
                    currentFilter ===
                    "overdue"
                ) {

                    matchesFilter =
                        isOverdue(task);

                }


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    filteredTasks.forEach(
        function (task) {

            const taskElement =
                createTaskElement(
                    task
                );

            taskList.appendChild(
                taskElement
            );

        }
    );


    updateEmptyState(
        filteredTasks
    );

    updateStatistics();

    updateProgress();

    updateFilterText();

}


// ==========================================
// CREER UNE TACHE
// ==========================================

function createTaskElement(task) {

    const div =
        document.createElement(
            "div"
        );

    div.className =
        `task ${
            task.completed
                ? "completed"
                : ""
        }`;


    const priorityNames = {

        low:
            "Faible",

        medium:
            "Moyenne",

        high:
            "Haute"

    };


    const categoryNames = {

        personal:
            "🌿 Personnel",

        study:
            "💻 Études",

        work:
            "💼 Travail",

        sport:
            "🏃 Sport",

        other:
            "📌 Autre"

    };


    let dueDateHTML;


    if (
        task.dueDate
    ) {

        const overdue =
            isOverdue(task);

        dueDateHTML = `

            <span
                class="${
                    overdue
                        ? "overdue"
                        : ""
                }"
            >

                ${
                    overdue
                        ? "⚠️"
                        : "📅"
                }

                ${formatDate(
                    task.dueDate
                )}

                ${
                    overdue
                        ? " — En retard"
                        : ""
                }

            </span>

        `;

    }

    else {

        dueDateHTML = `

            <span>
                Sans échéance
            </span>

        `;

    }


    div.innerHTML = `

        <div
            class="task-checkbox"
            data-action="toggle"
        >

            ${
                task.completed
                    ? "✓"
                    : ""
            }

        </div>


        <div class="task-info">

            <div class="task-title">

                ${escapeHTML(
                    task.title
                )}

            </div>


            <div class="task-meta">

                <span
                    class="badge priority-${
                        task.priority
                    }"
                >

                    ${
                        priorityNames[
                            task.priority
                        ] || "Moyenne"
                    }

                </span>


                <span class="badge category">

                    ${
                        categoryNames[
                            task.category
                        ] ||
                        "📌 Autre"
                    }

                </span>


                ${dueDateHTML}

            </div>

        </div>


        <div class="task-actions">

            <button
                class="task-action"
                data-action="edit"
                title="Modifier"
            >
                ✏️
            </button>


            <button
                class="task-action"
                data-action="delete"
                title="Supprimer"
            >
                🗑️
            </button>

        </div>

    `;


    // TERMINER

    div.querySelector(
        '[data-action="toggle"]'
    ).addEventListener(
        "click",
        function () {

            toggleTask(
                task.id
            );

        }
    );


    // MODIFIER

    div.querySelector(
        '[data-action="edit"]'
    ).addEventListener(
        "click",
        function () {

            openEditModal(
                task
            );

        }
    );


    // SUPPRIMER

    div.querySelector(
        '[data-action="delete"]'
    ).addEventListener(
        "click",
        function () {

            openDeleteModal(
                task.id
            );

        }
    );


    return div;

}


// ==========================================
// TERMINER UNE TACHE
// ==========================================

function toggleTask(id) {

    tasks =
        tasks.map(
            function (task) {

                if (
                    task.id === id
                ) {

                    return {

                        ...task,

                        completed:
                            !task.completed

                    };

                }

                return task;

            }
        );


    saveTasks();

    renderTasks();

}


// ==========================================
// SUPPRESSION
// ==========================================

function openDeleteModal(id) {

    deletingTaskId =
        id;

    deleteModal.classList.remove(
        "hidden"
    );

}


function closeDeleteModalFunction() {

    deleteModal.classList.add(
        "hidden"
    );

    deletingTaskId = null;

}


confirmDelete.addEventListener(
    "click",
    function () {

        if (
            deletingTaskId === null
        ) {

            return;

        }


        tasks =
            tasks.filter(
                function (task) {

                    return (
                        task.id !==
                        deletingTaskId
                    );

                }
            );


        saveTasks();

        renderTasks();

        closeDeleteModalFunction();

    }
);


// ==========================================
// FILTRES
// ==========================================

navButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                navButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                renderTasks();

            }
        );

    }
);


// ==========================================
// RECHERCHE
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        renderTasks();

    }
);


// ==========================================
// STATISTIQUES
// ==========================================

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    const active =
        tasks.filter(
            function (task) {

                return !task.completed;

            }
        ).length;


    const overdue =
        tasks.filter(
            function (task) {

                return isOverdue(task);

            }
        ).length;


    totalTasks.textContent =
        total;

    activeTasks.textContent =
        active;

    completedTasks.textContent =
        completed;

    overdueTasks.textContent =
        overdue;


    taskCounter.textContent =
        `${total} tâche${
            total > 1
                ? "s"
                : ""
        }`;

}


// ==========================================
// PROGRESSION
// ==========================================

function updateProgress() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    let percentage = 0;


    if (
        total > 0
    ) {

        percentage =
            Math.round(
                (
                    completed /
                    total
                ) * 100
            );

    }


    progressText.textContent =
        `${percentage}%`;


    progressFill.style.width =
        `${percentage}%`;


    if (
        total === 0
    ) {

        progressMessage.textContent =
            "Commence ta journée 🚀";

    }

    else if (
        percentage === 0
    ) {

        progressMessage.textContent =
            "C'est parti 💪";

    }

    else if (
        percentage < 50
    ) {

        progressMessage.textContent =
            "Continue comme ça 🌱";

    }

    else if (
        percentage < 100
    ) {

        progressMessage.textContent =
            "Tu avances super bien ✨";

    }

    else {

        progressMessage.textContent =
            "Journée terminée ! 🎉";

    }

}


// ==========================================
// ETAT VIDE
// ==========================================

function updateEmptyState(
    filteredTasks
) {

    if (
        filteredTasks.length === 0
    ) {

        emptyState.style.display =
            "block";

    }

    else {

        emptyState.style.display =
            "none";

    }

}


// ==========================================
// TEXTE FILTRE
// ==========================================

function updateFilterText() {

    const labels = {

        all:
            "Toutes les tâches",

        active:
            "Tâches en cours",

        completed:
            "Tâches terminées",

        overdue:
            "Tâches en retard"

    };


    activeFilterText.textContent =
        labels[
            currentFilter
        ];

}


// ==========================================
// DATES
// ==========================================

function isOverdue(task) {

    if (
        task.completed ||
        !task.dueDate
    ) {

        return false;

    }


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const due =
        new Date(
            task.dueDate +
            "T00:00:00"
        );


    return due < today;

}


function formatDate(date) {

    const formattedDate =
        new Date(
            date +
            "T00:00:00"
        );


    return formattedDate.toLocaleDateString(
        "fr-FR",
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"

        }
    );

}


// ==========================================
// DARK MODE
// ==========================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "dayliTheme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

        themeIcon.textContent =
            "☀️";

        themeText.textContent =
            "Mode clair";

    }

}


function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    if (
        isDark
    ) {

        localStorage.setItem(
            "dayliTheme",
            "dark"
        );

        themeIcon.textContent =
            "☀️";

        themeText.textContent =
            "Mode clair";

    }

    else {

        localStorage.setItem(
            "dayliTheme",
            "light"
        );

        themeIcon.textContent =
            "🌙";

        themeText.textContent =
            "Mode sombre";

    }

}


// ==========================================
// SECURITE HTML
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


// ==========================================
// EVENEMENTS MODAL
// ==========================================

addTaskButton.addEventListener(
    "click",
    openAddModal
);


emptyAddButton.addEventListener(
    "click",
    openAddModal
);


closeModal.addEventListener(
    "click",
    closeTaskModal
);


cancelButton.addEventListener(
    "click",
    closeTaskModal
);


// Fermer en cliquant
// en dehors de la fenêtre

taskModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            taskModal
        ) {

            closeTaskModal();

        }

    }
);


// ==========================================
// EVENEMENTS SUPPRESSION
// ==========================================

closeDeleteModal.addEventListener(
    "click",
    closeDeleteModalFunction
);


cancelDelete.addEventListener(
    "click",
    closeDeleteModalFunction
);


deleteModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            deleteModal
        ) {

            closeDeleteModalFunction();

        }

    }
);


// ==========================================
// TOUCHE ESCAPE
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            if (
                !taskModal.classList.contains(
                    "hidden"
                )
            ) {

                closeTaskModal();

            }


            if (
                !deleteModal.classList.contains(
                    "hidden"
                )
            ) {

                closeDeleteModalFunction();

            }

        }

    }
);


// ==========================================
// DARK MODE
// ==========================================

themeButton.addEventListener(
    "click",
    toggleTheme
);


// ==========================================
// INITIALISATION
// ==========================================

displayCurrentDate();

loadTheme();

renderTasks();