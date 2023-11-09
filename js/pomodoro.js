// VARIABLES
let buttonMode = "start";

// BUTTONS
const button = document.getElementById("timerButton");
button.addEventListener("click", () => sendToBackground(buttonMode));

// SLIDER
const studySlider = document.getElementById("studySlider");
const studyDisplay = document.getElementById("studyDisplay");
studySlider.addEventListener("input", () => {
  studyDisplay.textContent = studySlider.value;
  saveData();
});

const restSlider = document.getElementById("restSlider");
const restDisplay = document.getElementById("restDisplay");
restSlider.addEventListener("input", () => {
  restDisplay.textContent = restSlider.value;
  saveData();
});

// NOTIDICATIONS
const webhookDiscord = document.getElementById("webhook-url");
webhookDiscord.addEventListener("input", function () {
  saveData();
});

function sendToBackground(action) {
  const studyTime = parseInt(studyDisplay.textContent);
  const restTime = parseInt(restDisplay.textContent);

  // START --> send task to background.js
  chrome.runtime.sendMessage(
    {
      type: action,
      studyTime: studyTime,
      restTime: restTime,
      webhook: webhookDiscord.value,
    },
    function (response) {
      console.log(response);
    }
  );
  changeButtonVisuals(action);
  saveData();
}

function changeButtonVisuals(action) {
  // Change button function and visuals
  if (action === "start") {
    buttonMode = "reset";
    button.textContent = "RESET";
  } else if (action === "reset") {
    buttonMode = "start";
    button.textContent = "START";
  }
}

function saveData() {
  localStorage.setItem("addButton", buttonMode);
  localStorage.setItem("studyDisplay", studyDisplay.textContent);
  localStorage.setItem("restDisplay", restDisplay.textContent);
  localStorage.setItem("webhookUrl", webhookDiscord.value);
}

function load() {
  var storedButtonContent = localStorage.getItem("addButton");
  var studyValue = localStorage.getItem("studyDisplay");
  var restValue = localStorage.getItem("restDisplay");
  var webhookDiscordValue = localStorage.getItem("webhookUrl");

  //Load sliders
  if (studyValue != null && restValue != null) {
    studySlider.value = parseInt(studyValue);
    studyDisplay.textContent = studyValue;

    restSlider.value = parseInt(restValue);
    restDisplay.textContent = restValue;
  }
  //Load button
  if (storedButtonContent === "reset") {
    buttonMode = "reset";
    button.textContent = "RESET";
  } else {
    buttonMode = "start";
    button.textContent = "START";
  }
  //Notofication
  webhookDiscord.value = webhookDiscordValue;
}

// run
load();