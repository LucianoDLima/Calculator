const display = document.querySelector('#display');
const result = document.querySelector('#result-display');
const digits = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operators]')
const actions = document.querySelectorAll('[data-action]')

const moveDisplayDown = 'translateY(.8rem)'
const moveDisplayUp = 'translateY(0)'

let beforeOperator = [];
let currentOperator = [];
let afterOperator = [];

let decimalArrayChange = false;
let numbersArrayChange = false;
let displayCalculated = false;

function debug() {
    console.log('Before: ' + beforeOperator, 'Current: ' + currentOperator, 'After: ' + afterOperator)
    console.log('Decimal: ' + decimalArrayChange + ' / ', 'Numbers: ' + numbersArrayChange + ' / ', 'Calculated: ' + displayCalculated)
}

digits.forEach(item => {
    item.addEventListener('click', (e) =>{
        switch(e.target.innerText) {
            case '.': 
                if(afterOperator.includes('.')) {
                    decimalArrayChange = true;
                    checkForError();
                    return
                }

                if(beforeOperator.includes('.') && decimalArrayChange == true) {
                    checkForError();
                    return
                }
                

            default:
                if(display.innerText === '0' && e.target.innerText !== '.') display.innerText = '';
                if(displayCalculated === true){
                    displayCalculated = false;
                    numbersArrayChange = false;
                    beforeOperator = '';
                    display.innerText = '';
                }
                
                if(numbersArrayChange === false) {
                    display.innerText += e.target.innerText;
                    beforeOperator += e.target.innerText;
                }
                else {
                    display.innerText += e.target.innerText;
                    afterOperator += e.target.innerText;
                }
                debug();
        }
    })
})

operators.forEach(item => {
    item.addEventListener('click', (e) =>{
        if(currentOperator.length > 0 
        && afterOperator.length !== 0) {
            calculateDisplayValues();
        }

        if(currentOperator && !afterOperator){
            display.innerText = display.innerText.slice(0, -1);
        }

        if(display.innerText === '0') {
            beforeOperator = '0';
        }

        display.innerText += e.target.innerText;
        currentOperator = e.target.innerText
        displayCalculated = false;
        numbersArrayChange = true;
        decimalArrayChange = true;
        
        debug()
    })
})

actions.forEach(item => {
    item.addEventListener('click', (e) => {
        switch(e.target.innerText) {
            case 'DEL':
                if(displayCalculated === true) {
                    display.innerText = '0';
                    numbersArrayChange = true;
                    decimalArrayChange = true;
                    clearValues();
                }

                if(display.innerText.length == 1) {
                    display.innerText = '0';
                    displayCalculated = false;
                    numbersArrayChange = true;
                }
                else {
                    display.innerText = display.innerText.slice(0, -1)
                }

                if(afterOperator) {
                    afterOperator = afterOperator.slice(0, -1);
                }
                else if(currentOperator && !afterOperator) {
                    currentOperator = '';
                    numbersArrayChange = false;
                }
                else if(!currentOperator){
                    beforeOperator = beforeOperator.slice(0, -1);
                }
                debug()
                break

            case 'RESET': 
                decimalArrayChange = false;
                numbersArrayChange = false;
                displayCalculated = false;
                display.innerText = '0';
                result.innerText = '';
                clearValues();
                debug()
                break

            case '=':
                neverDivideByZero();
                if(!afterOperator.length || afterOperator.length === 1 && afterOperator === '.'){
                    checkForError(); 
                    return;
                }
                calculateDisplayValues();
                debug()

        }   

    })
})

/* Clear the values inside the array, but not the display nor the js-classes! */
function clearValues() {
    beforeOperator = '';
    currentOperator = '';
    afterOperator = '';
}

/* Calculate the displayed valued, empty the arrays, then add the calculated value in the first array again */
function calculateDisplayValues() {
    result.innerText = display.innerText + ' =';

    if(display.innerText.includes('+')) {
        display.innerText = parseFloat(beforeOperator) + parseFloat(afterOperator)
    }

    if(display.innerText.includes('-')) {
        display.innerText = parseFloat(beforeOperator) - parseFloat(afterOperator)
    }

    if(display.innerText.includes('x')) {
        display.innerText = parseFloat(beforeOperator) * parseFloat(afterOperator)
    }

    if(display.innerText.includes('/')) {
        display.innerText = parseFloat(beforeOperator) / parseFloat(afterOperator)
    }

    clearValues();
    beforeOperator = display.innerText;
    displayCalculated = true;
    decimalArrayChange = false;
}

function checkForError(){
    display.classList.add('errorAnimation')
    setTimeout(() =>{
        display.classList.remove('errorAnimation')
    }, 500)
} 

function neverDivideByZero() {
    if(afterOperator === '0') {
        result.innerText = ''
        display.innerText = 'eeeer...'
        location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}