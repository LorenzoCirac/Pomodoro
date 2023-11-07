
// VARIABLES
let buttonMode = "start";

// SLIDER
const studySlider = document.getElementById("studySlider");
const studyDisplay = document.getElementById("studyDisplay");
studySlider.addEventListener("input", () => {
    studyDisplay.textContent = studySlider.value;
});

const restSlider = document.getElementById("restSlider");
const restDisplay = document.getElementById("restDisplay");
restSlider.addEventListener("input", () => {
    restDisplay.textContent = restSlider.value;
});

// BUTTONS
const button = document.getElementById("button");
button.addEventListener("click", () => sendToBackground(buttonMode));

function sendToBackground(action) {
    const studyTime = parseInt(studyDisplay.textContent);
    const restTime = parseInt(restDisplay.textContent);

    // START --> send task to background.js
    chrome.runtime.sendMessage({ type: action, studyTime: studyTime, restTime: restTime}, function(response) {
        console.log(response);
    });

    // Change button function and visuals
    if (action == "start") {
        buttonMode = "reset";
        button.textContent = "RESET";
    }
    else if (action == "reset"){
        buttonMode = "start";
        button.textContent = "START";
    }
}

function playSound() {
    var audio = new Audio("item.mp3");
    audio.play();
}












