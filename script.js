

const display = document.querySelector('.inputnumber');
const keys = document.querySelector('.calcButton');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay () {
    display.value = displayValue;

}

document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.operator[value="+/-"]').addEventListener('click', togglePlusMinus);

keys.addEventListener('click', function (e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains ('operator')) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue); 

    if (nextOperator === '%') {
        const result = value / 100;

        displayValue = String(result);
        firstValue = result;
        operator = null;
        waitingForSecondValue = false;
    } else {
        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {
            const result = calculate(firstValue, value, operator);

            displayValue = String(result);
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '/') {
        return first / second;
    } else if (operator === '*') {
        return first * second;
    }
    return second;
}

function togglePlusMinus() {
    if (displayValue.startsWith('-')) {
        displayValue = displayValue.substring(1);
    } else {
        displayValue = '-' + displayValue;
    }
    updateDisplay();
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num: displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue ='0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}