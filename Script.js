let is24Hour = false;
let isClockMode = true;

// Stopwatch Variables
let swSeconds = 0;
let swInterval = null;

// Pomodoro Variables
let pomoInterval = null;
let pomoSeconds = 25 * 60; // 25 Minutes
let isWorkSession = true;

// DOM Elements
const clockBox = document.getElementById("clockBox");
const stopwatchBox = document.getElementById("stopwatchBox");
const pomodoroBox = document.getElementById("pomodoroBox");

const clockControls = document.getElementById("clockControls");
const swControls = document.getElementById("swControls");
const pomoControls = document.getElementById("pomoControls");

const btnClock = document.getElementById("btnClock");
const btnStopwatch = document.getElementById("btnStopwatch");
const btnPomodoro = document.getElementById("btnPomodoro");

const toggleBtn = document.getElementById("toggleFormatBtn");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

function init() {
    // Start Clock
    updateClock();
    setInterval(updateClock, 1000);
    checkTheme(new Date().getHours());

    // Clock Event
    toggleBtn.addEventListener("click", () => {
        is24Hour = !is24Hour;
        toggleBtn.innerText = is24Hour ? "12H Mode" : "24H Mode";
        updateClock();
    });

    // Stopwatch Events
    document.getElementById("startBtn").addEventListener("click", startSW);
    document.getElementById("stopBtn").addEventListener("click", stopSW);
    document.getElementById("resetBtn").addEventListener("click", resetSW);

    // Pomodoro Events
    document.getElementById("pomoStartBtn").addEventListener("click", startPomo);
    document.getElementById("pomoPauseBtn").addEventListener("click", stopPomo);
    document.getElementById("pomoResetBtn").addEventListener("click", resetPomo);

    setupSwipe();
}

/** --- CLOCK LOGIC --- **/
function updateClock() {
    const now = new Date();
    let hrs = now.getHours();
    
    checkTheme(hrs);

    let ampm = "";
    if (!is24Hour) {
        ampm = hrs >= 12 ? "PM" : "AM";
        hrs = hrs % 12 || 12;
    }

    document.getElementById("hours").innerText = String(hrs).padStart(2, "0");
    document.getElementById("minutes").innerText = String(now.getMinutes()).padStart(2, "0");
    document.getElementById("seconds").innerText = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("ampm").innerText = ampm;
}

function checkTheme(hour) {
    const body = document.body;
    const isNight = hour < 6 || hour >= 18;

    if (isNight) {
        body.classList.add("night-mode");
        sun.classList.add("hidden");
        moon.classList.remove("hidden");
    } else {
        body.classList.remove("night-mode");
        sun.classList.remove("hidden");
        moon.classList.add("hidden");
    }
}

/** --- TAB SWITCHING LOGIC --- **/
window.switchTab = function(mode) {
    // Reset animations
    [clockBox, stopwatchBox, pomodoroBox].forEach(box => box.classList.remove("pop-in"));
    void clockBox.offsetWidth; // Trigger reflow

    // Hide everything first
    clockBox.classList.add("hidden");
    stopwatchBox.classList.add("hidden");
    pomodoroBox.classList.add("hidden");
    
    clockControls.classList.add("hidden");
    swControls.classList.add("hidden");
    pomoControls.classList.add("hidden");

    btnClock.classList.remove("active");
    btnStopwatch.classList.remove("active");
    btnPomodoro.classList.remove("active");

    // Show selected mode
    if (mode === true || mode === 'clock') {
        isClockMode = true;
        clockBox.classList.remove("hidden");
        clockBox.classList.add("pop-in");
        clockControls.classList.remove("hidden");
        btnClock.classList.add("active");
    } 
    else if (mode === false || mode === 'stopwatch') {
        isClockMode = false;
        stopwatchBox.classList.remove("hidden");
        stopwatchBox.classList.add("pop-in");
        swControls.classList.remove("hidden");
        btnStopwatch.classList.add("active");
    } 
    else if (mode === 'pomodoro') {
        isClockMode = false;
        pomodoroBox.classList.remove("hidden");
        pomodoroBox.classList.add("pop-in");
        pomoControls.classList.remove("hidden");
        btnPomodoro.classList.add("active");
    }
}

/** --- STOPWATCH LOGIC --- **/
function startSW() {
    if (swInterval) return;
    swInterval = setInterval(() => {
        swSeconds++;
        displaySW();
    }, 1000);
}

function stopSW() {
    clearInterval(swInterval);
    swInterval = null;
}

function resetSW() {
    stopSW();
    swSeconds = 0;
    displaySW();
}

function displaySW() {
    let h = Math.floor(swSeconds / 3600);
    let m = Math.floor((swSeconds % 3600) / 60);
    let s = swSeconds % 60;
    document.getElementById("swTime").innerText = [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
}

/** --- POMODORO LOGIC --- **/
function startPomo() {
    if (pomoInterval) return;
    pomoInterval = setInterval(() => {
        if (pomoSeconds > 0) {
            pomoSeconds--;
            displayPomo();
        } else {
            stopPomo();
            isWorkSession = !isWorkSession;
            pomoSeconds = isWorkSession ? 25 * 60 : 5 * 60;
            
            // Visual feedback for session switch
            const label = document.getElementById("pomoLabel");
            label.innerText = isWorkSession ? "Focus" : "Break";
            label.style.background = isWorkSession ? "#6BCB77" : "#4D96FF";
            
            alert(isWorkSession ? "Break is over! Time to focus." : "Focus session done! Take a break.");
            displayPomo();
        }
    }, 1000);
}

function stopPomo() {
    clearInterval(pomoInterval);
    pomoInterval = null;
}

function resetPomo() {
    stopPomo();
    isWorkSession = true;
    pomoSeconds = 25 * 60;
    document.getElementById("pomoLabel").innerText = "Focus";
    document.getElementById("pomoLabel").style.background = "#6BCB77";
    displayPomo();
}

function displayPomo() {
    let m = Math.floor(pomoSeconds / 60);
    let s = pomoSeconds % 60;
    document.getElementById("pomoTime").innerText = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** --- SWIPE GESTURE --- **/
function setupSwipe() {
    let startX = 0;
    const container = document.querySelector(".hero");

    container.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    container.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swiped Left -> Move Clock to Stopwatch or Stopwatch to Pomodoro
                if (btnClock.classList.contains("active")) switchTab('stopwatch');
                else if (btnStopwatch.classList.contains("active")) switchTab('pomodoro');
            } else {
                // Swiped Right -> Move Pomodoro to Stopwatch or Stopwatch to Clock
                if (btnPomodoro.classList.contains("active")) switchTab('stopwatch');
                else if (btnStopwatch.classList.contains("active")) switchTab('clock');
            }
        }
    });
}

init();
