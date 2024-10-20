let currentInput = '';
let previousInput = '';
let currentOperation = null;
let expression = ''; 
const display = document.getElementById('display');
const resultElement = document.getElementById('result');

// Append the clicked number to the display and expression
function appendNumber(number) {
    if (currentInput === '0' && number === '0') return; // Prevent multiple leading zeros
    currentInput += number;
    expression += number; // Append the clicked number to the expression
    updateDisplay();
}

// Choose the operation (store the first number and the operator)
function chooseOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate(); // If there's already an operation, calculate the result first
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    expression += ` ${operation} `; // Append the operator to the expression
    updateDisplay();
}

// Perform the calculation using Promises
function performOperation(num1, num2, operation) {
    return new Promise((resolve, reject) => {
        if (isNaN(num1) || isNaN(num2)) {
            reject("Error: Invalid input.");
        }

        switch (operation) {
            case '+':
                resolve(num1 + num2);
                break;
            case '-':
                resolve(num1 - num2);
                break;
            case '*':
                resolve(num1 * num2);
                break;
            case '/':
                if (num2 === 0) {
                    reject("Error");
                } else {
                    resolve(num1 / num2);
                }
                break;
            default:
                reject("Error: Invalid operation.");
        }
    });
}

// Calculate the result
function calculate() {
    if (previousInput === '' || currentInput === '') return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    performOperation(num1, num2, currentOperation)
        .then(result => {
            currentInput = result.toString();
            previousInput = '';
            currentOperation = null;
            expression = currentInput; // Update expression with the result
            updateDisplay();
            // resultElement.innerHTML = `Result: ${result}`;
            // resultElement.style.color = "green";
        })
        .catch(error => {
            // resultElement.innerHTML = error;
            // resultElement.style.color = "red";
            display.innerHTML = error;
            display.style.color = "red";
        });
}

// Clear the display and reset variables
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    expression = ''; // Clear the expression as well
    resultElement.innerHTML = '';
    updateDisplay();
}

// Update the calculator display with the current expression or input
function updateDisplay() {
    display.innerHTML = expression || '0';
}