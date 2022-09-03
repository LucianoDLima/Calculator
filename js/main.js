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
                if(afterOperator.includes('.')) {
                    display.classList.add('js-decimalArrayChange')
                    checkForError();
                    return
                }

                if(beforeOperator.includes('.') && display.classList.contains('js-decimalArrayChange')) {
                    checkForError();
                    return
                }
                

            default:
                if(display.innerText === '0' && e.target.innerText !== '.') display.innerText = '';
                if(display.classList.contains('js-calculated')){
                    display.classList.remove('js-calculated');
                    display.classList.remove('js-numbersArrayChange')
                    beforeOperator = '';
                    display.innerText = '';
                }
                
                if(!display.classList.contains('js-numbersArrayChange')) {
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
        display.classList.remove('js-calculated');
        display.classList.add('js-numbersArrayChange');
        display.classList.add('js-decimalArrayChange');
        
        debug()
    })
})

actions.forEach(item => {
    item.addEventListener('click', (e) => {
        switch(e.target.innerText) {
            case 'DEL':
                if(display.classList.contains('js-calculated')) {
                    display.innerText = '0';
                    display.classList.remove('js-calculated')
                    display.classList.remove('js-numbersArrayChange')
                    clearValues();
                }

                if(display.innerText.length == 1) {
                    display.innerText = '0';
                    display.classList.remove('js-calculated')
                    display.classList.remove('js-numbersArrayChange')
                }
                else {
                    display.innerText = display.innerText.slice(0, -1)
                }

                if(afterOperator) {
                    afterOperator = afterOperator.slice(0, -1);
                }
                else if(currentOperator && !afterOperator) {
                    currentOperator = '';
                    display.classList.remove('js-numbersArrayChange');
                }
                else if(!currentOperator){
                    beforeOperator = beforeOperator.slice(0, -1);
                }
                debug()
                break

            case 'RESET': 
                display.classList.remove('js-numbersArrayChange')
                display.classList.remove('js-decimalArrayChange')
                display.classList.remove('js-calculated')
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
    beforeOperator = display.innerText
    display.classList.add('js-calculated')
    display.classList.remove('js-decimalArrayChange')
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