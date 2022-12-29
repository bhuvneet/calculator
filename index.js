// add event handler to the number buttons clicked.
let result = '';
let prevNum = '';
let currNum = '';

// if a number is clicked
let num = document.getElementsByClassName("number");
for (let i = 0; i < num.length; i++)
{
    num[i].addEventListener("click", () => 
{
    // append number as number buttons are clicked + update display
    // store previous and new number clicked in variables
    if (result === '') // if there's no prior calculation done
    {
        if (whichOperation != 0) // operator is clicked; don't append to prevNum
        {   // second operand
            if (num[i].textContent === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else
            {
                currNum += num[i].textContent;
                updateDisplay(currNum, 'currNum'); 
            }  
        }
        else
        {   // first operand
            if (num[i].textContent === "." && prevNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else
            {
                prevNum += num[i].textContent;
                updateDisplay(prevNum, 'prevNum');
            }
        }
    }
    else    // if prior calculation was done i.e. result != -1
    {
        if (whichOperation === '')
        {
            // user overwrote a number, so clear the prevNum
            // start new calculation
            prevNum = '';
            currNum += num[i].textContent;

            updateDisplay(currNum, 'currNum');

        }
        else
        {
            // when user has entered a number, an operator and another number
            // this is the second oparand
            prevNum = result;
            currNum += num[i].textContent;
            
            updateDisplay(currNum, 'currNum');  
        }
        
    }
})};

document.addEventListener('keydown', (event) =>
{
    let keyName = event.key;
    
    if (isFinite(keyName) || keyName === ".") // number id pressed
    {
        if (result === '') // if there's no prior calculation done
        {
            if (keyName === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else if (whichOperation != 0)    // operator is clicked; don't append to currNum
            {   // second operand
                currNum += keyName;
                updateDisplay(currNum, 'currNum');   
            }
    
            else
            {   // first operand
                prevNum += keyName;
                updateDisplay(prevNum, 'prevNum');
            }
        }
        else    // if prior calculation was done i.e. result != -1
        {

            if (keyName === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else
            {
                prevNum = result;
                currNum += keyName;
                updateDisplay(currNum, 'currNum');  
            }
        }
    }

    else if (keyName === "+" || keyName === "-" || keyName === "/" 
    || keyName === "*" || keyName === "%") // operation is pressed
    {
        whichOperation = keyName;
        updateDisplay(whichOperation, 'operator');
    }

    else if (keyName === "=" || keyName === "Enter")
    {
        operate();
    }

    else // if a key other than valid keys, is pressed.
    {
        return;
    }
});

// add event handler to operation buttons clicked
let whichOperation = 0;
let operation = document.getElementsByClassName("operation");
for (let i = 0; i < operation.length; i++)
{
    operation[i].addEventListener("click", () =>
{
    whichOperation = operation[i].textContent;
    updateDisplay(whichOperation, 'operator');  // display operator
})}

// once equals button is clicked, invoke operate()
let equals = document.getElementById("equals");
equals.addEventListener("click", operate); 

// store 1st num when user presses operator
// save which operation
// operate on the numbers
function operate ()
{
    // this function is called when equals operator is pressed/clicked
    if (prevNum === -1 && currNum === -1 && whichOperation === 0)
    {
        return;
    }
    else
    {
        if (whichOperation === "+")
        {
            add(prevNum, currNum);
        }
        else if (whichOperation === "-")
        {
            subtract(prevNum, currNum);
        }
        else if (whichOperation === "x" || whichOperation === '*')
        {
            multiply(prevNum, currNum);
        }
        else if (whichOperation === "/")
        {
            if (currNum === "0")
            {
                updateDisplay("n/0 !allowed in math world", 'error');
                prevNum = '';
                currNum = '';
            }
            else
            {
                divide(prevNum, currNum);
            }
        }
        else if (whichOperation === "%")
        {
            mod(prevNum, currNum);
        }

        currNum = '';   // clear currNum value, operation type and result to store new value after result is computed.
        whichOperation = '';
    }
}

// operate on nums
function add (prevNum, currNum)
{
    result = +prevNum + +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    updateDisplay(result, 'result');
};

function subtract (prevNum, currNum)
{
    result = +prevNum - +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    updateDisplay(result, 'result');
};

function divide (prevNum, currNum)
{
    result = +prevNum / +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    updateDisplay(result, 'result');
};

function multiply (prevNum, currNum)
{
    result = +prevNum * +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    updateDisplay(result, 'result');
};

function mod (prevNum, currNum)
{
    result = ((+prevNum) % (+currNum));
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    updateDisplay(result, 'result');
};

let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");

let prevValue = document.getElementById("display1");

function updateDisplay (newValue, type)
{
    // if type == error, display the error message
    if (type === 'error')
    {
        display2.value = newValue;
    }
    if (type === 'currNum')
    {
        // second operand
        display1.value = prevNum + ' ' + whichOperation + ' ' + currNum;
        display2.value = newValue;
    }
    if (type === 'prevNum')
    {
        // first operand
        display2.value = newValue;
    }
    if (type === 'result')
    {
        display2.value = newValue;
    }
    if (type === 'operator')
    {
        display1.value = display2.value + ' ' + newValue;
        display2.value = newValue;
    }
}

// erase all stored values from the variables.
let undo = document.getElementById("undo");
undo.addEventListener("click", () =>
{
    display1.value = '';
    display2.value = '';
    currNum = '';
    prevNum = '';
    result = '';
})

// clear last digit from display
let clear           = document.getElementById("clear");
let valueInDisplay  = document.getElementById("display2");

clear.addEventListener("click", () =>
{
    valueInDisplay.value = valueInDisplay.value.slice(0, -1);
    this.value = valueInDisplay.value;
    
    if (currNum === '' && whichOperation === 0) // update first operand
    {
        prevNum = this.value;
    }
    else if (currNum != '' && whichOperation != '')  // update second operand
    {
        currNum = this.value;
    }
    else if (prevNum != '')
    {
        whichOperation = this.value;
    }
})  

// change color when mouse is over buttons
let equalSign = document.getElementById("equals");
equalSign.addEventListener("mouseover", colorWhenHovered);

let undoSign = document.getElementById("undo");
undoSign.addEventListener("mouseover", colorWhenHovered);

let clearSign = document.getElementById("clear");
clearSign.addEventListener("mouseover", colorWhenHovered);

function colorWhenHovered (e)
{
    function randomColor()
    {
        return Math.floor((1 + Math.random()) * 256 / 2);
    }
    x = e.offsetX;
    y = e.offsetY;
    
    this.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
}
