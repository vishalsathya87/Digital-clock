let is24Hour = false;
let isClockMode = true;
let swSeconds = 0;
let swInterval = null;

const clockBox = document.getElementById("clockBox");
const stopwatchBox = document.getElementById("stopwatchBox");
const clockControls = document.getElementById("clockControls");
const swControls = document.getElementById("swControls");
const btnClock = document.getElementById("btnClock");
const btnStopwatch = document.getElementById("btnStopwatch");
const toggleBtn = document.getElementById("toggleFormatBtn");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

function init() {
    updateClock();
    setInterval(updateClock, 1000);
    checkTheme(new Date().getHours()); // Initial check

    toggleBtn.addEventListener("click", () => {
        is24Hour = !is24Hour;
        toggleBtn.innerText = is24Hour ? "12H Mode" : "24H Mode";
        updateClock();
    });

    document.getElementById("startBtn").addEventListener("click", startSW);
    document.getElementById("stopBtn").addEventListener("click", stopSW);
    document.getElementById("resetBtn").addEventListener("click", resetSW);

    setupSwipe();
}

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
    // Night is before 6am or after 6pm
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

window.switchTab = function(toClock) {
    isClockMode = toClock;
    clockBox.classList.remove("pop-in");
    stopwatchBox.classList.remove("pop-in");
    void clockBox.offsetWidth;

    if (toClock) {
        clockBox.classList.remove("hidden");
        clockBox.classList.add("pop-in");
        stopwatchBox.classList.add("hidden");
        clockControls.classList.remove("hidden");
        swControls.classList.add("hidden");
        btnClock.classList.add("active");
        btnStopwatch.classList.remove("active");
    } else {
        clockBox.classList.add("hidden");
        stopwatchBox.classList.remove("hidden");
        stopwatchBox.classList.add("pop-in");
        clockControls.classList.add("hidden");
        swControls.classList.remove("hidden");
        btnClock.classList.remove("active");
        btnStopwatch.classList.add("active");
    }
}

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
    const timeString = [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
    document.getElementById("swTime").innerText = timeString;
}

function setupSwipe() {
    let startX = 0;
    const container = document.querySelector(".hero");

    container.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    container.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50 && isClockMode) switchTab(false);
        if (endX - startX > 50 && !isClockMode) switchTab(true);
    });
}

init();