var currentNumber = 0
var result = 0;
var display = true
var equalPressed = false;

// Display number in display div - keyButtons (0-9)
function displayCurrentNumber(keyData) {
    if (display || document.getElementById("display").innerText == "0") { // If newNumber = true then replace number in display or if number = 0 then also replace
        document.getElementById("display").innerText = keyData; // Display number in display
        equalPressed ? document.getElementById("calculation-display").innerText = keyData : document.getElementById("calculation-display").innerText += keyData;
        equalPressed = false;
        display = false;
    } else if (document.getElementById("display").innerText.length < 10) { // Prevent numbers from being too long && add to current number instead of repleacing number in display
        document.getElementById("display").innerText += keyData;
        document.getElementById("calculation-display").innerText += keyData;
    }
}

// Add dot to number button
function dot() {
    if (!document.getElementById("display").innerHTML.includes(".")) { // if dot not include in display yet, then add to number
        display = false;
        document.getElementById("display").innerHTML += ".";
        document.getElementById("calculation-display").innerText += ".";
    }
}

// operator (+, -, *, /) function
function operatorPressed(currentOperator) {
    document.getElementById("display").innerText = currentOperator;
    document.getElementById("calculation-display").innerText += currentOperator; // Add operator to current calculation
    display = true; // new number has to be entered = true
    equalPressed = false; // equal is not pressed last
    document.getElementById("calculation-display").innerText = document.getElementById("calculation-display").innerText.replace(/(\D)\1/, currentOperator) // To prevent doubling the same operator
    document.getElementById("calculation-display").innerText = document.getElementById("calculation-display").innerText.replace(/\D{3}/, currentOperator) // Prevent from entering operator more than 2 at a time after another
}

// (=)Button function
function equal() {
    if (document.getElementById("calculation-display").innerHTML != "") { // If calculation is not empty (calculationdisplay is not empty)
        result = eval(document.getElementById("calculation-display").innerHTML); // Store calculation result in var result
        document.getElementById("display").innerText = result; // Display result in display
        document.getElementById("calculation-display").innerText = result; // Display result in calculation-display
    }
    equalPressed = true;  // equalPressed is important, so that if newNumber is put in it resets properly
    display = true;
}

// AC button function - Resetting the calculator at any point to its original state
function ac() {
    display = true;
    document.getElementById("display").innerText = 0;
    document.getElementById("calculation-display").innerText = "";
}