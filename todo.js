const inputField = document.getElementById("inputField");
const listContainer = document.getElementById("task-container");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", addTask);

function addTask() {
    if (inputField.value === "") {
        alert("You have to name your task!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputField.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputField.value = "";
        saveData();
    }
}

function reorderCheckedTasks() {
    const checkedItems = document.querySelectorAll("li.checked");
    
    for (const item of checkedItems) {
        listContainer.insertBefore(item, listContainer.firstChild);
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function loadList() {
    listContainer.innerHTML = localStorage.getItem("data");
}


// Run

loadList();

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        reorderCheckedTasks();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
}, false);