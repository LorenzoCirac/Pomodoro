const inputField = document.getElementById("inputField");
const listContainer = document.getElementById("task-container");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", addTask);

function addTask() {
    if (inputField.value != "") {
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

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function loadList() {
    listContainer.innerHTML = localStorage.getItem("data");
}


// Run
loadList();

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    
}, false);