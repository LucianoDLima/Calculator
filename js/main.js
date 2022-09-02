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

function debug() {
    console.log('Before: ' + beforeOperator, 'Current: ' + currentOperator, 'After: ' + afterOperator)
}

digits.forEach(item => {
    item.addEventListener('click', (e) =>{
        switch(e.target.innerText) {
            case '.': 
                if(beforeOperator.includes('.') && !display.classList.contains('js-decimalArrayChange')) {
                    checkForError();
                    return
                }
                if(afterOperator.includes('.') && display.classList.contains('js-decimalArrayChange')) {
                    checkForError();
                    return
                }

            default:
                if(display.innerText === '0' && e.target.innerText !== '.') display.innerText = '';
                
                if(!display.classList.contains('js-numbersArrayChange')) {
                    display.innerText += e.target.innerText;
                    beforeOperator += e.target.innerText
                }
                else {
                    display.innerText += e.target.innerText;
                    afterOperator += e.target.innerText
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

        display.innerText += e.target.innerText;
        currentOperator = e.target.innerText
        display.classList.add('js-numbersArrayChange');
        display.classList.add('js-decimalArrayChange');
        
        debug()
    })
})

actions.forEach(item => {
    item.addEventListener('click', (e) => {
        switch(e.target.innerText) {
            case 'DEL':
                debug()
                break

            case 'RESET': 
                display.classList.remove('js-numbersArrayChange')
                display.classList.remove('js-decimalArrayChange')
                display.innerText = '0';
                result.innerText = '';
                clearValues('all');
                debug()
                break

            case '=':
                neverDivideByZero();
                if(!afterOperator.length) {
                    checkForError(); 
                    return;
                }
                calculateDisplayValues();
                debug()

        }   

    })
})

/* Clear the values inside the array, but not the display nor the js-classes! */
function clearValues(object) {
    if(object === 'all') {
        beforeOperator = '';
        currentOperator = '';
        afterOperator = '';
    }

    else if (object === 'first') {
        beforeOperator = '';
    }

    else if (object === 'second') {
        afterOperator = '';
    }
}

/* Calculate the displayed valued, empty the array, then add the calculated value in the array again */
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

    clearValues('all');
    beforeOperator = display.innerText
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