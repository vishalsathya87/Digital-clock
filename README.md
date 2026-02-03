
Digital Clock & Stopwatch Pro

A sleek, responsive web-based digital clock with dual-mode functionality, built using HTML, CSS, and Vanilla JavaScript. This project features a modern Glassmorphism UI and supports both desktop and mobile interactions.

🚀 Features
•	Dual Time Modes: Toggle between 12-hour (AM/PM) and 24-hour formats.
•	Integrated Stopwatch: A fully functional stopwatch with Start, Stop, and Reset capabilities.
•	Mode Switching: Easily switch between the Clock and Stopwatch using buttons or swipe gestures.
•	Touch Gestures: Optimized for mobile with Swipe Left to access the stopwatch and Swipe Right to return to the clock.
•	Glassmorphism UI: High-quality aesthetic featuring background blurs, gradients, and floating decorative shapes.
🛠️ Technologies Used
•	HTML5: Structure and semantic layout.
•	CSS3: Advanced styling including Flexbox, Backdrop-filters (Glassmorphism), and animations.
•	JavaScript (ES6): State management, setInterval timers, and Touch Event listeners.
________________________________________

📂 Project Structure

Plaintext
├── index.html   # Main structure and UI elements
├── style.css    # Layout, colors, and Glassmorphism effects
└── script.js    # Logic for time, stopwatch, and touch gestures
________________________________________

⚙️ How It Works

1. The Clock Logic
The clock uses the Date() object to pull local system time. It uses a toggle variable is24Hour to determine how to display the hours.
•	24H: Direct output from getHours().
•	12H: Uses the modulo operator ($hrs \pmod{12}$) and a ternary operator to define the AM/PM string.
2. The Stopwatch
The stopwatch tracks a single variable swSeconds. When started, a setInterval increments this value every 1000ms. The display function then mathematically converts the total seconds into an HH:MM:SS format.
3. Gesture Navigation
The app listens for touchstart and touchend events on the main container. It calculates the horizontal distance ($X_{end} - X_{start}$) to determine if the user performed a valid swipe.
________________________________________

🖥️ Getting Started

1.	Clone or Download: Save the index.html, style.css, and script.js files into the same folder.
2.	Open: Double-click index.html to launch the app in your favorite web browser.
3.	Interact:
o	Click 12H / 24H to change time formats.
o	Click Clock / Stopwatch to toggle views.
o	Use the Start/Stop/Reset buttons for the stopwatch.
o	On mobile, Swipe across the clock face to switch modes.
________________________________________
📝 License
This project is open-source and free to use for educational purposes.
Deployment link:https: https://digital-clock-vishal.vercel.app/
