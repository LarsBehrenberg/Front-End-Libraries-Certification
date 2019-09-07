var currentNumber = 0;
var operator = "";
var result = 0;
var display = true;
var equalIsPressed = false;

// Get number function
function displayCurrentNumber(keyData) {
    if (display || document.getElementById("display").innerHTML == "0") {
        display = false;
        document.getElementById("display").innerHTML = keyData
        currentNumber = Number(document.getElementById("display").innerHTML);
        console.log("currentNumber: " + currentNumber); // log it
    } else {
        if (document.getElementById("display").innerHTML.length < 10) {
            document.getElementById("display").innerHTML += keyData
            currentNumber = Number(document.getElementById("display").innerHTML);
            console.log("currentNumber: " + currentNumber); // log it
        } else {
            console.log("too long")
        }
    }

}


function dot() {
    if (!document.getElementById("display").innerHTML.includes(".")) {
        display = false;
        document.getElementById("display").innerHTML += ".";
        currentNumber = Number(document.getElementById("display").innerHTML); // store new displayed number in currentNumber
        console.log("currentNumber: " + currentNumber); // log it
    } else {
        console.log("dot is already there");
    }
}


function operatorPressed(currentOperator) {

        if (operator == "" && !equalIsPressed) {
            result = currentNumber; // Store currentNumber
            operator = currentOperator;
        } else if (equalIsPressed) {
            equalIsPressed = false;
            operator = currentOperator;
        } else {
            equal();
            operator = currentOperator;
        }
        display = true; // Enter new number

    

}

function equal(isPressed) {
        switch (operator){
            case "divide":
                    console.log("result div");
                    result /= currentNumber;
                    break;
                case "multiply":
                    console.log("result multiply");
                    result *= currentNumber;
                    break;
                case "subtract":
                    console.log("result subtract");
                    result -= currentNumber;
                    break;
                case "addition":
                    console.log("result addition");
                    result += currentNumber;
                    break;
                default: 
                    break;
        }

        if(isPressed){
            operator= "";
            equalIsPressed = true;
        }
    
    document.getElementById("display").innerHTML = result;
    display = true; // Enter new number
}

function ac() {
    currentNumber = 0;
    operator = "";
    result = 0;
    equalIsPressed = false;
    display = true;
    document.getElementById("display").innerHTML = currentNumber;
}