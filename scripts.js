const numberButtons = document.querySelectorAll('.number-button');
const operationButtons = document.querySelectorAll('.operation');
const inputOutput = document.querySelector('#input-output');
let globalOperator = undefined;
let operand1 = undefined;
let operand2 = undefined;
let operationFlag = false;
let total = 0;

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        newText = e.target.textContent;
        if(newText == ".") {
            if(inputOutput.textContent.indexOf('.') >= 0) {
                return;
            } 
        }
        if(operationFlag) {
            inputOutput.textContent = '';
            operationFlag = false;
        }
        inputOutput.textContent += newText;
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let newNum = parseFloat(inputOutput.textContent);
        if(e.target.id == 'clear'){
            inputOutput.textContent = "";
            globalOperator = undefined;
            operand1 = undefined;
            operand2 = undefined;
        } else if(newNum != newNum) {
            alert("Enter a number before trying an operation");
        } else {
            if(e.target.id == 'negate') {
                inputOutput.textContent = negate(newNum);
            } else if(e.target.id == 'one-over-x') {
                inputOutput.textContent = oneOverX(newNum);
            } else if(e.target.id == 'square-root') {
                inputOutput.textContent = squareRoot(newNum);
            } else if(e.target.id == 'equals') {
                if(operand1 != undefined) {
                    operand2 = newNum;
                    total = operate(operand1, operand2, globalOperator);
                    inputOutput.textContent = total;
                    operationFlag = true;
                    operand1 = undefined;
                    operand2 = undefined;
                }
            } else {
                if(operand1 == undefined) {
                    operand1 = newNum;
                    globalOperator = e.target.id;
                    inputOutput.textContent = '';
                } else {
                    operand2 = newNum;
                    operand1 = operate(operand1, operand2, globalOperator);
                    globalOperator = e.target.id;
                    inputOutput.textContent = operand1;
                    operationFlag = true;
                }
            }
        }
    });
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function squareRoot(a) {
    return Math.sqrt(a);
}

function negate(num) {
    return num * -1;
}

function oneOverX(num) {
    return (1 / num);
}

function operate(num1, num2, operator) {
    switch(operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
    }
}