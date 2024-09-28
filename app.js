let screen = document.getElementById('calculator-screen')
let screenValue = screen.textContent
let firstValue = 0;
let previousOperator = null;
let waitingForSecondValue = false;
let screenMaxLength = 15

function inputDigit(digit){
    if(waitingForSecondValue){
        waitingForSecondValue = false;
        screenValue = digit
    }else {
        screenValue = screenValue == '0' ? digit : screenValue + digit 
    }
    updateScreenDisplay()

}

function inputDecimal(){
    if(waitingForSecondValue) {
        inputDigit('0.')
    }
    if(! screenValue.includes('.')){
        screenValue = screenValue + '.';
    }
    updateScreenDisplay()
}

function toggleSign(){
    screenValue = screenValue * -1;
    if(waitingForSecondValue){
        firstValue = screenValue
    }
    updateScreenDisplay()
}

function getSquareRoot(){
    screenValue = Math.sqrt(screenValue)
    firstValue=screenValue
    updateScreenDisplay()
}
function clearEntry(){
    screenValue = screenValue.slice(0,-1);
    if(screenValue.length === 0){
        screenValue = '0'
    }
    updateScreenDisplay()
}

function allClear(){
    firstValue = 0;
    screenValue = '0';
    updateScreenDisplay()
}

function handleOperator(currentOperator){
    if(waitingForSecondValue) {
        previousOperator = currentOperator
        return 
    }
    firstValue = calculate(firstValue, previousOperator, parseFloat(screenValue))
    screenValue = firstValue;
    previousOperator = currentOperator
    waitingForSecondValue = true
    updateScreenDisplay()
}
function calculate(first,operator,second){
    if (operator === '+')  return first + second
    if (operator === '-')  return first - second
    if (operator === '*')  return first  * second
    if (operator === '/')  return first / second

    return second

}

function separateScreenValueByComma(){
    let parts = screenValue.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
}

function exponentialFormat(value){
    if (value.length > screenMaxLength) {
        return parseFloat(value).toExponential(8);
    }
    return value
}

function updateScreenDisplay(){
    // screen.textContent = screenValue  //works
    screen.textContent = exponentialFormat(separateScreenValueByComma())
    // screen.textContent = separateScreenValueByComma()  //works
}
