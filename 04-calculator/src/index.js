var currentNumber = 0;
var result = 0;
var calcArray = [];
var dotActive = false;
var addition = false, subtraction = false, multiplication = false, division = false, equalButton = false;

// Get number function
function getNum(data) {
    if (equalButton == true) {
        equalButton = false;
        document.getElementById("display").innerHTML = "0";
    } 
    
    document.getElementById("display").innerHTML == "0" ? document.getElementById("display").innerHTML = data : document.getElementById("display").innerHTML += data; // add number to display if not 0
    currentNumber = Number(document.getElementById("display").innerHTML); // store new displayed number in currentNumber
    console.log(currentNumber); // log it
    
}


function dot(){
    if (dotActive == false) {
        dotActive = true;
        document.getElementById("display").innerHTML += ".";
    }
}

function add() {
    calcArray.push(currentNumber);
    calcArray.push("+");
    currentNumber = 0;
    dotActive = false;
    document.getElementById("display").innerHTML = 0;
    document.getElementById("calculation-display").innerHTML = calcArray.join("");
}
function sub() {
    calcArray.push(currentNumber);
    calcArray.push("-");
    currentNumber = 0;
    dotActive = false;
    document.getElementById("display").innerHTML = 0;
    document.getElementById("calculation-display").innerHTML = calcArray.join("");
}

function mult(){
    calcArray.push(currentNumber);
    calcArray.push("*");
    currentNumber = 0;
    dotActive = false;
    document.getElementById("display").innerHTML = 0;
    document.getElementById("calculation-display").innerHTML = calcArray.join("");
}

function div() {
    calcArray.push(currentNumber);
    calcArray.push("/");
    currentNumber = 0;
    dotActive = false;
    document.getElementById("display").innerHTML = 0;
    document.getElementById("calculation-display").innerHTML = calcArray.join("");
}


function equal () {
    equalButton = true;
    calcArray.push(currentNumber);
    result = eval(calcArray.join(""));
    calcArray = [];
    currentNumber = 0;
    dotActive = false;
    document.getElementById("display").innerHTML = result;
    document.getElementById("calculation-display").innerHTML = "";
}

function ac() {
    equalButton = false;
    calcArray = [];
    currentNumber = 0;
    result = 0;
    dotActive = false;
    document.getElementById("display").innerHTML = "0";
    document.getElementById("calculation-display").innerHTML = "";
}