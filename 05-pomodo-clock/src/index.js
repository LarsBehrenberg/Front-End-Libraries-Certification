// Initial variables
var sessionLengthTotal = 25;
var sessionLengthMinutes = 0;

var breakLengthTotal = 5;
var breakLengthMinutes = 0;

var seconds = 60;

var start = false;
var reset = true;

var pomodoroSession, pomodoroBreak;



// This function is executed when the start/stop button is pressed
// It starts / pauses / restarts the timer
function startTimer() {
    if (reset == true) { // Start from reset
        reset = false;
        start = true;
        sessionTimer();
    } else if (start == true) { // Pause when playing
        start = false;
    } else { // Restart when paused
        start = true;
    }
}


// This function is executed when the reset button is pressed
// It resets all values to default and displays it in the fitting elements
function resetTimer() {
    sessionLengthTotal = 25;
    breakLengthTotal = 5;
    seconds = 60;

    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;

    start = false;
    reset = true;
    clearInterval(pomodoroSession);
    clearInterval(pomodoroBreak);

    document.getElementById("break-length").innerHTML = breakLengthTotal;
    document.getElementById("session-length").innerHTML = sessionLengthTotal;
    document.getElementById("timer-label").innerHTML = "Timer";
    document.getElementById("time-left").innerHTML = sessionLengthTotal + ":00";
    document.getElementById("notice").innerText = "";
}



// Creating an intervall for the session timer
function sessionTimer() {

    document.getElementById("time-left").innerHTML = (sessionLengthTotal < 10 ? "0" + sessionLengthTotal : sessionLengthTotal) + ":00";
    sessionLengthMinutes = sessionLengthTotal - 1;
    document.getElementById("timer-label").innerHTML = "On Session";

    pomodoroSession = setInterval(function () {
        if (start == true) {
            seconds--;
            document.getElementById("time-left").innerHTML = (sessionLengthMinutes < 10 ? "0" + sessionLengthMinutes : sessionLengthMinutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            if (seconds < 0) {
                sessionLengthMinutes--;
                seconds = 60;
            }
            if (sessionLengthMinutes < 0) {
                document.getElementById("beep").play();
                clearInterval(pomodoroSession);
                breakTimer();
            }

            console.log(sessionLengthMinutes);
        }
    }, 1000);
}


// Creating an Intervall for the break timer
function breakTimer() {

    document.getElementById("time-left").innerHTML = (breakLengthTotal < 10 ? "0" + breakLengthTotal : breakLengthTotal) + ":00";
    breakLengthMinutes = breakLengthTotal - 1;
    document.getElementById("timer-label").innerHTML = "On Break";

    pomodoroBreak = setInterval(function () {
        if (start == true) {
            seconds--;
            document.getElementById("time-left").innerHTML = (breakLengthMinutes < 10 ? "0" + breakLengthMinutes : breakLengthMinutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

            if (seconds < 0) {
                breakLengthMinutes--;
                seconds = 60;
            }
            if (breakLengthMinutes < 0) {
                document.getElementById("beep").play();
                clearInterval(pomodoroBreak);
                sessionTimer();
            }
            console.log(breakLengthMinutes);
        }
    }, 1000);
}

// Increment break and session length function
function increment(label) {
    document.getElementById("notice").innerText = "";

    if (label == "session" && sessionLengthTotal != 60) {
        sessionLengthTotal++;
        document.getElementById("session-length").innerText = sessionLengthTotal;
    } else if (label == "break" && breakLengthTotal != 60) {
        breakLengthTotal++;
        document.getElementById("break-length").innerText = breakLengthTotal;
    } else {
        document.getElementById("notice").innerText = "You cannot increment to more than 60 minutes!";
    }

    if (reset == true) {
        document.getElementById("time-left").innerText = sessionLengthTotal < 10 ? "0" + sessionLengthTotal + ":00" : sessionLengthTotal + ":00";
    }

}

// Decrement break and session length function
function decrement(label) {
    document.getElementById("notice").innerText = "";
    if (label == "session" && sessionLengthTotal != 1) {
        sessionLengthTotal--;
        document.getElementById("session-length").innerText = sessionLengthTotal;
    } else if (label == "break" && breakLengthTotal != 1) {
        breakLengthTotal--;
        document.getElementById("break-length").innerText = breakLengthTotal;
    } else {
        document.getElementById("notice").innerText = "You cannot decrement to less than one minute!";
    }

    if (reset == true) {
        document.getElementById("time-left").innerText = sessionLengthTotal < 10 ? "0" + sessionLengthTotal + ":00" : sessionLengthTotal + ":00";
    }
}