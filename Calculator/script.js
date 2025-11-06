const buttonClear = document.getElementById("button-clear")
const operationResult = document.getElementById("result")
const previousCalculation = document.getElementById("calculation")
const numberButtons = document.querySelectorAll(".button-number")
const sumButton = document.getElementById("sum")
const operationsButton = document.querySelectorAll(".action-button")
const deleteLastValueButton = document.getElementById("button-delete")


function clearOperations() {
    operationResult.innerText = "0";
    previousCalculation.innerText = "";
    calculation.innerText = "";
    addEventListenerOperationButton()
}

function calculation(e) {
    let a = operationResult.innerText;
    operationResult.innerText = `${a}${e.target.innerText}`;
}

function displaySum(result) {
    operationResult.innerText = result;
}

function displayOperation(expression) {
    previousCalculation.innerText = expression;
}

function operationSum() {
    const expression = operationResult.innerText;

    if (expression === "0") return;

    try {
        const result = Function(`"use strict"; return (${expression})`)();
        displaySum(result);
        displayOperation(expression)
    } catch (error) {
        operationResult.innerText = "NaN";
        console.error("Invalid expression:", error);
    }
}

function addEventListenerOperationButton() {
    numberButtons.forEach(button => {
        button.addEventListener("click", addOperation);
    })
}

function removeEventListenerOperationButton() {
    numberButtons.forEach(button => {
        button.removeEventListener("click", addOperation);
    })
}

function addOperation(e) {
    if (operationResult.innerText.length === 15) {
        operationResult.innerText = 'NaN'
        removeEventListenerOperationButton();
        return;
    }
    if (operationResult.innerText === "0") {
        operationResult.innerText = e.target.innerText;
    } else {
        operationResult.innerText += e.target.innerText;
    }
}

function deleteLastValue() {
    const expression = operationResult.innerText.split("");
    if (operationResult.innerText === "0") {
        return;
    } else {
        let deleteOperation = expression.slice(0, -1);
        if (deleteOperation.length >= 1) {
            operationResult.innerText = deleteOperation.join("");
        }
    }
}

//Event
addEventListenerOperationButton();
buttonClear.addEventListener("click", clearOperations);
sumButton.addEventListener("click", operationSum);
deleteLastValueButton.addEventListener("click", deleteLastValue);
operationsButton.forEach((button) => {
    button.addEventListener("click", calculation);
})