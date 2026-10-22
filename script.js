const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const ageResult = document.getElementById("ageResult");

const today = new Date();

dobInput.max = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

calculateBtn.addEventListener("click", function () {
    if (!dobInput.value) {
        ageResult.textContent = "Please select your date of birth.";
        return;
    }

    const parts = dobInput.value.split("-").map(Number);
    const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);

    if (birthDate > today) {
        ageResult.textContent = "Date of birth cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

        days += previousMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    ageResult.textContent =
        `Your Age: ${years} years, ${months} months, ${days} days.`;
});

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskMessage.textContent = "Please enter a task first.";
        return;
    }

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", "Mark task as complete");

    const span = document.createElement("span");
    span.textContent = taskText;

    checkbox.addEventListener("change", function () {
        span.classList.toggle("completed", checkbox.checked);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        taskMessage.textContent = "Task deleted.";
    });

    li.append(checkbox, span, deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    taskMessage.textContent = "Task added successfully.";
    taskInput.focus();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});