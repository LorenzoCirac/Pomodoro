let studyTime;
let restTime;
let discordWebhook;

// popup.js listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  studyTime = request.studyTime;
  restTime = request.restTime;
  discordWebhook = request.webhook;

  if (request.type === "start") {
    createAlarm("study", studyTime);
  } else if (request.type === "reset") {
    clearAlarms();
  }
  // prevent error
  sendResponse();
});

// CREATE ALARM
function createAlarm(type, time) {
  console.log("Timer started! Type: " + type + " | time: " + time);
  chrome.alarms.create(type, {
    delayInMinutes: time,
  });
  if (discordWebhook != "") {
    sendDiscord("Timer started! Type: " + type + " | time: " + time + "   " + "🐻");
  }
}

// CLEAR ALL ALARMS
function clearAlarms() {
  chrome.alarms.getAll((alarms) => {
    for (const alarm of alarms) {
      chrome.alarms.clear(alarm.name);
      console.log("alarm cleared: " + alarm.name);
    }
  });
  if (discordWebhook != "") {
    sendDiscord("You stoped the timer" +  "   " + "🐻");
  }
}

// CREATE NOTIFICATION
function createChromeNotification(title, messages) {
  var ranNum = getRandomInt(messages.length);
  chrome.notifications.create(null, {
    type: "basic",
    iconUrl: "bearWithRose.png",
    title: title,
    message: messages[ranNum],
  });
  if (discordWebhook != "") {
    sendDiscord(messages[ranNum]);
  }
}

// REACT TO ALARM
chrome.alarms.onAlarm.addListener((alarm) => {
  //clearAlarms();

  if (alarm.name == "study") {
    // After study comes rest
    createChromeNotification("PAUSE", restMessages);
    createAlarm("pause", restTime);
  } else if (alarm.name == "pause") {
    // After rest comes study
    createChromeNotification("STUDY", studyMessages);
    createAlarm("study", studyTime);
  }
});

// OTHER
function sendDiscord(message) {
  const content = {
    content: message,
  };
  fetch(discordWebhook, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Discord: Message sent successfully!");
      } else {
        console.error("Discord: Failed to send message", response);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function time() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  return hours + ":" + minutes + ":" + seconds;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const studyMessages = [
  "You've got this!",
  "Keep up the great work!",
  "Success is just around the corner.",
  "Study like a champ!",
  "You're on the path to greatness.",
  "Every small effort counts.",
  "Dream big, study hard.",
  "Your future is in your hands.",
  "Stay focused and shine!",
  "Believe in yourself.",
  "You're unstoppable!",
  "One step at a time.",
  "The harder you work, the luckier you get.",
  "Study now, shine later.",
  "Stay committed to your goals.",
];

const restMessages = [
  "Enjoy your well-deserved break!",
  "Relax and recharge for the next round!",
  "Take a deep breath and unwind.",
  "You've earned this break!",
  "Refresh and come back stronger!",
  "Make the most of your downtime.",
  "Rejuvenate your mind and body.",
  "Rest is essential for success.",
  "You've been working hard; now, take it easy!",
  "This break is your time to shine!",
  "A short break can do wonders.",
  "Relax, and then conquer your goals!",
  "Your break, your rules!",
  "Recharge for the next study session.",
  "Unwind and let go of stress.",
  "You're one step closer to your goals!",
  "Rest, relax, and refocus!",
  "Take a moment to appreciate your progress.",
  "Your success journey continues after this break!",
  "Rest, then conquer!",
  "Short breaks lead to big achievements.",
  "Rest is part of the winning strategy.",
  "Your hard work deserves a breather!",
  "Rest, and then return with full force!",
  "A short rest, a big comeback!",
];
