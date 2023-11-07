
let studyTime;
let restTime;

// popup.js listener
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        studyTime = request.studyTime;
        restTime = request.restTime;
        
        if (request.type === "start") {
             createAlarm("study", studyTime);
        }
        else if (request.type === "reset") {
            clearAlarms();
        }
        // prevent error
        sendResponse();
    }
);

// ALARM functions
function createAlarm(type, time) {
    console.log("creating alarm | type: " + type);
    chrome.alarms.create(
        type,
        {
            delayInMinutes: time
        }
    );
}

function clearAlarms() {
    chrome.alarms.getAll(alarms => {
        for (const alarm of alarms) {
            chrome.alarms.clear(alarm.name);
            console.log("alarm cleared: " + alarm.name);
        }
    });
}

// CREATE NOTIFICATION
chrome.alarms.onAlarm.addListener(alarm => {
    //clearAlarms();

    if (alarm.name == "study") {
        // After study comes rest
        chrome.notifications.create(null, {
            type: "basic",
            iconUrl: "bearWithRose.png",
            title: "PAUSE",
            message: restMessages[getRandomInt(restMessages.length)]
        });
        createAlarm("pause", restTime);
    }
    else if (alarm.name == "pause") {
        // After rest comes study
        chrome.notifications.create(null, {
            type: "basic",
            iconUrl: "bearWithRose.png",
            title: "STUDY",
            message: studyMessages[getRandomInt(studyMessages.length)]
        });
        createAlarm("study", studyTime);
    }
});

// OTHER
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
    "Stay committed to your goals."
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
    "A short rest, a big comeback!"
  ];
  
  
