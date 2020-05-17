const numberButtons = document.querySelectorAll('.number-button');
const operationButtons = document.querySelectorAll('.operation');
const inputOutput = document.querySelector('#input-output');
const htmlDoc = document.querySelector('html');
let globalOperator = undefined;
let operand1 = undefined;
let operand2 = undefined;
let operationFlag = false;
let total = 0;
let keyPressed = false;

function numberClicked(e) {
    if(keyPressed){
        newText = e.key;
        keyPressed = false;
    } else {
        newText = e.target.textContent;
    }   
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
}

function operationClicked(e) {
    let newNum = parseFloat(inputOutput.textContent);
    let itemClicked = '';
    if(keyPressed) {
        keyPressed = false;
        switch(e.keyCode) {
            case 111:
                itemClicked = 'divide';
                break;
            case 106:
                itemClicked = 'multiply';
                break;
            case 109:
                itemClicked = 'subtract';
                break;
            case 107:
                itemClicked = 'add';
                break;
            case 13:
                itemClicked = 'equals';
                break;
            case 27:
                itemClicked = 'clear';
                break;
        }
    } else {
       itemClicked = e.target.id; 
    }
    if(itemClicked == 'clear'){
        inputOutput.textContent = "";
        globalOperator = undefined;
        operand1 = undefined;
        operand2 = undefined;
    } else if(newNum != newNum) {
        alert("Enter a number before trying an operation");
    } else {
        if(itemClicked == 'negate') {
            inputOutput.textContent = negate(newNum);
        } else if(e.target.id == 'one-over-x') {
            inputOutput.textContent = oneOverX(newNum);
        } else if(e.target.id == 'square-root') {
            inputOutput.textContent = squareRoot(newNum);
        } else if(itemClicked == 'equals') {
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
                globalOperator = itemClicked;
                inputOutput.textContent = '';
            } else {
                operand2 = newNum;
                operand1 = operate(operand1, operand2, globalOperator);
                globalOperator = itemClicked;
                inputOutput.textContent = operand1;
                operationFlag = true;
            }
        }
    }
}

operationButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        operationClicked(e);       
    });
});

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        numberClicked(e);
    });
});

htmlDoc.addEventListener('keydown', (e) => {
    let keyCode = e.keyCode;
    if((keyCode >= 96 && keyCode <= 105) || keyCode == 110) {
        keyPressed = true;
        numberClicked(e);
    } else if(keyCode == 106 || keyCode == 107 || keyCode == 109 || keyCode == 111 || keyCode == 13 || keyCode == 27){
        keyPressed = true;
        operationClicked(e);
    } else if(keyCode == 8){
        let inputOutputLen = inputOutput.textContent.length;
        inputOutput.textContent = inputOutput.textContent.slice(0, inputOutputLen - 1);
    }
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
    if(a == 0) {
        alert `You can't divide by zero you silly sod`;
        return 0;
    }
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